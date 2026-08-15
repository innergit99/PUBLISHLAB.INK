import type { VercelRequest, VercelResponse } from '@vercel/node';

const RESEND_API_URL = 'https://api.resend.com/emails';
const FROM_ADDRESS = 'Publish Lab <hello@publishlab.ink>';

const welcomeHtml = (email: string) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Welcome to Publish Lab</title>
</head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#1a1a1a;border-radius:16px;overflow:hidden;border:1px solid #2a2a2a;">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#7c3aed,#db2777);padding:40px 40px 32px;text-align:center;">
            <h1 style="margin:0;color:#fff;font-size:28px;font-weight:700;letter-spacing:-0.5px;">Publish Lab</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">AI-Powered KDP Book Creation</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <h2 style="margin:0 0 16px;color:#f5f5f5;font-size:22px;font-weight:600;">Welcome aboard 🎉</h2>
            <p style="margin:0 0 20px;color:#a0a0a0;font-size:15px;line-height:1.6;">
              Your account is ready. You can now generate professional KDP books — manuscripts,
              covers, marketing copy, and export-ready PDFs — in minutes.
            </p>
            <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
              <tr>
                <td style="background:#2a2a2a;border-radius:12px;padding:20px 24px;">
                  <p style="margin:0 0 12px;color:#a0a0a0;font-size:13px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Your free plan includes</p>
                  <ul style="margin:0;padding:0 0 0 18px;color:#d4d4d4;font-size:14px;line-height:2;">
                    <li>1 manuscript per month</li>
                    <li>5 AI cover images per month</li>
                    <li>KDP-ready PDF export</li>
                    <li>22 genre templates</li>
                  </ul>
                </td>
              </tr>
            </table>
            <p style="margin:0 0 28px;color:#a0a0a0;font-size:14px;line-height:1.6;">
              Need more? Upgrade to <strong style="color:#a78bfa;">Artisan</strong> or <strong style="color:#f472b6;">Master</strong> for unlimited generation.
            </p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:linear-gradient(135deg,#7c3aed,#db2777);border-radius:8px;">
                  <a href="https://publishlab.ink" style="display:block;padding:14px 32px;color:#fff;text-decoration:none;font-size:15px;font-weight:600;text-align:center;">
                    Start Creating →
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #2a2a2a;">
            <p style="margin:0;color:#555;font-size:12px;text-align:center;">
              You're receiving this because you signed up at publishlab.ink with ${email}<br>
              <a href="https://publishlab.ink" style="color:#7c3aed;text-decoration:none;">publishlab.ink</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error('send-welcome-email: RESEND_API_KEY not configured');
        return res.status(200).json({ skipped: true, reason: 'email not configured' });
    }

    const { email } = req.body as { email?: string };
    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    try {
        const response = await fetch(RESEND_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: FROM_ADDRESS,
                to: [email],
                subject: 'Welcome to Publish Lab — your AI book studio is ready',
                html: welcomeHtml(email),
            }),
        });

        if (!response.ok) {
            const body = await response.text();
            console.error('send-welcome-email: Resend error', response.status, body);
            return res.status(200).json({ skipped: true, reason: 'resend error' });
        }

        return res.status(200).json({ sent: true });
    } catch (err) {
        console.error('send-welcome-email: fetch threw', err);
        return res.status(200).json({ skipped: true, reason: 'network error' });
    }
}
