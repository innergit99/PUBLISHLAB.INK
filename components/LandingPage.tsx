import React, { useState, useEffect } from 'react';
import {
    Sparkles, BookOpen, PenTool, LayoutTemplate, Printer, Download, Check, Star,
    Shirt, Target, TrendingUp, Rocket, Search, Box, Palette, ShieldCheck,
    BarChart3, Maximize, Scissors, Zap, Coins, ChevronRight, ShieldAlert, Settings,
    Play, Video, MousePointer2, Layers, Cpu, Globe, ArrowRight, X, Mail
} from 'lucide-react';
import { motion } from 'framer-motion';
import LegalModal from './LegalModal';
import { GenerativeBrain, NeuralNetworkBackground } from './GenerativeVisuals';
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

    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 overflow-x-hidden">
            <NeuralNetworkBackground />

            {/* HERO SECTION */}
            <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)]" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 text-center space-y-8 max-w-5xl"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300">Industrial Publishing Infrastructure v4.0</span>
                    </div>

                    <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.85] text-white">
                        THE ARTISAN <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-indigo-600">FOUNDRY</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 font-medium max-w-2xl mx-auto italic leading-relaxed">
                        Precision engineering for the modern creator. Build, scale, and automate your KDP and POD empire with industrial-grade AI infrastructure.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                        <button
                            onClick={() => onLaunchApp()}
                            className="group relative px-12 py-6 bg-white text-black font-black uppercase tracking-[0.4em] text-sm overflow-hidden transition-all hover:scale-105 active:scale-95"
                        >
                            <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative z-10 group-hover:text-white transition-colors">Enter The Foundry</span>
                        </button>

                        <button
                            onClick={onViewPricing}
                            className="px-12 py-6 border border-white/20 bg-white/5 backdrop-blur-md font-black uppercase tracking-[0.4em] text-sm hover:bg-white/10 transition-all"
                        >
                            View Protocols
                        </button>
                    </div>

                    <div className="flex items-center justify-center gap-12 pt-16">
                        <div className="flex flex-col items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Deploy to</span>
                            <span className="text-lg font-black tracking-tighter italic">AMAZON KDP</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Sync with</span>
                            <span className="text-lg font-black tracking-tighter italic">SHOPIFY</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Fulfill via</span>
                            <span className="text-lg font-black tracking-tighter italic">PRINTFUL</span>
                        </div>
                    </div>
                </motion.div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
                    <div className="w-px h-12 bg-white" />
                </div>
            </section>

            {/* TRUSTED PARTNERS (NOMINAL FAIR USE) */}
            <section className="py-24 border-y border-white/5 bg-white/5 backdrop-blur-sm relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-gray-600 mb-12">Universal Integration Compatibility</p>
                    <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-30">
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-black italic">AMAZON KDP</span>
                            <span className="text-[8px] font-bold uppercase mt-1 tracking-tighter">API COMPLIANT</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-black italic">ETSY</span>
                            <span className="text-[8px] font-bold uppercase mt-1 tracking-tighter">SYNC READY</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-black italic">SHOPIFY</span>
                            <span className="text-[8px] font-bold uppercase mt-1 tracking-tighter">UCP CONNECT</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-black italic">REDBUBBLE</span>
                            <span className="text-[8px] font-bold uppercase mt-1 tracking-tighter">AUTO-LIST</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CORE INFRASTRUCTURE TOOLS */}
            <section className="py-40 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
                        <div className="space-y-4">
                            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter italic">CORE <span className="text-indigo-500">INFRA</span></h2>
                            <p className="text-gray-500 font-medium italic">Deconstruct the publishing stack. Automate every layer.</p>
                        </div>
                        <button className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-colors">
                            Explore All Modules <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <PenTool size={32} />, title: "Manuscript Doctor", desc: "Industrial-grade content synthesis and humanization audit.", type: 'manuscript' },
                            { icon: <Box size={32} />, title: "Cover Foundry", desc: "Algorithmic visual identity for bestsellers.", type: 'cover' },
                            { icon: <TrendingUp size={32} />, title: "Niche Radar", desc: "Live-scraped market intelligence and profit mapping.", type: 'trends' }
                        ].map((tool, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="group p-10 bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all rounded-[3rem] space-y-8 cursor-pointer"
                                onClick={() => onViewDetail && onViewDetail(tool.type as any)}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                    {tool.icon}
                                </div>
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter">{tool.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{tool.desc}</p>
                                <div className="pt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Deploy Module</span>
                                    <ChevronRight size={14} className="text-indigo-400" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SYSTEM CAPABILITIES SECTION (Industrial Grid) */}
            <section className="py-40 border-t border-white/5 relative z-10 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <h2 className="text-6xl font-black uppercase italic tracking-tighter leading-none">
                                    INDUSTRIAL <br />
                                    <span className="text-indigo-500">PRECISION</span>
                                </h2>
                                <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                                    Our infrastructure isn't just about AI generation—it's about the industrial scale fulfillment and market dominance.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-8">
                                {[
                                    { icon: <Layers size={20} />, title: "Bulk Scaling", desc: "Generate 100+ SKU variants in a single pass." },
                                    { icon: <ShieldCheck size={20} />, title: "IP Safety", desc: "Real-time trademark and compliance monitoring." },
                                    { icon: <Cpu size={20} />, title: "Gemini Pro 1.5", desc: "Massive context window for full-manuscripts." },
                                    { icon: <Globe size={20} />, title: "Global Sync", desc: "Native API hooks for Amazon, Etsy & Shopify." }
                                ].map((cap, i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="text-indigo-500">{cap.icon}</div>
                                        <h4 className="text-xs font-black uppercase tracking-widest text-white">{cap.title}</h4>
                                        <p className="text-[10px] text-gray-500 leading-relaxed font-medium">{cap.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-indigo-500/10 blur-3xl rounded-full" />
                            <div className="relative bg-slate-900 border border-white/10 p-4 rounded-[3.5rem] shadow-2xl overflow-hidden">
                                <TeaserPlayer />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="py-40 px-6 text-center relative z-10">
                <div className="max-w-4xl mx-auto space-y-12">
                    <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter italic">READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-white">SHIP?</span></h2>
                    <p className="text-xl text-gray-400 font-medium italic">Join the next generation of industrial publishers.</p>
                    <button
                        onClick={() => onLaunchApp()}
                        className="group relative px-20 py-8 bg-indigo-600 text-white font-black uppercase tracking-[0.5em] text-sm overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(99,102,241,0.3)] hover:shadow-[0_0_80px_rgba(99,102,241,0.5)]"
                    >
                        <Zap size={24} fill="black" />
                        Enter The Foundry
                    </button>
                    <p className="text-xs text-gray-600 font-mono">SECURE ENTRY • CANCEL AT ANY TIME</p>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-20 border-t border-white/5 bg-black/80 backdrop-blur-md relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12 mb-16 text-left">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <img src="/artisan_logo_official.png" alt="Artisan AI" className="w-8 h-8 opacity-50" />
                                <span className="font-bold text-white tracking-tight">Artisan AI Industrial</span>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Advanced KDP & POD automation infrastructure for
                                studios, agencies, and high-volume independent publishers.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xs font-black uppercase tracking-widest text-white">Legal & Compliance</h4>
                            <div className="flex flex-col gap-2 text-xs text-gray-400">
                                <button onClick={() => setLegalModal('terms')} className="hover:text-white transition-colors text-left">Terms of Service</button>
                                <button onClick={() => setLegalModal('privacy')} className="hover:text-white transition-colors text-left">Privacy Policy</button>
                                <button onClick={() => setLegalModal('refund')} className="hover:text-white transition-colors text-left underline underline-offset-4 decoration-indigo-500/50">Refund Policy</button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xs font-black uppercase tracking-widest text-white">Global Support</h4>
                            <div className="flex flex-col gap-2 text-xs text-gray-400">
                                <div className="flex items-center gap-2"><Mail size={12} className="text-indigo-500" /> support@artisan-ai.com</div>
                                <div className="flex items-center gap-2 opacity-50 italic">Registered Office: Adh Dhawq Street, Abu Dhabi, 00971, United Arab Emirates</div>
                                <div className="flex items-center gap-2 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded w-fit">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[9px] font-mono text-green-500 uppercase">System Status: Operational</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-6">
                        {/* LEGAL DISCLAIMER - NOMINAL FAIR USE */}
                        <p className="text-[10px] text-gray-500 max-w-4xl text-center leading-relaxed opacity-40">
                            Artisan AI is an independent software provider. References to Amazon KDP, Etsy, Shopify, Printful, and Midjourney are for compatibility and integration descriptions only according to nominal fair use principles. We are not affiliated with, endorsed by, or partnered with these entities.
                        </p>
                        <p className="text-[10px] font-mono opacity-30 uppercase tracking-tighter">&copy; 2026 ARTISAN AI INDUSTRIAL GROUP. ALL RIGHTS RESERVED.</p>
                    </div>
                </div>
            </footer>

            {/* LEGAL MODALS */}
            {legalModal && (
                <LegalModal
                    type={legalModal}
                    onClose={() => setLegalModal(null)}
                />
            )}
        </div>
    );
}
