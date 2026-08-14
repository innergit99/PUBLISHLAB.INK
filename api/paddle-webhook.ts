import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { createHmac } from 'crypto';

// Price ID → tier mapping (keep in sync with paddleIntegration.ts)
const PRICE_TO_TIER: Record<string, string> = {
  'pri_01kh3z7fx618mjrjagj2b9cxqa': 'solo',    // Solo monthly
  'pri_01kh3z49dtwybn7e3mf5rp609j': 'solo',    // Solo yearly
  'pri_01kh3yyxwayxxqa46hdmyy451v': 'artisan', // Artisan monthly
  'pri_01kh3yvkeq3e58mqapxwxmy2sv': 'artisan', // Artisan yearly
  'pri_01kh3yrj9trbxwnaqmgbf3hrvp': 'master',  // Master monthly
  'pri_01kh3yn5e6tg9xwfyx3m2svrwf': 'master',  // Master yearly
};

function verifyPaddleSignature(rawBody: string, signatureHeader: string, secret: string): boolean {
  // Paddle v2 signature: "ts=<timestamp>;h1=<hmac>"
  const parts = Object.fromEntries(
    signatureHeader.split(';').map(p => p.split('=') as [string, string])
  );
  const ts = parts['ts'];
  const h1 = parts['h1'];
  if (!ts || !h1) return false;

  const signed = createHmac('sha256', secret)
    .update(`${ts}:${rawBody}`)
    .digest('hex');

  return signed === h1;
}

function getTierFromItems(items: Array<{ price?: { id: string } }>): string {
  for (const item of items) {
    const priceId = item?.price?.id;
    if (priceId && PRICE_TO_TIER[priceId]) return PRICE_TO_TIER[priceId];
  }
  return 'free';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET;
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!webhookSecret || !supabaseUrl || !supabaseServiceKey) {
    console.error('paddle-webhook: missing env vars');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  // Verify signature
  const signatureHeader = req.headers['paddle-signature'] as string;
  const rawBody = JSON.stringify(req.body);

  if (!signatureHeader || !verifyPaddleSignature(rawBody, signatureHeader, webhookSecret)) {
    console.error('paddle-webhook: signature verification failed');
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const event = req.body;
  const eventType: string = event?.event_type ?? '';
  const data = event?.data ?? {};

  // Use service role key — bypasses RLS, safe server-side only
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    if (eventType === 'subscription.created' || eventType === 'subscription.updated') {
      const subscriptionId: string = data.id ?? '';
      const customerEmail: string = data.customer?.email ?? data.billing_details?.email ?? '';
      const items: Array<{ price?: { id: string } }> = data.items ?? [];
      const tier = getTierFromItems(items);
      const status: string = data.status ?? 'active';

      if (!customerEmail) {
        console.error('paddle-webhook: no customer email in event');
        return res.status(200).json({ received: true, skipped: 'no email' });
      }

      // Look up Supabase user by email
      const { data: users, error: userErr } = await supabase.auth.admin.listUsers();
      if (userErr) throw userErr;

      const user = users.users.find(u => u.email === customerEmail);
      if (!user) {
        console.error(`paddle-webhook: no Supabase user for email ${customerEmail}`);
        return res.status(200).json({ received: true, skipped: 'user not found' });
      }

      const { error: upsertErr } = await supabase.from('profiles').upsert({
        id: user.id,
        subscription_tier: tier,
        paddle_subscription_id: subscriptionId,
        subscription_status: status,
        updated_at: new Date().toISOString(),
      });

      if (upsertErr) throw upsertErr;

      console.error(`paddle-webhook: ${eventType} → user ${user.id} → tier ${tier}`);

    } else if (eventType === 'subscription.cancelled') {
      const subscriptionId: string = data.id ?? '';

      // Find profile by paddle_subscription_id
      const { data: profile, error: findErr } = await supabase
        .from('profiles')
        .select('id')
        .eq('paddle_subscription_id', subscriptionId)
        .single();

      if (findErr || !profile) {
        console.error('paddle-webhook: cancelled sub not found', subscriptionId);
        return res.status(200).json({ received: true, skipped: 'sub not found' });
      }

      const { error: updateErr } = await supabase.from('profiles').upsert({
        id: profile.id,
        subscription_tier: 'free',
        subscription_status: 'cancelled',
        updated_at: new Date().toISOString(),
      });

      if (updateErr) throw updateErr;

      console.error(`paddle-webhook: subscription.cancelled → user ${profile.id} → downgraded to free`);

    } else {
      // Unhandled event type — acknowledge and ignore
      console.error(`paddle-webhook: unhandled event ${eventType}`);
    }

    return res.status(200).json({ received: true });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('paddle-webhook: error', msg);
    return res.status(500).json({ error: 'Internal error' });
  }
}
