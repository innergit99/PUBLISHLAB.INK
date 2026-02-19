import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Zap, BookOpen, ImageIcon, TrendingUp } from 'lucide-react';
import { UsageGuard, UsageStats } from '../usageGuard';
import { getCurrentTier, SubscriptionTier } from '../paddleIntegration';

interface UsageMeterProps {
    isDarkMode: boolean;
    compact?: boolean;
}

export const UsageMeter: React.FC<UsageMeterProps> = ({ isDarkMode, compact = false }) => {
    const [stats, setStats] = useState<UsageStats | null>(null);
    const [tier, setTier] = useState<SubscriptionTier | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const [s, t] = await Promise.all([UsageGuard.getUsageStats(), getCurrentTier()]);
                setStats(s);
                setTier(t);
            } catch (e) {
                console.error("UsageMeter: Failed to load stats", e);
            }
        };
        load();

        // Refresh periodically to reflect new activity
        const interval = setInterval(load, 15000);
        return () => clearInterval(interval);
    }, []);

    if (!stats || !tier) return null;

    const renderMeter = (icon: React.ReactNode, label: string, used: number, limit: number | string) => {
        const isUnlimited = typeof limit === 'string' || limit >= 9999;
        const percentage = isUnlimited ? 100 : Math.min((used / (limit as number)) * 100, 100);

        return (
            <div className="space-y-2">
                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                    <div className="flex items-center gap-1.5 text-slate-400">
                        {icon} {label}
                    </div>
                    <div className={isDarkMode ? 'text-white' : 'text-slate-900'}>
                        {used} / {isUnlimited ? '∞' : limit}
                    </div>
                </div>
                <div className={`h-1 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        className={`h-full rounded-full ${percentage > 90 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]'}`}
                    />
                </div>
            </div>
        );
    };

    if (compact) {
        return (
            <div className={`inline-flex items-center gap-4 px-4 py-2 rounded-full border backdrop-blur-xl ${isDarkMode ? 'bg-black/40 border-white/10' : 'bg-white/40 border-black/5'}`}>
                <div className="flex items-center gap-2">
                    <Zap size={12} className="text-indigo-400" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400">{tier.name}</span>
                </div>
                <div className="h-3 w-px bg-white/10" />
                <div className="flex items-center gap-3">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Usage:</span>
                    <div className="flex gap-2 text-[9px] font-black">
                        <span className="text-white">{stats.manuscriptsThisMonth}M</span>
                        <span className="text-white/40">/</span>
                        <span className="text-white">{stats.imagesThisMonth}I</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-6 rounded-[2rem] border backdrop-blur-3xl shadow-2xl relative overflow-hidden group ${isDarkMode ? 'bg-indigo-600/5 border-indigo-500/20' : 'bg-white border-slate-200'}`}
        >
            <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:scale-110 transition-transform duration-700">
                <Database size={64} />
            </div>

            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
                        <TrendingUp size={14} />
                    </div>
                    <h4 className={`text-xs font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Industrial Quota
                    </h4>
                </div>
                <div className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400 text-[8px] font-black uppercase">
                    Live
                </div>
            </div>

            <div className="space-y-6">
                {renderMeter(<BookOpen size={10} />, "Manuscripts", stats.manuscriptsThisMonth, tier.limits.booksPerMonth)}
                {renderMeter(<ImageIcon size={10} />, "AI Generations", stats.imagesThisMonth, tier.limits.imagesPerMonth)}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-[9px] font-bold text-slate-500 italic leading-relaxed">
                    Quota resets in {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).getDate() - new Date().getDate()} days.
                </p>
            </div>
        </motion.div>
    );
};
