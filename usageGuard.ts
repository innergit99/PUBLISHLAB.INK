import { supabase, getCurrentUser } from './supabaseClient';
import { SUBSCRIPTION_TIERS, SubscriptionTier } from './paddleIntegration';

export interface UsageStats {
    booksThisMonth: number;
    imagesThisMonth: number;
    manuscriptsThisMonth: number;
}

export class UsageGuard {
    /**
     * Retrieves the current usage statistics for the user from the source of truth (Database)
     */
    static async getUsageStats(): Promise<UsageStats> {
        const user = await getCurrentUser();
        if (!user) return { booksThisMonth: 0, imagesThisMonth: 0, manuscriptsThisMonth: 0 };

        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        try {
            // Count actual content records created this month
            const { data, error } = await supabase
                .from('content')
                .select('type, created_at')
                .eq('user_id', user.id)
                .gte('created_at', startOfMonth.toISOString());

            if (error) throw error;

            const stats: UsageStats = {
                booksThisMonth: 0,
                imagesThisMonth: 0,
                manuscriptsThisMonth: 0
            };

            data?.forEach((item: any) => {
                // Determine category from type/tool
                if (item.type === 'COLORING_PAGES') stats.booksThisMonth++; // Book Lab
                if (item.type === 'MANUSCRIPT_DOCTOR') stats.manuscriptsThisMonth++;
                if (['TEXT_TO_IMAGE', 'POD_MERCH'].includes(item.type)) stats.imagesThisMonth++;
            });

            return stats;
        } catch (e) {
            console.error('UsageGuard: Failed to fetch stats', e);
            // Fallback to localStorage if DB fails (transitional)
            const localUsage = localStorage.getItem('usage');
            return localUsage ? JSON.parse(localUsage) : { booksThisMonth: 0, imagesThisMonth: 0, manuscriptsThisMonth: 0 };
        }
    }

    /**
     * Checks if the user has reached their limit for a specific action
     */
    static async canPerformAction(action: 'MANUSCRIPT' | 'IMAGE' | 'BOOK', tier: SubscriptionTier): Promise<boolean> {
        const stats = await this.getUsageStats();

        switch (action) {
            case 'MANUSCRIPT':
                // Artisan and Master have unlimited manuscripts
                if (tier.id === 'artisan' || tier.id === 'master') return true;
                return stats.manuscriptsThisMonth < tier.limits.booksPerMonth; // Mapping manuscript to book limit for now
            case 'IMAGE':
                return stats.imagesThisMonth < tier.limits.imagesPerMonth;
            case 'BOOK':
                return stats.booksThisMonth < tier.limits.booksPerMonth;
            default:
                return false;
        }
    }

    /**
     * Centralized Gating Logic - Returns a reason if blocked
     */
    static async checkGating(action: 'MANUSCRIPT' | 'IMAGE' | 'BOOK', tier: SubscriptionTier): Promise<{ allowed: boolean, reason?: string }> {
        const allowed = await this.canPerformAction(action, tier);
        if (!allowed) {
            return {
                allowed: false,
                reason: `You have reached the limit for your ${tier.name} plan. Upgrade to unlock more power.`
            };
        }
        return { allowed: true };
    }
}
