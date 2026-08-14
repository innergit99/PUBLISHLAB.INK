import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle } from 'lucide-react';

export interface GenerationStep {
    id: string;
    label: string;
    detail?: string;
}

interface GenerationProgressBarProps {
    isVisible: boolean;
    steps: GenerationStep[];
    currentStepId: string | null;
}

export const GenerationProgressBar: React.FC<GenerationProgressBarProps> = ({
    isVisible,
    steps,
    currentStepId,
}) => {
    const currentIdx = steps.findIndex(s => s.id === currentStepId);
    const progressPct = currentIdx < 0 ? 0 : Math.round(((currentIdx + 0.5) / steps.length) * 100);
    const currentStep = steps[currentIdx] ?? null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                    className="w-full rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Loader2 size={15} className="text-indigo-400 animate-spin" />
                            <span className="text-xs font-black uppercase tracking-widest text-white">
                                {currentStep?.label ?? 'Initializing…'}
                            </span>
                        </div>
                        <span className="text-xs font-bold text-slate-500 tabular-nums">
                            {currentIdx + 1} / {steps.length}
                        </span>
                    </div>

                    <AnimatePresence mode="wait">
                        {currentStep?.detail && (
                            <motion.p
                                key={currentStep.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-[10px] text-slate-500 leading-relaxed"
                            >
                                {currentStep.detail}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                        <motion.div
                            className="h-full rounded-full bg-indigo-500"
                            initial={{ width: '0%' }}
                            animate={{ width: `${progressPct}%` }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        {steps.map((step, idx) => {
                            const done = idx < currentIdx;
                            const active = idx === currentIdx;
                            return (
                                <div
                                    key={step.id}
                                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                                        done
                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                            : active
                                            ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'
                                            : 'bg-slate-800 text-slate-600 border border-slate-700'
                                    }`}
                                >
                                    {done && <CheckCircle size={10} />}
                                    {step.label}
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const KDP_GENERATION_STEPS: GenerationStep[] = [
    {
        id: 'outline',
        label: 'Creating Outline',
        detail: 'Architecting chapter structure, character arcs, and narrative flow…',
    },
    {
        id: 'blueprint',
        label: 'Building Blueprint',
        detail: 'Assembling KDP metadata, cover specs, and interior structure…',
    },
    {
        id: 'blurb',
        label: 'Writing Back Cover',
        detail: 'Crafting a sales-optimized blurb that converts browser to buyer…',
    },
];
