import React, { useState } from 'react';
import { ChevronLeft, Loader2, Sparkles } from 'lucide-react';
import { ToolComponentProps } from './types';
import { visualService } from '../../visualService';

export const LogoCreatorTool: React.FC<ToolComponentProps> = ({ onBack, isDarkMode }) => {
  const [logoBrand, setLogoBrand] = useState('');
  const [logoAesthetic, setLogoAesthetic] = useState('Modern Minimalist');
  const [logoReport, setLogoReport] = useState<any>(null);
  const [logoLogs, setLogoLogs] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runLogoGeneration = async () => {
    if (!logoBrand) return;
    setIsGenerating(true);
    setError(null);
    setLogoLogs(["[COMMENCING_LOGO_SYSTEM_INIT]", "[DISTRIBUTING_TASKS_TO_16_AGENTS]", "[OPEN_CODE_QUOTA_MAXIMIZED]"]);

    const logInterval = setInterval(() => {
      const logs = ["[VECTOR_SYNTHESIS_ACTIVE]", "[CHROMATIC_HARVESTING]", "[TYPOGRAPHIC_DNA_MAPPING]", "[FINALIZING_GUIDELINES]"];
      setLogoLogs(prev => [...prev, logs[Math.floor(Math.random() * logs.length)]].slice(-4));
    }, 1200);

    try {
      const report = await visualService.generateLogoSystem(logoBrand, logoAesthetic);
      setLogoReport(report);
    } catch (e) { setError("Logo Engine Stall."); }
    finally {
      clearInterval(logInterval);
      setIsGenerating(false);
    }
  };

  const bgClass = isDarkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900';
  const cardClass = isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200';
  const inputClass = isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900';
  const textMuted = isDarkMode ? 'text-slate-500' : 'text-slate-400';

  return (
    <div className={`p-12 max-w-[1400px] mx-auto pb-24 animate-in fade-in ${bgClass}`}>
      <div className="flex items-center justify-between mb-16">
        <button onClick={onBack} className={`flex items-center space-x-2 transition-colors uppercase font-black text-[10px] tracking-widest ${textMuted} hover:text-current`}>
          <ChevronLeft size={16} /> <span>Exit Brand Genesis</span>
        </button>
        {logoReport && (
          <button onClick={() => setLogoReport(null)} className="text-[10px] font-black uppercase text-cyan-400 hover:text-white transition-colors tracking-widest">
            Create New System
          </button>
        )}
      </div>

      {!logoReport ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-12">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-7xl font-black uppercase italic tracking-tighter leading-none">Logo Creator <span className="text-cyan-500">∞</span></h1>
            <p className={`text-lg font-medium italic ${textMuted}`}>Powered by 16-Agent Industrial Engine & Open Code Quotas.</p>
          </div>

          <div className="w-full max-w-2xl space-y-8">
            <div className="space-y-2 text-left">
              <label className={`text-[10px] font-black uppercase tracking-widest px-6 ${textMuted}`}>Brand Name</label>
              <input value={logoBrand} onChange={e => setLogoBrand(e.target.value)} placeholder="e.g., PublishLab Publishing"
                className={`w-full border rounded-[2.5rem] p-6 text-xl font-bold outline-none focus:border-cyan-500 ${inputClass}`} />
            </div>
            <div className="space-y-2 text-left">
              <label className={`text-[10px] font-black uppercase tracking-widest px-6 ${textMuted}`}>Market Aesthetic</label>
              <select value={logoAesthetic} onChange={e => setLogoAesthetic(e.target.value)}
                className={`w-full border rounded-[2.5rem] p-6 text-xl font-bold outline-none focus:border-cyan-500 appearance-none ${inputClass}`}>
                <option>Modern Minimalist</option><option>Retro Vintage</option><option>Cyberpunk Industrial</option><option>Premium Luxury</option>
              </select>
            </div>

            <button onClick={runLogoGeneration} disabled={isGenerating || !logoBrand}
              className="w-full bg-cyan-500 hover:bg-cyan-400 py-6 rounded-[2.5rem] text-slate-950 font-black uppercase tracking-widest flex items-center justify-center gap-4 transition-all">
              {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
              <span>{isGenerating ? "Synthesizing Brand System..." : "Initialize Genesis"}</span>
            </button>
          </div>

          {isGenerating && (
            <div className="flex flex-col gap-2 max-w-xs w-full">
              {logoLogs.map((log, i) => <div key={i} className="text-[10px] font-mono text-cyan-500/60 uppercase tracking-tighter text-left">{log}</div>)}
            </div>
          )}

          {error && <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 animate-in zoom-in-95">
          <div className="space-y-12">
            <div className={`border p-12 rounded-[4rem] text-center space-y-8 aspect-square flex flex-col items-center justify-center ${cardClass}`}>
              <img src={logoReport.mainLogoUrl} className="max-w-[80%] max-h-[80%] object-contain" />
              <div className={`text-[10px] font-black uppercase tracking-[0.4em] ${textMuted}`}>Master Brand Identity</div>
            </div>
            <div className={`border p-12 rounded-[4rem] flex items-center justify-between ${cardClass}`}>
              <img src={logoReport.iconUrl} className="w-24 h-24 object-contain" />
              <div className="text-right">
                <div className={`text-3xl font-black italic uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Variant Icon</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-cyan-500">300DPI Rendered</div>
              </div>
            </div>
          </div>
          <div className="space-y-12">
            <div className={`border p-12 rounded-[4rem] space-y-8 ${isDarkMode ? 'bg-slate-950 border-slate-900' : 'bg-slate-50 border-slate-200'}`}>
              <h3 className={`text-2xl font-black uppercase italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Brand Guidelines</h3>
              <div className="space-y-4">
                {logoReport.guidelines.map((g: string, i: number) => (
                  <div key={i} className={`flex gap-4 p-4 border rounded-2xl text-xs font-bold ${cardClass} ${textMuted}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5" />{g}
                  </div>
                ))}
              </div>
            </div>
            <div className={`border p-12 rounded-[4rem] space-y-8 ${isDarkMode ? 'bg-slate-950 border-slate-900' : 'bg-slate-50 border-slate-200'}`}>
              <h3 className={`text-2xl font-black uppercase italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Genesis Palette</h3>
              <div className="flex gap-6">
                {logoReport.palette.map((c: string) => (
                  <div key={c} className="group relative">
                    <div className="w-20 h-20 rounded-2xl border border-white/5 shadow-xl transition-transform group-hover:scale-110" style={{ backgroundColor: c }} />
                    <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-black font-mono ${textMuted}`}>{c}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoCreatorTool;
