import React, { useState, useEffect } from 'react';
import {
    Sparkles, BookOpen, PenTool, LayoutTemplate, Printer, Download, Check, Star,
    Shirt, Target, TrendingUp, Rocket, Search, Box, Palette, ShieldCheck,
    BarChart3, Maximize, Scissors, Zap, Coins, ChevronRight, ShieldAlert, Settings,
    Play, Video, MousePointer2, Layers, Cpu, Globe, ArrowRight, X, Mail
} from 'lucide-react';
import { motion } from 'framer-motion';
import LegalModal from './LegalModal';
import { GenerativeBrain, NeuralNetworkBackground, IndustrialReactorNode, LivePipelineTerminal } from './GenerativeVisuals';
import TeaserPlayer from './TeaserPlayer';
import '../LandingPage.css';

export default function LandingPage({
    onLaunchApp,
    onViewDetail,
    onViewPricing
}: {
    onLaunchApp: (prompt?: string) => void,
    onViewDetail?: (type: 'manuscript' | 'cover' | 'trends') => void,
    onViewPricing?: () => void
}) {
    const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | 'refund' | null>(null);
    const [selectedMode, setSelectedMode] = useState<'SELF-PUBLISHER' | 'POD SELLER' | 'STUDIO / AGENCY'>('SELF-PUBLISHER');
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);

    // New State for Conversion Features
    const [genesisPrompt, setGenesisPrompt] = useState('');
    const [roiBooks, setRoiBooks] = useState(12); // Default 12 books/year
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('support@publishlab.ink');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Derived Savings Calculation
    // Old Stack: $207/mo * 12 = $2484/yr
    // Artisan: $15/book * roiBooks (Assumed credit cost per full project)
    const oldStackCost = 2484;
    const artisanCost = roiBooks * 15;
    const yearlySavings = oldStackCost - artisanCost;

    // Mode-specific briefing data
    const MODE_BRIEFING = {
        'SELF-PUBLISHER': {
            icon: <BookOpen size={16} />,
            text: "Optimizing for KDP Velocity. Automated manuscripts, bleed-safe covers, and keyword-rich metadata.",
            cta: "Launch Manuscript Engine",
            color: "indigo"
        },
        'POD SELLER': {
            icon: <Shirt size={16} />,
            text: "Scaling Merchandise Factory. Procedural designs for Etsy/Shopify. Automated background removal.",
            cta: "Launch Merch Foundry",
            color: "emerald"
        },
        'STUDIO / AGENCY': {
            icon: <Globe size={16} />,
            text: "Enterprise Infrastructure. Multi-project management, deep market intelligence, and ROI metrics.",
            cta: "View Enterprise Stack",
            color: "purple"
        }
    };

    const handleGenesisSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (genesisPrompt.trim()) {
            onLaunchApp(genesisPrompt);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden relative">

            {/* ROBUST BACKGROUND LAYERS */}
            <div className="fixed inset-0 bg-radial-glow pointer-events-none z-0" />
            <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0 opacity-50" />

            {/* NAVBAR */}
            <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/5 bg-[#050505]/80">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/assets/publishlab_logo.svg" alt="PublishLab Logo" className="w-10 h-10 rounded-lg" />
                        <span className="text-xl font-bold tracking-tight text-white">PublishLab</span>
                    </div>
                    <div className="flex items-center gap-10">
                        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400 tracking-wide uppercase text-[11px]">
                            <a href="#system" className="hover:text-white transition-colors">System</a>
                            <a href="#features" className="hover:text-white transition-colors">Intelligence</a>
                            <a href="#infrastructure" className="hover:text-white transition-colors">Infrastructure</a>
                            <button onClick={onViewPricing} className="hover:text-white transition-colors">Licensing</button>
                        </div>
                        <button
                            onClick={() => onLaunchApp()}
                            className="relative group overflow-hidden px-6 py-3 bg-white text-black text-xs font-black uppercase tracking-widest rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Launch Beta Studio
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent translate-x-[-200%] group-hover:animate-shine" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* 1. HERO REINVENTION: THE INDUSTRIAL GALAXY CORE */}
            <section className="pt-48 pb-32 px-6 relative overflow-hidden perspective-1000">
                <NeuralNetworkBackground />
                <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-left space-y-12"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-indigo-500/40 bg-indigo-500/10 text-[10px] font-black tracking-[0.3em] text-indigo-400 uppercase shadow-indigo-500/20 shadow-lg">
                            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                            <span>v4.0 Alpha Reactor Online</span>
                        </div>

                        <div>
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] mb-8 uppercase italic font-industrial">
                                OWN THE <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600 drop-shadow-2xl">ENTIRE FACTORY</span>
                            </h1>
                            <p className="text-xl text-gray-400 leading-relaxed max-w-xl font-medium border-l-[3px] border-indigo-500/60 pl-8 py-2">
                                Artisan AI is the ultimate industrial production line for creators. Scale from concept to global distribution in seconds.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-6 pt-4">
                            <button
                                onClick={() => onLaunchApp()}
                                className="group relative px-10 py-5 bg-white text-black font-black uppercase tracking-widest rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)] overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <Zap size={20} fill="black" />
                                    Launch The Studio
                                </span>
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-indigo-500/20 to-transparent translate-x-[-200%] group-hover:animate-shine" />
                            </button>
                            <button
                                onClick={() => document.getElementById('galaxy')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-10 py-5 bg-slate-950/50 border border-white/10 hover:bg-white/5 text-white/80 font-black uppercase tracking-widest text-[11px] rounded-full transition-all backdrop-blur-xl"
                            >
                                Explore The Arsenal
                            </button>
                        </div>

                        {/* Mode Quick-Selection (Stitch Redesign) */}
                        <div className="pt-10 border-t border-white/5 space-y-6">
                            <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-black italic">Select Deployment Zone:</p>
                            <div className="flex flex-wrap gap-3">
                                {(['SELF-PUBLISHER', 'POD SELLER', 'STUDIO / AGENCY'] as const).map((mode) => (
                                    <button
                                        key={mode}
                                        onClick={() => setSelectedMode(mode)}
                                        className={`px-5 py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-tighter border-2 ${selectedMode === mode
                                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] rotate-[-1deg]'
                                            : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20 hover:text-gray-300'
                                            }`}
                                    >
                                        {mode}
                                    </button>
                                ))}
                            </div>

                            <motion.div
                                key={selectedMode}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-6 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/20 backdrop-blur-sm flex items-start gap-5 group hover:border-indigo-500/40 transition-all duration-500"
                            >
                                <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 shadow-inner">
                                    {MODE_BRIEFING[selectedMode].icon}
                                </div>
                                <div className="space-y-3">
                                    <p className="text-[14px] text-gray-300 font-medium leading-relaxed">
                                        {MODE_BRIEFING[selectedMode].text}
                                    </p>
                                    <button
                                        onClick={() => onLaunchApp()}
                                        className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 group-hover:text-white transition-colors flex items-center gap-2"
                                    >
                                        Deploy Protocol <ChevronRight size={12} strokeWidth={3} />
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    <div className="relative h-[600px] w-full flex items-center justify-center animate-industrial-float">
                        {/* 3D CORE REACTOR VISUAL */}
                        <div className="absolute inset-0 bg-indigo-500/20 blur-[120px] rounded-full animate-pulse" />
                        <div className="relative w-full aspect-square max-w-[500px] glass-card rounded-[4rem] group overflow-hidden rotate-[2deg] shadow-2xl border-white/10 p-1">
                            <div className="absolute inset-0 bg-radial-glow opacity-50 z-0" />
                            <div className="w-full h-full relative z-10 p-10 flex flex-col items-center justify-center text-center">
                                <IndustrialReactorNode />
                                <div className="mt-8 space-y-4">
                                    <div className="flex gap-2 justify-center">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-indigo-500 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[11px] font-black uppercase tracking-[0.5em] text-white/60">Factory_Mainframe_Status: Locked</p>
                                </div>
                            </div>

                            {/* Floating Metadata Overlays */}
                            <div className="absolute top-10 right-10 p-4 glass-card rounded-2xl border-white/20 translate-x-8 group-hover:translate-x-0 transition-transform duration-700">
                                <TrendingUp className="text-emerald-400 mb-2" size={16} />
                                <div className="text-[10px] font-bold text-white uppercase tracking-widest">+942% Eff.</div>
                            </div>
                            <div className="absolute bottom-10 left-10 p-4 glass-card rounded-2xl border-white/20 -translate-x-8 group-hover:translate-x-0 transition-transform duration-700">
                                <Cpu className="text-indigo-400 mb-2" size={16} />
                                <div className="text-[10px] font-bold text-white uppercase tracking-widest">Neural Sync</div>
                            </div>
                        </div>

                        {/* Interactive Genesis Input (Re-engineered) */}
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
                            <form onSubmit={handleGenesisSubmit} className="relative group/input">
                                <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover/input:opacity-60 transition duration-1000" />
                                <div className="relative flex items-center bg-black/80 backdrop-blur-3xl rounded-2xl border border-white/10 p-2 shadow-2xl transition-all group-focus-within:border-indigo-500/50">
                                    <div className="pl-4 text-indigo-400"><Sparkles size={20} /></div>
                                    <input
                                        type="text"
                                        value={genesisPrompt}
                                        onChange={(e) => setGenesisPrompt(e.target.value)}
                                        placeholder="Initialize generation sequence..."
                                        className="flex-1 bg-transparent border-none text-white px-5 py-4 focus:ring-0 placeholder:text-gray-600 text-[13px] font-medium outline-none"
                                    />
                                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 p-4 rounded-xl shadow-lg transition-all active:scale-95">
                                        <ArrowRight size={20} className="text-white" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST / SOCIAL PROOF */}
            <section className="py-12 border-y border-white/5 bg-black/40 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-sm text-gray-400 font-bold mb-8 uppercase tracking-[0.2em]">
                        Engineered for global ecosystem integration.
                    </p>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        {/* Replaced generic avatars with enterprise logos concept */}
                        <div className="flex items-center gap-3"><Box size={24} /> <span className="font-black text-xl tracking-tight">DEPLOY TO AMAZON KDP</span></div>
                        <div className="flex items-center gap-3"><Globe size={24} /> <span className="font-black text-xl tracking-tight">SYNC WITH SHOPIFY</span></div>
                        <div className="flex items-center gap-3"><BookOpen size={24} /> <span className="font-black text-xl tracking-tight">FORMAT FOR INGRAM</span></div>
                        <div className="flex items-center gap-3"><Palette size={24} /> <span className="font-black text-xl tracking-tight">EXPORT TO ETSY</span></div>
                    </div>
                </div>
            </section>

            {/* PROBLEM VALIDATION: THE BROKEN SYSTEM */}
            <section className="py-24 px-6 bg-[#050505] relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-block mb-4 p-2 bg-red-900/10 border border-red-500/20 rounded text-xs font-bold text-red-500 uppercase tracking-widest">
                        Diagnosis
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-8">Publishing Today Is Broken.</h2>
                    <p className="text-xl text-gray-400 leading-relaxed mb-12">
                        Trends change faster than creators can react. Platform rules are opaque.
                        Manual formatting destroys scale. Rejections kill momentum.
                        Agencies drown in tool sprawl.
                    </p>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto" />
                    <p className="mt-8 text-white font-medium">
                        PublishLab was built to replace all of that.
                    </p>
                </div>
            </section>

            {/* COMPARISON: INFRASTRUCTURE PITCH */}
            <section id="system" className="py-24 px-6 bg-black relative">
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-[0.3em] mb-4">System Architecture</h2>
                        <h3 className="text-3xl text-white font-bold">This is not a tool. It is infrastructure.</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-stretch">
                        {/* SAAS HELL */}
                        <div className="bg-[#0A0A0A] border border-white/5 p-10 rounded-2xl relative overflow-hidden group hover:border-red-500/20 transition-colors">
                            <div className="absolute top-0 right-0 p-6 opacity-10"><ShieldAlert size={80} className="text-red-500" /></div>
                            <h3 className="text-2xl font-black text-red-500 uppercase italic mb-6">The SaaS Hell</h3>
                            <ul className="space-y-4 mb-8 text-gray-400">
                                <li className="flex gap-3"><X className="text-red-500 shrink-0" /> Fragmented, disconnected tools</li>
                                <li className="flex gap-3"><X className="text-red-500 shrink-0" /> Subscription fatigue ($200+/mo)</li>
                                <li className="flex gap-3"><X className="text-red-500 shrink-0" /> Manual data handoffs & CSV hell</li>
                                <li className="flex gap-3"><X className="text-red-500 shrink-0" /> Constant risk of IP infringement</li>
                            </ul>
                            <img src="/problem_saas_clutter.png" alt="SaaS Clutter" className="w-full rounded-lg shadow-2xl opacity-60 grayscale group-hover:grayscale-0 transition-all border border-white/5" />
                        </div>

                        {/* ARTISAN GENESIS */}
                        <div className="bg-[#111] border border-indigo-500/30 p-10 rounded-2xl relative overflow-hidden group shadow-[0_0_30px_rgba(99,102,241,0.1)] flex flex-col h-full">
                            <div className="absolute top-0 right-0 p-6 opacity-10"><Cpu size={80} className="text-indigo-500" /></div>
                            <h3 className="text-2xl font-black text-indigo-400 uppercase italic mb-6">PublishLab</h3>
                            <ul className="space-y-4 mb-8 text-gray-300">
                                <li className="flex gap-3"><Check className="text-indigo-400 shrink-0" /> Single autonomous industrial pipeline</li>
                                <li className="flex gap-3"><Check className="text-indigo-400 shrink-0" /> Pay-per-result efficiency</li>
                                <li className="flex gap-3"><Check className="text-indigo-400 shrink-0" /> Platform-aware compliance guardrails</li>
                                <li className="flex gap-3"><Check className="text-indigo-400 shrink-0" /> Predictive market signals (Real-time)</li>
                            </ul>

                            {/* Visual Stack - Now Fills Space */}
                            <div className="flex-1 min-h-[450px] relative rounded-xl overflow-hidden border border-indigo-500/20 bg-[#050505]/60 group-hover:border-indigo-500/50 transition-all duration-700 flex flex-col">
                                {/* Top 60%: The Reactor core */}
                                <div className="h-[60%] relative">
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-t from-indigo-500/10 to-transparent" />
                                    <IndustrialReactorNode />
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-indigo-500/30 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400">Core_Reactive_Mode_Active</span>
                                    </div>
                                </div>

                                {/* Bottom Sections: Feed + Metrics */}
                                <div className="flex-1 bg-black/40 border-t border-white/5 relative flex flex-col">
                                    <div className="absolute top-0 left-0 px-2 py-0.5 bg-indigo-500/10 border-r border-b border-indigo-500/20 text-[6px] font-mono text-indigo-500/70 uppercase tracking-widest">
                                        Live_Pipeline_Feed
                                    </div>
                                    <div className="flex-1 overflow-hidden min-h-[120px]">
                                        <LivePipelineTerminal />
                                    </div>

                                    {/* Real-time Industrial Metrics */}
                                    <div className="px-4 py-3 border-t border-white/5 grid grid-cols-3 gap-2 bg-[#080808]">
                                        {[
                                            { label: 'THROUGHPUT', val: '99.4%', color: 'text-indigo-400' },
                                            { label: 'LATENCY', val: '22ms', color: 'text-emerald-400' },
                                            { label: 'STABILITY', val: 'LOCKED', color: 'text-blue-400' }
                                        ].map((m, i) => (
                                            <div key={i} className="text-center">
                                                <p className="text-[6px] text-gray-600 font-mono tracking-tighter mb-0.5">{m.label}</p>
                                                <p className={`text-[10px] font-black ${m.color} tracking-tight`}>{m.val}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Final Impact Message */}
                                    <div className="h-10 bg-indigo-500/10 border-t border-indigo-500/20 flex items-center justify-center">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1 h-1 rounded-full bg-indigo-400 animate-ping" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">
                                                The SaaS Hell, Ends Here
                                            </span>
                                            <div className="w-1 h-1 rounded-full bg-indigo-400 animate-ping" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. THE FEATURE GALAXY (PHASED BENTO REINVENTION) */}
            <section id="galaxy" className="py-24 px-6 bg-slate-950/50 border-y border-white/5 relative">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-center mb-24 space-y-6"
                    >
                        <h2 className="text-[12px] font-black text-indigo-500 uppercase tracking-[0.5em] italic">The Autonomous Arsenal</h2>
                        <h3 className="text-4xl md:text-6xl font-black text-white italic font-industrial tracking-tighter">WHY RENT TOOLS WHEN <br /> YOU CAN OWN THE GALAXY?</h3>
                        <p className="text-gray-500 max-w-2xl mx-auto uppercase text-[11px] font-black tracking-widest leading-loose">Artisan AI aggregates 15+ industrial-grade engines into a single production factory.</p>
                    </motion.div>

                    <div className="bento-grid">
                        {/* FEATURE CARDS: STITCH PROTOCOL */}
                        {[
                            { title: 'KDP Book Lab', icon: <BookOpen />, desc: 'End-to-end writing, layout, and publishing suite.', color: 'indigo', size: 'col-span-1 md:col-span-2' },
                            { title: 'POD Designer', icon: <Shirt />, desc: '30+ high-fidelity styles for luxury merchandise.', color: 'emerald', size: 'col-span-1' },
                            { title: 'Niche Radar', icon: <Search />, desc: 'Real-time market scanning and gap analysis.', color: 'emerald', size: 'col-span-1' },
                            { title: 'Manuscript Doctor', icon: <PenTool />, desc: 'AI-driven structure and flow optimization.', color: 'indigo', size: 'col-span-1' },
                            { title: 'Logo Creator', icon: <Palette />, desc: 'Industrial branding core for digital assets.', color: 'purple', size: 'col-span-1 md:col-span-2' },
                            { title: 'Trend Intel', icon: <TrendingUp />, desc: 'Predictive seasonal analysis for global markets.', color: 'emerald', size: 'col-span-1' },
                            { title: 'Object Isolator', icon: <Scissors />, desc: 'Precise industrial alpha-stripping for subjects.', color: 'blue', size: 'col-span-1' },
                            { title: 'HD Upscaler', icon: <Maximize />, desc: 'Canvas-based real-time 4k asset remastering.', color: 'blue', size: 'col-span-1' },
                            { title: 'Ban Shield', icon: <ShieldCheck />, desc: 'Platform-aware compliance guardrails.', color: 'red', size: 'col-span-1' },
                            { title: 'SEO Engine', icon: <BarChart3 />, desc: 'Massive metadata optimization for search engines.', color: 'indigo', size: 'col-span-1' },
                        ].map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className={`group glass-card p-10 rounded-[3rem] transition-all duration-500 hover:scale-[1.03] hover:border-white/20 hover:shadow-2xl hover:shadow-${f.color}-500/10 cursor-pointer ${f.size}`}
                            >
                                <div className={`w-16 h-16 rounded-[1.5rem] bg-${f.color}-500/10 border border-${f.color}-500/20 flex items-center justify-center text-${f.color}-400 mb-8 transition-transform group-hover:rotate-12`}>
                                    {React.cloneElement(f.icon as React.ReactElement<any>, { size: 28, strokeWidth: 3 })}
                                </div>
                                <h3 className="text-xl font-black text-white italic tracking-tight mb-3 font-industrial uppercase">{f.title}</h3>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed group-hover:text-gray-300 transition-colors uppercase tracking-tight">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHO THIS IS FOR */}
            <section className="py-24 px-6 bg-black border-t border-white/5">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
                    <div className="p-8 border-l border-red-900/30">
                        <h3 className="text-lg font-bold text-gray-400 mb-6 uppercase tracking-widest">Who This Is <span className="text-red-500">NOT</span> For</h3>
                        <ul className="space-y-4 text-gray-500">
                            <li className="flex gap-2 items-center"><X size={16} /> Hobbyists dabbling in free tools</li>
                            {/* 4. ROI ENGINE v2: THE COST OF FRAGMENTATION */}
                            <section className="py-24 px-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />

                                <div className="max-w-6xl mx-auto glass-card rounded-[4rem] p-12 md:p-20 relative z-10 border-white/10 shadow-indigo-500/20 shadow-2xl overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-indigo-500 to-transparent" />

                                    <div className="roi-container gap-20 items-center">
                                        <div className="space-y-8 flex-1">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black tracking-widest text-emerald-400 uppercase">
                                                <TrendingUp size={12} /> Live Economic Audit
                                            </div>
                                            <h2 className="text-4xl md:text-5xl font-black text-white italic font-industrial tracking-tighter leading-tight uppercase">
                                                KILL THE <br />
                                                <span className="text-emerald-400">SUBSCRIPTION SWARM</span>
                                            </h2>
                                            <p className="text-gray-400 text-lg leading-relaxed font-medium">
                                                Fragmented tools (Canva + Midjourney + Jasper + Helium10) cost you $4,000+/year. <br />
                                                <span className="text-white">Artisan AI consolidates 15+ engines into one flat reactor.</span>
                                            </p>

                                            <div className="space-y-6 pt-4">
                                                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between group hover:border-emerald-500/40 transition-all">
                                                    <div className="text-gray-400 text-sm font-bold uppercase tracking-widest">Yearly Fragmented Cost</div>
                                                    <div className="text-2xl font-black text-red-400 font-mono tracking-tighter">$4,280</div>
                                                </div>
                                                <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-between shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                                                    <div className="text-emerald-400 text-sm font-black uppercase tracking-widest animate-pulse">Artisan_Factory_Cost</div>
                                                    <div className="text-2xl font-black text-white font-mono tracking-tighter">$290</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="glass-card rounded-[3rem] p-10 bg-slate-950/40 border-white/5 space-y-10 relative group flex-1">
                                            <div className="absolute -inset-1 bg-linear-to-r from-indigo-500/20 to-emerald-500/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000" />

                                            <div className="space-y-4 relative z-10">
                                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Asset Output (Monthly)</label>
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max="500"
                                                    defaultValue="50"
                                                    className="w-full accent-indigo-500 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer"
                                                />
                                                <div className="flex justify-between text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                                                    <span>1 Product</span>
                                                    <span className="text-indigo-400">Scale Mode</span>
                                                    <span>500+ Assets</span>
                                                </div>
                                            </div>

                                            <div className="pt-6 border-t border-white/5 text-center relative z-10">
                                                <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-4">Estimated Monthly Savings</div>
                                                <div className="text-6xl font-black text-white tracking-tighter font-industrial italic shadow-emerald-500/20 shadow-2xl">$1,840.42</div>
                                                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em] mt-4">+ 120 Hours Saved</p>
                                            </div>

                                            <button onClick={() => onLaunchApp()} className="w-full py-6 bg-linear-to-r from-indigo-600 to-indigo-500 text-white font-black uppercase tracking-widest rounded-[1.5rem] shadow-xl shadow-indigo-500/20 relative z-10 hover:scale-[1.02] active:scale-95 transition-all">
                                                Claim My Savings
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <li className="flex gap-2 items-center"><X size={16} /> One-off creators aiming for a single book</li>
                            <li className="flex gap-2 items-center"><X size={16} /> People afraid of industrial automation</li>
                        </ul>
                    </div>
                    <div className="p-8 border-l border-emerald-900/30 bg-emerald-900/5">
                        <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest">Who This Is <span className="text-emerald-500">Built</span> For</h3>
                        <ul className="space-y-4 text-gray-300 font-medium">
                            <li className="flex gap-2 items-center"><Check size={16} className="text-emerald-500" /> High-Volume Operators & Studios</li>
                            <li className="flex gap-2 items-center"><Check size={16} className="text-emerald-500" /> System-Thinkers scaling assets</li>
                            <li className="flex gap-2 items-center"><Check size={16} className="text-emerald-500" /> Publishers who value infrastructure over toys</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* FINAL CTA: INEVITABLE */}
            <section className="py-32 px-6 text-center relative bg-black">
                <div className="absolute inset-0 bg-indigo-900/10 blur-[100px] pointer-events-none" />
                <div className="max-w-3xl mx-auto relative z-10 space-y-10">
                    <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
                        BUILD YOUR <br />
                        INFRASTRUCTURE.
                    </h2>
                    <p className="text-xl text-gray-400 max-w-lg mx-auto">
                        No templates. No guesswork. No rejection cycles.
                    </p>
                    <button
                        onClick={() => onLaunchApp()}
                        className="px-10 py-5 bg-white text-black text-lg font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.4)] flex items-center gap-4 mx-auto"
                    >
                        <Zap size={24} fill="black" />
                        Enter PublishLab
                    </button>
                    <p className="text-sm text-gray-400 font-bold font-mono tracking-widest">SECURE ENTRY • CANCEL AT ANY TIME</p>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-20 border-t border-white/5 bg-black text-center text-gray-400">
                <div className="flex justify-center flex-col items-center gap-10 mb-8">
                    <div className="flex items-center gap-3 px-4 py-2 bg-green-900/10 border border-green-500/30 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.05)]">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                        <span className="text-xs font-black font-mono text-green-500 tracking-wider">SYSTEM ONLINE: v2.4.0 (STABLE)</span>
                    </div>

                    {/* LEGAL DISCLAIMER - NOMINAL FAIR USE */}
                    <p className="text-[11px] text-gray-500 max-w-2xl leading-relaxed font-medium">
                        PublishLab is an independent software provider. We are not affiliated with, endorsed by, or sponsored by Amazon, Shopify, Ingram, or Etsy.
                        All brand names and trademarks are the property of their respective owners and are used here for descriptive compatibility purposes only according to nominal fair use principles.
                    </p>

                    <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
                        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm font-bold uppercase tracking-widest text-gray-300">
                            <button onClick={() => setLegalModal('terms')} className="hover:text-indigo-400 transition-all hover:scale-105">Terms of Service</button>
                            <button onClick={() => setLegalModal('privacy')} className="hover:text-indigo-400 transition-all hover:scale-105">Privacy Policy</button>
                            <button onClick={() => setLegalModal('refund')} className="hover:text-indigo-400 transition-all hover:scale-105 underline underline-offset-8 decoration-indigo-500/50">Refund Policy</button>
                            <button onClick={onViewPricing} className="hover:text-indigo-400 transition-all hover:scale-105">Pricing</button>
                        </div>

                        <div className="flex flex-col items-center gap-4 py-8 border-y border-white/5 w-full">
                            <div className="flex items-center gap-2 text-gray-400 font-medium italic text-xs tracking-tight">
                                <Globe size={14} className="text-indigo-500/50" />
                                Registered Office: Adh Dhawq Street, Abu Dhabi, 00971, United Arab Emirates
                            </div>

                            <div className="relative group/support">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-20 group-hover/support:opacity-50 transition duration-500"></div>
                                <div className="relative flex items-center gap-4 bg-[#0A0A0A] border border-white/10 px-6 py-3 rounded-lg shadow-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-500/10 rounded-md">
                                            <Mail size={16} className="text-indigo-400" />
                                        </div>
                                        <a href="mailto:support@publishlab.ink" className="text-sm font-black text-white hover:text-indigo-400 transition-colors tracking-tight">
                                            support@publishlab.ink
                                        </a>
                                    </div>
                                    <div className="w-px h-6 bg-white/5" />
                                    <button
                                        onClick={handleCopyEmail}
                                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                                    >
                                        {copied ? (
                                            <span className="text-emerald-400 flex items-center gap-1 animate-in fade-in zoom-in duration-300">
                                                <Check size={12} /> Copied_Node
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1">
                                                Copy_Address
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex flex-col items-center gap-4">
                    <img src="/assets/publishlab_logo.svg" alt="PublishLab" className="w-8 h-8 opacity-20 mb-2" />
                    <p className="text-xs font-black font-mono tracking-[0.4em] text-gray-600">&copy; 2026 PUBLISHLAB. ALL RIGHTS RESERVED.</p>
                </div>
            </footer>

            {/* LEGAL MODAL */}
            {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}
        </div>
    );
}
