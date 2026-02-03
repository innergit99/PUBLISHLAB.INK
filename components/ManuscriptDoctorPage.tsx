import React from 'react';
import { BookOpen, Sparkles, Check, ArrowRight, Zap, Target, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { NeuralNetworkBackground } from './GenerativeVisuals';

const ManuscriptDoctorPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden relative">
            <NeuralNetworkBackground />

            {/* Header / Nav */}
            <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/5 bg-[#050505]/80">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <button onClick={onBack} className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
                        <ArrowRight className="rotate-180" size={18} />
                        <span className="text-sm font-bold uppercase tracking-widest">Back to Studio</span>
                    </button>
                    <div className="flex items-center gap-3">
                        <img src="/artisan_logo_official.png" alt="Logo" className="w-8 h-8 rounded" />
                        <span className="font-black uppercase italic tracking-tighter">Manuscript Doctor</span>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400 mb-8">
                            <Zap size={14} />
                            <span>50,000 WORDS IN 10 MINUTES</span>
                        </div>
                        <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
                            The End of <br />
                            <span className="text-gradient-animated">Writer's Block.</span>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed mb-10 max-w-xl">
                            Artisan's Manuscript Doctor doesn't just "generate" text. It architects narratives.
                            Using long-context Gemini models, it maintains perfect character consistency over 100+ chapters.
                        </p>
                        <div className="flex gap-6">
                            <button className="px-8 py-4 bg-indigo-600 rounded-full font-bold shadow-lg shadow-indigo-600/30 hover:scale-105 transition-all">
                                Try Doctor Now
                            </button>
                            <button className="px-8 py-4 bg-white/5 rounded-full font-bold border border-white/10 hover:bg-white/10 transition-all">
                                View Examples
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, rotateY: 30 }}
                        whileInView={{ opacity: 1, rotateY: 0 }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] bg-gradient-to-br from-indigo-900/20 to-black rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(99,102,241,0.2)] p-1 overflow-hidden">
                            <div className="bg-[#0A0A0A] w-full h-full rounded-[1.4rem] p-8 relative overflow-hidden">
                                {/* Simulated Editor UI */}
                                <div className="flex items-center justify-between mb-8 opacity-50">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/30" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/30" />
                                    </div>
                                    <span className="text-[10px] font-mono">CHAPTER_04_V3.md</span>
                                </div>
                                <div className="space-y-4 font-mono text-sm">
                                    <p className="text-gray-500">{"// Deep Context Injection Active"}</p>
                                    <p className="text-white">The storm broke exactly as the prophecy foretold. Lightning cracked the obsidian sky like a whip, illuminating the hollow spires of the Citadel.</p>
                                    <p className="text-gray-400">Aris gripped the hilt of his father's sword, the cold steel a grounding weight against the rising tide of magical resonance...</p>
                                    <div className="pt-10 flex flex-col gap-2">
                                        <div className="h-[2px] w-full bg-white/5 relative">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '85%' }}
                                                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                                                className="absolute top-0 left-0 h-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"
                                            />
                                        </div>
                                        <span className="text-[9px] text-indigo-500 uppercase tracking-widest font-bold">Synchronizing Character Bible (98%)</span>
                                    </div>
                                </div>
                                {/* Background Visual */}
                                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-600/10 blur-[80px] rounded-full" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: <Target className="text-red-400" />, title: 'Lore Consistency', desc: 'Maintains character physical traits, backstories, and verbal tics across millions of words.' },
                        { icon: <Layers className="text-indigo-400" />, title: 'Dynamic Outlining', desc: 'Generates detailed beats for every scene before writing, ensuring zero plot holes.' },
                        { icon: <Sparkles className="text-purple-400" />, title: 'Style Mimicry', desc: 'Adapts to your unique voice or targets specific genres (Hard Sci-Fi, Gothic Horror, etc.).' }
                    ].map((feat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all group"
                        >
                            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {feat.icon}
                            </div>
                            <h3 className="text-2xl font-black mb-4">{feat.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">{feat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ManuscriptDoctorPage;
