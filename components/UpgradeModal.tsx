import React, { useState } from 'react';
import { X, Zap, Star, Crown, Check } from 'lucide-react';
import { SUBSCRIPTION_TIERS, SubscriptionTier, openPaddleCheckout } from '../paddleIntegration';

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    limitMessage?: string;
    userEmail?: string;
}

const UPGRADE_TIERS: SubscriptionTier[] = [
    SUBSCRIPTION_TIERS.SOLO,
    SUBSCRIPTION_TIERS.ARTISAN,
    SUBSCRIPTION_TIERS.MASTER,
];

const TIER_ICONS: Record<string, React.ReactNode> = {
    solo: <Zap className="w-5 h-5" />,
    artisan: <Star className="w-5 h-5" />,
    master: <Crown className="w-5 h-5" />,
};

const TIER_COLORS: Record<string, { border: string; badge: string; cta: string }> = {
    solo: {
        border: 'border-slate-600',
        badge: '',
        cta: 'bg-slate-700 hover:bg-slate-600 text-white',
    },
    artisan: {
        border: 'border-indigo-500',
        badge: 'bg-indigo-500 text-white text-xs px-2 py-0.5 rounded-full',
        cta: 'bg-indigo-600 hover:bg-indigo-500 text-white',
    },
    master: {
        border: 'border-amber-500',
        badge: '',
        cta: 'bg-amber-600 hover:bg-amber-500 text-white',
    },
};

export function UpgradeModal({ isOpen, onClose, limitMessage, userEmail }: UpgradeModalProps) {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [loading, setLoading] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleUpgrade = async (tier: SubscriptionTier) => {
        setLoading(tier.id);
        try {
            await openPaddleCheckout(tier, userEmail, billingCycle);
        } finally {
            setLoading(null);
        }
    };

    const yearlyDiscount = (tier: SubscriptionTier) => {
        if (!tier.yearlyPrice || !tier.price) return 0;
        const monthlyTotal = tier.price * 12;
        return Math.round(((monthlyTotal - tier.yearlyPrice) / monthlyTotal) * 100);
    };

    const displayPrice = (tier: SubscriptionTier) => {
        if (billingCycle === 'yearly' && tier.yearlyPrice) {
            return (tier.yearlyPrice / 12).toFixed(2);
        }
        return tier.price.toFixed(2);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="relative px-6 pt-6 pb-4 border-b border-slate-700 bg-gradient-to-r from-indigo-950/50 to-slate-900">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <h2 className="text-xl font-bold text-white">Unlock More with Publish Lab</h2>

                    {limitMessage && (
                        <p className="mt-1 text-sm text-amber-400 flex items-center gap-1.5">
                            <span className="text-amber-400">⚡</span>
                            {limitMessage}
                        </p>
                    )}
                </div>

                {/* Billing toggle */}
                <div className="flex justify-center pt-5 pb-2">
                    <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-1">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                billingCycle === 'monthly'
                                    ? 'bg-slate-600 text-white'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('yearly')}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                                billingCycle === 'yearly'
                                    ? 'bg-slate-600 text-white'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Yearly
                            <span className="text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">
                                Save 20%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Tier cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 pt-4">
                    {UPGRADE_TIERS.map((tier) => {
                        const colors = TIER_COLORS[tier.id];
                        const discount = yearlyDiscount(tier);
                        const isRecommended = tier.id === 'artisan';

                        return (
                            <div
                                key={tier.id}
                                className={`relative flex flex-col rounded-xl border-2 ${colors.border} ${
                                    isRecommended ? 'bg-indigo-950/30' : 'bg-slate-800/50'
                                } p-5`}
                            >
                                {isRecommended && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className={colors.badge}>Most Popular</span>
                                    </div>
                                )}

                                {/* Tier header */}
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-indigo-400">{TIER_ICONS[tier.id]}</span>
                                    <span className="font-semibold text-white">{tier.name}</span>
                                </div>

                                {/* Price */}
                                <div className="mb-4">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold text-white">
                                            ${displayPrice(tier)}
                                        </span>
                                        <span className="text-slate-400 text-sm">/mo</span>
                                    </div>
                                    {billingCycle === 'yearly' && discount > 0 && (
                                        <p className="text-xs text-green-400 mt-0.5">
                                            ${tier.yearlyPrice}/yr · Save {discount}%
                                        </p>
                                    )}
                                    {billingCycle === 'monthly' && discount > 0 && (
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            or ${(tier.yearlyPrice! / 12).toFixed(2)}/mo billed yearly
                                        </p>
                                    )}
                                </div>

                                {/* Features */}
                                <ul className="space-y-1.5 mb-5 flex-1">
                                    {tier.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                                            <Check className="w-3.5 h-3.5 text-green-400 mt-0.5 shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <button
                                    onClick={() => handleUpgrade(tier)}
                                    disabled={loading === tier.id}
                                    className={`w-full py-2.5 rounded-lg font-medium text-sm transition-colors ${colors.cta} disabled:opacity-60 disabled:cursor-not-allowed`}
                                >
                                    {loading === tier.id ? 'Opening checkout…' : `Upgrade to ${tier.name}`}
                                </button>
                            </div>
                        );
                    })}
                </div>

                <p className="text-center text-xs text-slate-500 pb-5">
                    Secure payment via Paddle · Cancel anytime · No contracts
                </p>
            </div>
        </div>
    );
}
