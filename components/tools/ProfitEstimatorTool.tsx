import React, { useState } from 'react';
import { Activity, BookOpen, ChevronLeft, Loader2, ShieldCheck, Zap } from 'lucide-react';
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

  return (
    <div className={`p-12 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[70vh] space-y-12 animate-in fade-in ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      <div className="text-center space-y-4">
        <h1 className="text-7xl font-black uppercase italic tracking-tighter leading-none">Profit Estimator <span className="text-emerald-500">∞</span></h1>
        <p className={`font-bold uppercase tracking-widest text-xs italic ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Industrial Revenue Modeling for Amazon KDP.</p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className={`border p-12 rounded-[4rem] space-y-8 shadow-2xl ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="space-y-4">
            <label className={`text-[10px] font-black uppercase tracking-widest px-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Estimated Page Count</label>
            <div className="relative">
              <input 
                type="number" 
                value={stats.pages} 
                onChange={e => setStats({ ...stats, pages: parseInt(e.target.value) })} 
                className={`w-full border rounded-2xl p-6 text-2xl font-black outline-none focus:border-emerald-500 transition-all ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`} 
              />
              <BookOpen className={`absolute right-6 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-slate-700' : 'text-slate-400'}`} />
            </div>
          </div>

          <div className="space-y-4">
            <label className={`text-[10px] font-black uppercase tracking-widest px-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Retail List Price ($)</label>
            <div className="relative text-3xl font-black text-emerald-500">
              <span className="absolute left-6 top-1/2 -translate-y-1/2">$</span>
              <input 
                type="number" 
                step="0.01" 
                value={stats.price} 
                onChange={e => setStats({ ...stats, price: parseFloat(e.target.value) })} 
                className={`w-full border rounded-2xl p-6 pl-12 text-2xl font-black outline-none focus:border-emerald-500 transition-all text-emerald-500 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-300'}`} 
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className={`text-[10px] font-black uppercase tracking-widest px-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Interior Manufacturing</label>
            <div className={`flex p-2 rounded-2xl border ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
              {['B&W', 'Color'].map(c => (
                <button
                  key={c}
                  onClick={() => setStats({ ...stats, interior: c as any })}
                  className={`flex-1 py-4 rounded-xl font-black text-xs transition-all ${stats.interior === c ? 'bg-emerald-600 text-white shadow-lg' : isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}
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
            <span>{isAnalyzing ? "Calculating..." : "Model Royalties"}</span>
          </button>
        </div>

        <div className="h-full flex flex-col gap-8">
          {result ? (
            <div className="space-y-8 animate-in slide-in-from-right-12">
              <div className={`p-12 border rounded-[4rem] text-center relative overflow-hidden group ${isDarkMode ? 'bg-slate-950 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
                <div className={`absolute top-0 right-0 p-8 opacity-5 ${isDarkMode ? '' : 'opacity-10'}`}><Zap size={100} /></div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Net Royalty (Per Copy)</span>
                <div className="text-8xl font-black text-emerald-500 italic tracking-tighter mt-4">${result.netProfit}</div>
                <div className={`text-[10px] font-black uppercase tracking-widest mt-4 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>After Amazon's 40% Share</div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className={`p-8 border rounded-[3rem] text-center ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Printing Cost</span>
                  <div className={`text-3xl font-black mt-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>${result.printingCost}</div>
                </div>
                <div className={`p-8 border rounded-[3rem] text-center ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Growth Potential</span>
                  <div className={`text-3xl font-black mt-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{result.roi}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className={`flex-1 border-4 border-dashed rounded-[4rem] flex flex-col items-center justify-center p-12 text-center ${isDarkMode ? 'bg-slate-950 border-slate-900 text-slate-800' : 'bg-slate-50 border-slate-200 text-slate-300'}`}>
              <Activity size={80} className="mb-6 opacity-20" />
              <p className="text-xl font-black uppercase italic tracking-tighter opacity-20">Awaiting Manufacturing Specs</p>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-20 mt-2">Configure the left panel to initialize revenue projection.</p>
            </div>
          )}

          <div className="p-8 bg-indigo-500/5 border border-indigo-500/10 rounded-[3rem] flex items-center gap-6">
            <ShieldCheck className="text-indigo-400 shrink-0" size={28} />
            <p className="text-xs text-slate-500 font-bold italic leading-relaxed">
              Industrial Tip: Amazon royalties are paid 60 days post-sale. Always account for ad spend in your final net calculations.
            </p>
          </div>
        </div>
      </div>

      <button 
        onClick={onBack} 
        className={`text-[10px] font-black uppercase transition-colors tracking-[0.3em] mt-12 flex items-center gap-2 ${isDarkMode ? 'text-slate-600 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
      >
        <ChevronLeft size={16} />
        Return to HQ
      </button>
    </div>
  );
};

export default ProfitEstimatorTool;
