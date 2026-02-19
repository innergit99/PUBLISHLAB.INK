import React, { useState } from 'react';
import { Activity, BookOpen, ChevronLeft, Loader2, ShieldCheck, Zap, TrendingUp, AlertTriangle } from 'lucide-react';
import { ToolType } from '../../types';
import { ToolComponentProps } from './types';
import { complianceService } from '../../complianceService';

export const ProfitEstimatorTool: React.FC<ToolComponentProps> = ({
  toolType,
  onBack,
  isDarkMode
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stats, setStats] = useState({ pages: 120, price: 9.99, interior: 'B&W' as 'B&W' | 'Color' });
  const [result, setResult] = useState<any>(null);

  const runEst = async () => {
    setIsAnalyzing(true);
    const res = await complianceService.estimateProfit(stats.pages, stats.price, stats.interior);
    setResult(res);
    setIsAnalyzing(false);
  };

  const bg = isDarkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900';
  const card = isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200';
  const input = isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900';
  const muted = isDarkMode ? 'text-slate-500' : 'text-slate-400';

  return (
    <div className={`p-12 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[70vh] space-y-12 animate-in fade-in ${bg}`}>
      <div className="text-center space-y-4">
        <h1 className="text-7xl font-black uppercase italic tracking-tighter leading-none">Profit Estimator <span className="text-emerald-500">∞</span></h1>
        <p className={`font-bold uppercase tracking-widest text-xs italic ${muted}`}>Industrial Revenue Modeling for Amazon KDP.</p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Input Panel */}
        <div className={`border p-12 rounded-[4rem] space-y-8 shadow-2xl ${card}`}>
          <div className="space-y-4">
            <label className={`text-[10px] font-black uppercase tracking-widest px-4 ${muted}`}>Estimated Page Count</label>
            <div className="relative">
              <input
                type="number"
                value={stats.pages}
                onChange={e => setStats({ ...stats, pages: parseInt(e.target.value) || 0 })}
                className={`w-full border rounded-2xl p-6 text-2xl font-black outline-none focus:border-emerald-500 transition-all ${input}`}
              />
              <BookOpen className={`absolute right-6 top-1/2 -translate-y-1/2 ${muted}`} />
            </div>
          </div>

          <div className="space-y-4">
            <label className={`text-[10px] font-black uppercase tracking-widest px-4 ${muted}`}>Retail List Price ($)</label>
            <div className="relative text-3xl font-black text-emerald-500">
              <span className="absolute left-6 top-1/2 -translate-y-1/2">$</span>
              <input
                type="number"
                step="0.01"
                value={stats.price}
                onChange={e => setStats({ ...stats, price: parseFloat(e.target.value) || 0 })}
                className={`w-full border rounded-2xl p-6 pl-12 text-2xl font-black outline-none focus:border-emerald-500 transition-all text-emerald-500 ${input}`}
              />
            </div>
            <p className={`text-[10px] font-bold px-4 ${muted}`}>$2.99–$9.99 = 70% royalty · Below $2.99 = 35% royalty</p>
          </div>

          <div className="space-y-4">
            <label className={`text-[10px] font-black uppercase tracking-widest px-4 ${muted}`}>Interior Manufacturing</label>
            <div className={`flex p-2 rounded-2xl border ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
              {(['B&W', 'Color'] as const).map(c => (
                <button
                  key={c}
                  onClick={() => setStats({ ...stats, interior: c })}
                  className={`flex-1 py-4 rounded-xl font-black text-xs transition-all ${stats.interior === c ? 'bg-emerald-600 text-white shadow-lg' : `${muted} hover:text-current`}`}
                >
                  {c} {c === 'B&W' ? '(Economy)' : '(Premium)'}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={runEst}
            className="w-full bg-emerald-600 hover:bg-emerald-500 py-8 rounded-[3rem] text-white font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 transition-all shadow-[0_0_50px_rgba(16,185,129,0.2)] border-b-[12px] border-emerald-900 active:translate-y-1"
          >
            {isAnalyzing ? <Loader2 className="animate-spin" /> : <Activity size={24} />}
            <span>{isAnalyzing ? 'Calculating...' : 'Model Royalties'}</span>
          </button>
        </div>

        {/* Results Panel */}
        <div className="h-full flex flex-col gap-8">
          {result ? (
            <div className="space-y-6 animate-in slide-in-from-right-12">

              {/* Net Royalty Hero */}
              <div className={`p-10 border rounded-[4rem] text-center relative overflow-hidden ${result.isViable ? (isDarkMode ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200') : 'bg-rose-500/5 border-rose-500/20'}`}>
                <span className={`text-[10px] font-black uppercase tracking-widest ${muted}`}>Net Royalty (Per Sale)</span>
                <div className={`text-7xl font-black italic tracking-tighter mt-2 ${result.isViable ? 'text-emerald-500' : 'text-rose-500'}`}>
                  ${result.netProfit}
                </div>
                <div className={`text-[10px] font-black uppercase tracking-widest mt-2 ${muted}`}>{result.royaltyRate} Royalty Rate · {result.printingCost} Printing</div>
                {result.warning && (
                  <div className="mt-4 flex items-center gap-2 justify-center text-rose-400 text-xs font-bold">
                    <AlertTriangle size={14} /> {result.warning}
                  </div>
                )}
              </div>

              {/* BSR Projections */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'BSR 10K', val: result.projections?.bsr_10k, desc: '~30 sales/mo' },
                  { label: 'BSR 50K', val: result.projections?.bsr_50k, desc: '~5 sales/mo' },
                  { label: 'BSR 100K', val: result.projections?.bsr_100k, desc: '~1 sale/mo' },
                ].map(p => (
                  <div key={p.label} className={`p-6 border rounded-[2rem] text-center ${card}`}>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${muted}`}>{p.label}</span>
                    <div className="text-xl font-black text-emerald-500 mt-1">${p.val}</div>
                    <div className={`text-[9px] font-bold mt-1 ${muted}`}>{p.desc}</div>
                  </div>
                ))}
              </div>

              {/* ROI Card */}
              <div className={`p-8 border rounded-[2.5rem] flex items-center gap-6 ${card}`}>
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <TrendingUp className="text-emerald-500" size={28} />
                </div>
                <div>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${muted}`}>Return on Print Cost</span>
                  <div className="text-3xl font-black text-emerald-500">{result.roi}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className={`flex-1 border-4 border-dashed rounded-[4rem] flex flex-col items-center justify-center p-12 text-center ${isDarkMode ? 'bg-slate-950 border-slate-900 text-slate-800' : 'bg-slate-50 border-slate-200 text-slate-300'}`}>
              <Activity size={80} className="mb-6 opacity-20" />
              <p className="text-xl font-black uppercase italic tracking-tighter opacity-20">Awaiting Manufacturing Specs</p>
              <p className={`text-[10px] font-bold uppercase tracking-widest opacity-20 mt-2`}>Configure the left panel to initialize revenue projection.</p>
            </div>
          )}

          <div className="p-8 bg-indigo-500/5 border border-indigo-500/10 rounded-[3rem] flex items-center gap-6">
            <ShieldCheck className="text-indigo-400 shrink-0" size={28} />
            <p className="text-xs text-slate-500 font-bold italic leading-relaxed">
              Industrial Tip: KDP pays royalties 60 days post-sale. Always account for ad spend in final net calculations. Projections are estimates based on historical BSR data.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onBack}
        className={`text-[10px] font-black uppercase transition-colors tracking-[0.3em] mt-12 flex items-center gap-2 ${muted} hover:text-current`}
      >
        <ChevronLeft size={16} />
        Return to HQ
      </button>
    </div>
  );
};

export default ProfitEstimatorTool;
