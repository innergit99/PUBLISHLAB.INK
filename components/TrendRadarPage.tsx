import React from 'react';
import { TrendingUp, BarChart3, Search, Target, ArrowRight, Zap, Globe, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { NeuralNetworkBackground } from './GenerativeVisuals';

const TrendRadarPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden relative">
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
                        <span className="font-black uppercase italic tracking-tighter">Trend Radar</span>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400 mb-8">
                            <TrendingUp size={14} />
                            <span>REAL-TIME AMAZON API SYNC</span>
                        </div>
                        <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
                            Hunt the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Unseen Gap.</span>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed mb-10 max-w-xl">
                            Trend Radar scans millions of search queries to find "Zero-Competition" high-demand niches. Don't guess. Build what the world is already searching for.
                        </p>
                        <div className="flex gap-6">
                            <button className="px-8 py-4 bg-emerald-600 rounded-full font-bold shadow-lg shadow-emerald-600/30 hover:scale-105 transition-all">
                                Scan Marketplace
                            </button>
                            <button className="px-8 py-4 bg-white/5 rounded-full font-bold border border-white/10 hover:bg-white/10 transition-all">
                                Competitive Intel
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group"
                    >
                        {/* Radar Circle Animation */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-[150%] h-[150%] border-2 border-emerald-500/5 rounded-full animate-pulse" />
                            <div className="w-full h-full border border-emerald-500/10 rounded-full scale-75" />
                            <div className="absolute w-[2px] h-1/2 bg-gradient-to-t from-emerald-500 to-transparent origin-bottom animate-spin-slow opacity-20" />
                        </div>

                        {/* Data Dashboard */}
                        <div className="relative z-10 space-y-6">
                            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                                <div>
                                    <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Niche Discovery</div>
                                    <div className="text-xl font-black">Cozy Sci-Fi Mystery</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Profit Potential</div>
                                    <div className="text-xl font-black text-emerald-500">$4,200/mo</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-black rounded-xl border border-white/5">
                                    <div className="text-[10px] text-gray-500 mb-1">COMPETITION</div>
                                    <div className="w-full h-1 bg-white/10 rounded-full">
                                        <div className="w-1/4 h-full bg-emerald-500" />
                                    </div>
                                    <div className="mt-2 text-xs font-bold text-indigo-400">VERY LOW</div>
                                </div>
                                <div className="p-4 bg-black rounded-xl border border-white/5">
                                    <div className="text-[10px] text-gray-500 mb-1">DEMAND</div>
                                    <div className="w-full h-1 bg-white/10 rounded-full">
                                        <div className="w-[85%] h-full bg-emerald-500" />
                                    </div>
                                    <div className="mt-2 text-xs font-bold text-emerald-500">CRITICAL MASS</div>
                                </div>
                            </div>

                            <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <Cpu size={14} className="text-emerald-500" />
                                    <span className="text-[10px] font-bold text-emerald-300">AI AGENT RECOMMENDATION</span>
                                </div>
                                <p className="text-xs text-gray-400 leading-relaxed italic">
                                    "Target 'Intergalactic Pet Cafe' sub-niche. Keywords: 'Robot Cat', 'Espresso Nebula'. Estimated launch profitability: 84%."
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default TrendRadarPage;
