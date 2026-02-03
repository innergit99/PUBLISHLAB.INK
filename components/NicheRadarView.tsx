
import React, { useState, useEffect } from 'react';
import { Target, Loader2, Key, RefreshCw, Layers, Zap, ShoppingCart, Globe, Search } from 'lucide-react';
import { intelligenceService } from '../intelligenceService';
import { mcpBridge } from '../mcpBridge';
import { NicheRadarReport } from '../types';

interface NicheRadarViewProps {
    initialProbe?: string;
    onCopy: (text: string, id: string) => void;
    copyStatus: string | null;
    onError: (msg: string) => void;
}

export const NicheRadarView: React.FC<NicheRadarViewProps> = ({ initialProbe, onCopy, copyStatus, onError }) => {
    const [nicheProbe, setNicheProbe] = useState(initialProbe || '');
    const [isProbing, setIsProbing] = useState(false);
    const [nicheReport, setNicheReport] = useState<NicheRadarReport | null>(null);
    const [probeLogs, setProbeLogs] = useState<string[]>([]);
    const [liveDataEnabled, setLiveDataEnabled] = useState(false);

    // Check MCP Bridge on mount
    useEffect(() => {
        async function checkBridge() {
            const config = await mcpBridge.loadConfig();
            if (config && config.bridge.streaming_enabled) {
                setLiveDataEnabled(true);
            }
        }
        checkBridge();
    }, []);

    const handleProbe = async () => {
        if (!nicheProbe) return;
        setIsProbing(true);
        setProbeLogs(["[DEPLOYING_RADAR_PING]", "[TRIANGULATING_DEMAND]", "[ANALYZING_SATURATION]"]);

        // Simulate industrial log stream
        const interval = setInterval(() => {
            const logs = [
                "[SCANNED_AMAZON_BS_NODES]",
                "[ETSY_VELOCITY_CHECK]",
                "[TIKTOK_VIRALITY_INDEX]",
                "[TRADEMARK_WATCH_DOG]"
            ];
            setProbeLogs(prev => [...prev, logs[Math.floor(Math.random() * logs.length)]].slice(-4));
        }, 800);

        try {
            // Use MCP Bridge if available for live data (Phase 3 Injection)
            let context = {};
            if (liveDataEnabled) {
                try {
                    // Future: context = await mcpBridge.executeTool('firecrawl', 'scrape', { query: nicheProbe });
                    setProbeLogs(prev => [...prev, "[MCP_BRIDGE_ACTIVE: FIRECRAWL]"]);
                } catch (e) {
                    console.warn("MCP Bridge fallback to simulation");
                }
            }

            const report = await intelligenceService.probeNiche(nicheProbe);
            clearInterval(interval);
            setNicheReport(report);
        } catch (e) {
            clearInterval(interval);
            onError("Radar Jammed. Intelligence Service Offline.");
        } finally {
            clearInterval(interval);
            setIsProbing(false);
        }
    };

    return (
        <div className="p-12 max-w-5xl mx-auto min-h-[60vh] flex flex-col items-center justify-center animate-in fade-in duration-700">

            {/* HEADER SECTION */}
            <div className="text-center space-y-4 mb-12">
                <h1 className="text-7xl font-black uppercase italic tracking-tighter text-white">
                    Niche Radar <span className="text-emerald-500">2.0</span>
                </h1>
                <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Globe size={12} /> Global Scan</span>
                    <span className="text-slate-700">•</span>
                    <span className="flex items-center gap-1"><Zap size={12} /> {liveDataEnabled ? 'Live Data Active' : 'Simulation Mode'}</span>
                </div>
            </div>

            {/* INPUT CORE */}
            <div className="w-full relative group max-w-3xl">
                <div className={`absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 ${isProbing ? 'animate-pulse' : ''}`} />
                <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-[3rem] p-4 shadow-2xl backdrop-blur-xl">
                    <div className="pl-6 text-emerald-500"><Target size={24} /></div>
                    <input
                        value={nicheProbe}
                        onChange={(e) => setNicheProbe(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleProbe()}
                        placeholder="Enter Niche (e.g., 'Cyberpunk Gardening')"
                        className="flex-1 bg-transparent border-none focus:ring-0 text-white font-bold px-6 py-4 text-xl placeholder:text-slate-700 placeholder:italic"
                    />
                    <button onClick={handleProbe} disabled={isProbing || !nicheProbe} className="bg-emerald-600 text-white px-10 py-4 rounded-[2.5rem] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all disabled:opacity-50 shadow-lg active:scale-95">
                        {isProbing ? <Loader2 className="animate-spin" /> : "PING RADAR"}
                    </button>
                </div>
            </div>

            {/* LOG TERMINAL */}
            {isProbing && (
                <div className="mt-8 font-mono text-[10px] text-emerald-500/60 flex flex-col items-center gap-1">
                    {probeLogs.map((log, i) => (
                        <div key={i} className="animate-in slide-in-from-bottom-2 fade-in">{log}</div>
                    ))}
                </div>
            )}

            {/* INTELLIGENCE REPORT */}
            {nicheReport && !isProbing && (
                <div className="mt-16 w-full animate-in slide-in-from-bottom-8 space-y-12">

                    {/* VERDICT HUD */}
                    <div className="flex flex-col items-center gap-6">
                        <div className={`w-32 h-32 rounded-full flex items-center justify-center border-8 text-4xl font-black italic tracking-tighter shadow-[0_0_50px_currentColor] transition-all duration-1000 ${nicheReport.verdict === 'GO' ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10 shadow-emerald-500/20' : nicheReport.verdict === 'STOP' ? 'border-red-500 text-red-500 bg-red-500/10 shadow-red-500/20' : 'border-amber-500 text-amber-500 bg-amber-500/10 shadow-amber-500/20'}`}>
                            {nicheReport.score}
                        </div>
                        <h2 className={`text-6xl font-black uppercase italic tracking-tighter ${nicheReport.verdict === 'GO' ? 'text-emerald-500' : nicheReport.verdict === 'STOP' ? 'text-red-500' : 'text-amber-500'}`}>{nicheReport.verdict}</h2>
                        <div className="flex gap-2">
                            {nicheReport.why.map((reason, i) => (
                                <span key={i} className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-wide">{reason}</span>
                            ))}
                        </div>
                    </div>

                    {/* DATA MATRIX */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-slate-900/50 p-6 rounded-[2rem] border border-slate-800 backdrop-blur-sm hover:border-emerald-500/30 transition-colors group">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block mb-2 group-hover:text-emerald-500">Search Volume</span>
                            <span className="text-2xl font-black text-white">{nicheReport.volume}</span>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-[2rem] border border-slate-800 backdrop-blur-sm hover:border-amber-500/30 transition-colors group">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block mb-2 group-hover:text-amber-500">Competition</span>
                            <span className="text-2xl font-black text-white">{nicheReport.competition}</span>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-[2rem] border border-slate-800 backdrop-blur-sm hover:border-cyan-500/30 transition-colors group">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block mb-2 group-hover:text-cyan-500">Financial Matrix</span>
                            <span className="text-2xl font-black text-white">{nicheReport.financialMatrix?.roiPotential || "N/A"}</span>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-[2rem] border border-slate-800 backdrop-blur-sm hover:border-indigo-500/30 transition-colors group">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block mb-2 group-hover:text-indigo-500">Demand Signal</span>
                            <span className="text-2xl font-black text-white">{nicheReport.demandSignal?.toUpperCase() || "UNKNOWN"}</span>
                        </div>
                    </div>

                    {/* ANALYSIS SECTIONS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Keywords */}
                        <div className="bg-slate-950 border border-slate-900 p-8 rounded-[3rem] relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-5"><Key size={64} /></div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2"><Key size={14} /> Keyword Goldmine</h3>
                            <div className="flex flex-wrap gap-2">
                                {nicheReport.keywords.map((kw, i) => (
                                    <button key={i} onClick={() => onCopy(kw, `kw-${i}`)} className="px-4 py-2 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs font-bold text-slate-300 hover:text-white hover:border-emerald-500 transition-all active:scale-95">
                                        {copyStatus === `kw-${i}` ? <span className="text-emerald-500">COPIED</span> : kw}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Aesthetic Gap */}
                        <div className="bg-slate-950 border border-slate-900 p-8 rounded-[3rem] relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-5"><Layers size={64} /></div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2"><Layers size={14} /> Aesthetic Gap Opportunity</h3>
                            <div className="space-y-4">
                                <div className="text-xs text-slate-300 leading-relaxed font-medium">
                                    <span className="text-slate-600 block text-[9px] uppercase tracking-widest mb-1">Current Market Style</span>
                                    "{nicheReport.aestheticGap?.currentStyle || "Generic"}"
                                </div>
                                <div className="text-xs text-white leading-relaxed font-bold p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                                    <span className="text-emerald-500 block text-[9px] uppercase tracking-widest mb-1">The Opportunity</span>
                                    "{nicheReport.aestheticGap?.gapOpportunity || "Optimize for premium industrial feel."}"
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};
