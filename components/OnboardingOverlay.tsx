import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, BookOpen, Download, ArrowRight, X, Sparkles, FileText, Image } from 'lucide-react';

const STEPS = [
    {
        icon: BookOpen,
        color: 'indigo',
        title: 'Pick Your Genre & Topic',
        body: 'Choose from 22+ KDP-optimised genres. Enter your book title and topic — our AI handles everything from structure to chapter count.',
        tip: 'Pro tip: Niche topics outperform broad ones. "Cozy Cat Mystery in a Bookshop" beats "Mystery Novel".',
    },
    {
        icon: Sparkles,
        color: 'violet',
        title: 'AI Generates Your Full Book',
        body: 'Watch the Industrial Engine build your outline, chapters, cover specs, and back-cover blurb in real time. Takes 30–90 seconds.',
        tip: 'Pro tip: Use the Co-Author Editor to refine any chapter before exporting.',
    },
    {
        icon: Image,
        color: 'rose',
        title: 'Generate Your Cover',
        body: 'AI creates a professional, genre-appropriate cover. Regenerate until you love it — no design skills needed.',
        tip: 'Pro tip: Covers with bold contrast and clear title text convert best on Amazon.',
    },
    {
        icon: Download,
        color: 'emerald',
        title: 'Export & Upload to KDP',
        body: 'Download your print-ready PDF and cover files. Upload directly to kdp.amazon.com — your book can be live within 72 hours.',
        tip: 'Pro tip: Always use KDP Preview to check margins before approving.',
    },
];

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; pill: string }> = {
    indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', text: 'text-indigo-400', pill: 'bg-indigo-500' },
    violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-400', pill: 'bg-violet-500' },
    rose:   { bg: 'bg-rose-500/10',   border: 'border-rose-500/20',   text: 'text-rose-400',   pill: 'bg-rose-500'   },
    emerald:{ bg: 'bg-emerald-500/10',border: 'border-emerald-500/20',text: 'text-emerald-400',pill: 'bg-emerald-500'},
};

interface OnboardingOverlayProps {
    isOpen: boolean;
    onDismiss: () => void;
}

export const OnboardingOverlay: React.FC<OnboardingOverlayProps> = ({ isOpen, onDismiss }) => {
    const [step, setStep] = useState(0);
    const current = STEPS[step];
    const colors = COLOR_MAP[current.color];
    const Icon = current.icon;
    const isLast = step === STEPS.length - 1;

    const handleDismiss = () => {
        localStorage.setItem('pl_onboarded', '1');
        onDismiss();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
                        onClick={handleDismiss}
                    />

                    {/* Card */}
                    <motion.div
                        className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
                        initial={{ opacity: 0, scale: 0.92, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 24 }}
                        transition={{ type: 'spring', damping: 24, stiffness: 280 }}
                    >
                        {/* Close */}
                        <button
                            onClick={handleDismiss}
                            className="absolute top-4 right-4 z-10 p-1.5 rounded-full text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <X size={16} />
                        </button>

                        {/* Step header */}
                        <div className={`${colors.bg} ${colors.border} border-b px-6 py-4 flex items-center gap-3`}>
                            <div className={`w-9 h-9 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center`}>
                                <Icon size={17} className={colors.text} />
                            </div>
                            <div>
                                <p className={`text-[9px] font-black uppercase tracking-[0.25em] ${colors.text}`}>
                                    Step {step + 1} of {STEPS.length}
                                </p>
                                <h2 className="text-sm font-bold text-white">{current.title}</h2>
                            </div>
                        </div>

                        {/* Body */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="p-6 space-y-5"
                            >
                                <p className="text-sm text-slate-300 leading-relaxed">{current.body}</p>

                                <div className="bg-slate-800/60 rounded-xl px-4 py-3 flex gap-3">
                                    <Rocket size={14} className="text-amber-400 shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-slate-400 leading-relaxed">{current.tip}</p>
                                </div>

                                {/* Step dots */}
                                <div className="flex items-center justify-center gap-2 pt-1">
                                    {STEPS.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setStep(i)}
                                            className={`h-1.5 rounded-full transition-all ${
                                                i === step ? `w-6 ${colors.pill}` : 'w-1.5 bg-slate-700 hover:bg-slate-600'
                                            }`}
                                        />
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 pt-1">
                                    {step > 0 && (
                                        <button
                                            onClick={() => setStep(s => s - 1)}
                                            className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 text-xs font-bold uppercase tracking-widest transition-colors"
                                        >
                                            Back
                                        </button>
                                    )}
                                    <motion.button
                                        onClick={isLast ? handleDismiss : () => setStep(s => s + 1)}
                                        className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${colors.pill} text-white hover:opacity-90`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {isLast ? (
                                            <>
                                                <Rocket size={14} /> Launch My First Book
                                            </>
                                        ) : (
                                            <>
                                                Next <ArrowRight size={13} />
                                            </>
                                        )}
                                    </motion.button>
                                </div>

                                <button
                                    onClick={handleDismiss}
                                    className="w-full text-center text-[10px] text-slate-600 hover:text-slate-400 transition-colors"
                                >
                                    Skip tour
                                </button>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
