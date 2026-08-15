import { supabase, getCurrentUser } from './supabaseClient';
import { SUBSCRIPTION_TIERS, SubscriptionTier } from './paddleIntegration';

export interface UsageStats {
    booksThisMonth: number;
    imagesThisMonth: number;
    manuscriptsThisMonth: number;
}

export class UsageGuard {
    /**
     * Records a generation event to Supabase.
     * Call this AFTER a successful generation completes (not before — don't charge failed attempts).
     */
    static async recordUsage(toolType: string, title?: string, data?: unknown): Promise<void> {
        const user = await getCurrentUser();
        if (!user) return; // Guest users — no tracking needed

        try {
            const { error } = await supabase.from('content').insert({
                user_id: user.id,
                type: toolType,
                title: title || toolType,
                data: data ? JSON.stringify(data).slice(0, 10000) : null, // cap at 10KB
                created_at: new Date().toISOString(),
            });

            if (error) {
                console.error('UsageGuard: Failed to record usage', error);
            }
        } catch (e) {
            console.error('UsageGuard: recordUsage threw', e);
            // Non-fatal — don't block the user experience on tracking failures
        }
    }

    /**
     * Retrieves current usage stats for the logged-in user from Supabase.
     */
    static async getUsageStats(): Promise<UsageStats> {
        const user = await getCurrentUser();
        if (!user) return { booksThisMonth: 0, imagesThisMonth: 0, manuscriptsThisMonth: 0 };

        try {
            const { data, error } = await supabase
                .rpc('get_monthly_usage', { p_user_id: user.id });

            if (error) throw error;

            const row = data?.[0];
            return {
                booksThisMonth: Number(row?.books_this_month ?? 0),
                imagesThisMonth: Number(row?.images_this_month ?? 0),
                manuscriptsThisMonth: Number(row?.manuscripts_this_month ?? 0),
            };
        } catch (e) {
            console.error('UsageGuard: Failed to fetch stats', e);
            // Fail closed — return high values so limits appear reached rather than bypassed
            return { booksThisMonth: 999, imagesThisMonth: 999, manuscriptsThisMonth: 999 };
        }
    }

    /**
     * Checks if the user can perform an action given their tier.
     */
    static async canPerformAction(action: 'MANUSCRIPT' | 'IMAGE' | 'BOOK', tier: SubscriptionTier): Promise<boolean> {
        // Master and Artisan = unlimited
        if (tier.id === 'artisan' || tier.id === 'master') return true;

        const stats = await this.getUsageStats();

        switch (action) {
            case 'MANUSCRIPT':
                return stats.manuscriptsThisMonth < (tier.limits.booksPerMonth ?? 1);
            case 'IMAGE':
                return stats.imagesThisMonth < (tier.limits.imagesPerMonth ?? 5);
            case 'BOOK':
                return stats.booksThisMonth < (tier.limits.booksPerMonth ?? 1);
            default:
                return false;
        }
    }

    /**
     * Centralized gate — returns allowed:false with upgrade reason if blocked.
     */
    static async checkGating(action: 'MANUSCRIPT' | 'IMAGE' | 'BOOK', tier: SubscriptionTier): Promise<{ allowed: boolean; reason?: string }> {
        const allowed = await this.canPerformAction(action, tier);
        if (!allowed) {
            return {
                allowed: false,
                reason: `You've reached the ${tier.name} plan limit. Upgrade to unlock unlimited generation.`,
            };
        }
        return { allowed: true };
    }
}
