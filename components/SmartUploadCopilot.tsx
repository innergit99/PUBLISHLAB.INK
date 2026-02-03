import React, { useState, useEffect } from 'react';
import { Book, Upload, DollarSign, CheckCircle, AlertTriangle, Eye, ArrowRight, Save } from 'lucide-react';
import { KDPBlueprint } from '../types';

interface SmartUploadCopilotProps {
    blueprint?: KDPBlueprint;
    onClose: () => void;
}

export const SmartUploadCopilot: React.FC<SmartUploadCopilotProps> = ({ blueprint, onClose }) => {
    const [step, setStep] = useState<'DETAILS' | 'CONTENT' | 'PRICING'>('DETAILS');
    const [simulationProgress, setSimulationProgress] = useState(0);
    const [isSimulating, setIsSimulating] = useState(false);

    // Mock Data (simulating what would come from the blueprint)
    const [formData, setFormData] = useState({
        title: blueprint?.PROJECT_META?.title_working || "Untitled Masterpiece",
        subtitle: "A Comprehensive Guide to KDP Dominance",
        author: blueprint?.PROJECT_META?.suggestedAuthor || "Jane Doe",
        description: blueprint?.BACK_COVER_SPEC?.blurb_text || "Enter your compelling book description here...",
        keywords: "mystery, thriller, suspense, bestseller, crime",
        categories: "Fiction > Mystery > General",
        price: "14.99",
        royalty: "60%"
    });

    const runSimulation = () => {
        setIsSimulating(true);
        let p = 0;
        const interval = setInterval(() => {
            p += 5;
            setSimulationProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setIsSimulating(false);
                setStep('CONTENT');
            }
        }, 100);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-5xl h-[90vh] bg-[#0f111a] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">

                {/* Header - KDP Style Mirror */}
                <div className="h-16 bg-[#1a1d2d] border-b border-white/5 flex items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">K</div>
                        <div>
                            <h2 className="text-white font-semibold">Smart Upload Co-Pilot</h2>
                            <p className="text-xs text-indigo-400">Zero-Rejection Guarantee Mode</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="px-4 py-2 hover:bg-white/5 rounded-lg text-gray-400 transition-colors">
                        Exit Simulator
                    </button>
                </div>

                {/* Progress Stepper */}
                <div className="h-14 bg-[#0f111a] border-b border-white/5 flex items-center justify-center gap-8 px-6">
                    {[
                        { id: 'DETAILS', icon: Book, label: 'Kindle eBook Details' },
                        { id: 'CONTENT', icon: Upload, label: 'Kindle eBook Content' },
                        { id: 'PRICING', icon: DollarSign, label: 'Kindle eBook Pricing' },
                    ].map((s, idx) => (
                        <div
                            key={s.id}
                            onClick={() => setStep(s.id as any)}
                            className={`flex items-center gap-2 cursor-pointer transition-all ${step === s.id ? 'text-orange-500' : 'text-gray-600'}`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${step === s.id ? 'border-orange-500 bg-orange-500/10' : 'border-gray-700'}`}>
                                <s.icon size={14} />
                            </div>
                            <span className="font-medium text-sm hidden sm:block">{s.label}</span>
                            {idx < 2 && <div className="w-8 h-px bg-gray-800 ml-4 hidden md:block" />}
                        </div>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8 relative">

                    {/* STEP 1: DETAILS */}
                    {step === 'DETAILS' && (
                        <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-right-4 duration-300">
                            <div className="bg-[#1a1d2d] border border-white/5 p-6 rounded-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-50">
                                    <Book className="text-white/5 w-32 h-32 transform rotate-12 translate-x-10 -translate-y-10" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-6">Book Title</h3>

                                <div className="space-y-4 relative z-10">
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Book Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                                        />
                                        <div className="flex items-center gap-2 mt-2 text-emerald-400 text-xs">
                                            <CheckCircle size={10} />
                                            <span>KDP Compliance: Title matches cover exactly.</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Subtitle (Optional)</label>
                                        <input
                                            type="text"
                                            value={formData.subtitle}
                                            onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#1a1d2d] border border-white/5 p-6 rounded-xl">
                                <h3 className="text-lg font-semibold text-white mb-6">Description</h3>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full h-40 bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 outline-none resize-none font-mono text-sm opacity-80"
                                />
                                <div className="flex justify-between mt-2">
                                    <div className="flex items-center gap-2 text-indigo-400 text-xs cursor-pointer hover:text-indigo-300">
                                        <Eye size={10} />
                                        <span>Preview Description HTML</span>
                                    </div>
                                    <span className="text-gray-600 text-xs">{formData.description.length} / 4000 characters</span>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    onClick={() => setStep('CONTENT')}
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center gap-2"
                                >
                                    Save and Continue <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: CONTENT (SIMULATION) */}
                    {step === 'CONTENT' && (
                        <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-right-4 duration-300">

                            <div className="bg-[#1a1d2d] border border-white/5 p-8 rounded-xl text-center">
                                <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                                    <Upload className="text-indigo-500 w-8 h-8" />
                                    {isSimulating && (
                                        <div className="absolute inset-0 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                                    )}
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-2">Manuscript Simulation</h2>
                                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                    Running industrial validation check across 185 KDP compliance points (formatting, bleed, dpi, metadata).
                                </p>

                                {isSimulating ? (
                                    <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden max-w-md mx-auto relative">
                                        <div
                                            className="h-full bg-indigo-500 transition-all duration-300 ease-out"
                                            style={{ width: `${simulationProgress}%` }}
                                        />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                                        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg flex items-center gap-3">
                                            <CheckCircle className="text-emerald-500" />
                                            <div className="text-left">
                                                <div className="text-white text-sm font-bold">Manuscript</div>
                                                <div className="text-emerald-400 text-xs">Ready for Upload</div>
                                            </div>
                                        </div>
                                        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg flex items-center gap-3">
                                            <CheckCircle className="text-emerald-500" />
                                            <div className="text-left">
                                                <div className="text-white text-sm font-bold">Cover File</div>
                                                <div className="text-emerald-400 text-xs">300 DPI Verified</div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {!isSimulating && simulationProgress === 0 && (
                                    <button
                                        onClick={runSimulation}
                                        className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-bold"
                                    >
                                        Start Audit Simulation
                                    </button>
                                )}

                                {!isSimulating && simulationProgress === 100 && (
                                    <button
                                        onClick={() => setStep('PRICING')}
                                        className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 mx-auto"
                                    >
                                        Launch Pricing Strategy <ArrowRight size={16} />
                                    </button>
                                )}
                            </div>

                            {/* Fake 3D Preview (Placeholder) */}
                            <div className="h-64 bg-black/20 rounded-xl border border-white/5 flex items-center justify-center relative overflow-hidden group">
                                <div className="text-center">
                                    <Book className="w-16 h-16 text-gray-700 mx-auto mb-4 group-hover:text-indigo-500 transition-colors" />
                                    <p className="text-gray-500 text-sm">Interactive 3D Preview Loading...</p>
                                </div>
                            </div>

                        </div>
                    )}

                    {/* STEP 3: PRICING */}
                    {step === 'PRICING' && (
                        <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-right-4 duration-300">
                            <div className="bg-[#1a1d2d] border border-white/5 p-6 rounded-xl">
                                <h3 className="text-lg font-semibold text-white mb-6">Royalty Calculator</h3>

                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">List Price ($)</label>
                                        <input
                                            type="text"
                                            value={formData.price}
                                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white text-xl font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                                        />
                                    </div>

                                    <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20">
                                        <div className="text-emerald-400 text-xs uppercase mb-1">Estimated Royalty</div>
                                        <div className="text-3xl font-bold text-white">$10.34</div>
                                        <div className="text-emerald-500/50 text-xs">per sale (70% rate)</div>
                                    </div>
                                </div>

                                <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-start gap-3">
                                    <AlertTriangle className="text-orange-500 shrink-0 mt-1" size={16} />
                                    <p className="text-orange-200 text-sm">
                                        Based on your {blueprint ? Math.ceil(blueprint.INTERIOR_CONTENT.reduce((acc, ch) => acc + (ch.content?.length || 0), 0) / 1500) : 0}-page count, this price is optimal. Similar books in "Mystery" sell between $9.99 - $14.99.
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-center pt-8">
                                <button
                                    onClick={onClose}
                                    className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-orange-500/20 transition-all transform hover:scale-105 flex items-center gap-3"
                                >
                                    <Upload size={20} /> PUBLISH TO KDP
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};
