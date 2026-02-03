import React, { useState, useEffect } from 'react';
import { structureService } from '../structureService';
import { Sparkles, Wand2, Type, AlertCircle, CheckCircle2, Mic, History, BrainCircuit } from 'lucide-react';
import { gemini } from '../geminiService';

interface CoAuthorEditorProps {
    content: string;
    onChange: (newContent: string) => void;
    genreId: string;
    chapterTitle: string;
    chapterNumber: number;
}

export const CoAuthorEditor: React.FC<CoAuthorEditorProps> = ({ content, onChange, genreId, chapterTitle, chapterNumber }) => {
    const [activeTab, setActiveTab] = useState<'WRITE' | 'RULES'>('WRITE');
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [selection, setSelection] = useState('');
    const [ghostText, setGhostText] = useState<string | null>(null);
    const [typingTimeout, setTypingTimeout] = useState<any>(null);
    const [aiFeedback, setAiFeedback] = useState<string | null>(null);

    // Connect to the Industrial Structure Service
    const genreLogic = structureService.getGenreLogic(genreId);

    // GHOST TEXT ENGINE LOGIC
    useEffect(() => {
        if (!content) return;

        // Clear ghost text if user resumes typing
        setGhostText(null);
        if (typingTimeout) clearTimeout(typingTimeout);

        const timeout = setTimeout(async () => {
            // Only auto-trigger if cursor is at end (simplified for V1)
            // In V2 we use selectionStart/End checks
            if (content.length > 50) {
                const suggestion = await gemini.autocomplete(content, genreLogic.name);
                if (suggestion) setGhostText(suggestion);
            }
        }, 1200); // 1.2s pause triggers AI

        setTypingTimeout(timeout);
        return () => clearTimeout(timeout);
    }, [content]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Tab' && ghostText) {
            e.preventDefault();
            onChange(content + ghostText);
            setGhostText(null);
        }
    };

    const handleEnhanceSelection = async () => {
        if (!selection) return;
        setIsEnhancing(true);
        try {
            // Mock enhancement for now, connecting to Gemini later
            // In real impl, we call gemini.enhance(selection, genreLogic)
            // const prompt = `Genre: ${genreLogic.name}. Enhance this text: "${selection}"`;

            // For now, simulate
            setTimeout(() => {
                setAiFeedback("AI Suggestion: Increase sensory detail. Try describing the sound of the scene.");
                setIsEnhancing(false);
            }, 1500);
        } catch (e) {
            setIsEnhancing(false);
        }
    };

    return (
        <div className="flex gap-6 h-[800px] animate-in fade-in zoom-in-95 duration-500">
            {/* LEFT: WRITING CANVAS */}
            <div className="flex-1 flex flex-col bg-slate-950 border border-indigo-500/30 rounded-3xl overflow-hidden shadow-2xl relative">
                {/* Editor Toolbar */}
                <div className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest flex items-center gap-2">
                            <BrainCircuit size={14} /> Co-Author Mode Active
                        </span>
                        <div className="text-[10px] font-bold text-slate-500 uppercase">
                            {content.split(/\s+/).length} Words
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button title="Dictation (Coming Soon)" className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 transition-colors"><Mic size={14} /></button>
                        <button title="Version History" className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 transition-colors"><History size={14} /></button>
                    </div>
                </div>

                <textarea
                    value={content}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onSelect={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        setSelection(target.value.substring(target.selectionStart, target.selectionEnd));
                    }}
                    className="flex-1 bg-transparent p-8 text-lg leading-relaxed font-serif text-slate-300 outline-none resize-none custom-scrollbar selection:bg-indigo-500/30 placeholder:text-slate-700"
                    placeholder="Start writing... The AI is listening to your style..."
                />

                {/* GHOST TEXT OVERLAY (Phase 2.5) */}
                {ghostText && (
                    <div className="absolute top-14 left-0 p-8 pointer-events-none text-lg leading-relaxed font-serif text-transparent whitespace-pre-wrap font-thin w-full h-full">
                        <span className="opacity-0">{content}</span>
                        <span className="text-slate-500/50 animate-pulse">{ghostText}</span>
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-1 rounded ml-2 align-middle font-sans">TAB</span>
                    </div>
                )}

                {/* Context AI Popup */}
                {selection && (
                    <div className="absolute bottom-8 right-8 animate-in slide-in-from-bottom-4 z-20">
                        <button
                            onClick={handleEnhanceSelection}
                            disabled={isEnhancing}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
                        >
                            {isEnhancing ? <Sparkles className="animate-spin" size={14} /> : <Wand2 size={14} />}
                            {isEnhancing ? 'Enhancing...' : 'Enhance Selection'}
                        </button>
                    </div>
                )}
            </div>

            {/* RIGHT: INTELLIGENCE HUD */}
            <div className="w-80 bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
                <div>
                    <h4 className="text-[10px] font-black uppercase text-slate-500 mb-4 tracking-widest">Genre Intelligence</h4>
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                        <div className="flex items-center gap-2 mb-2 text-indigo-400">
                            <Type size={14} />
                            <span className="text-xs font-black uppercase">{genreLogic.name}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 italic mb-4">{genreLogic.emotionalCore}</p>
                        <div className="space-y-2">
                            {genreLogic.structureRules.slice(0, 3).map((rule, i) => (
                                <div key={i} className="text-[9px] text-slate-400 flex items-start gap-2 border-t border-slate-900 pt-2">
                                    <CheckCircle2 size={10} className="mt-0.5 text-emerald-500 shrink-0" />
                                    <span>{rule}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="text-[10px] font-black uppercase text-slate-500 mb-4 tracking-widest">Sensory Anchors</h4>
                    <div className="flex flex-wrap gap-2">
                        {genreLogic.sensoryAnchors.map((anchor, i) => (
                            <span key={i} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[9px] font-bold rounded-lg uppercase">
                                {anchor}
                            </span>
                        ))}
                    </div>
                </div>

                {aiFeedback && (
                    <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl animate-in fade-in">
                        <div className="flex items-center gap-2 mb-2 text-amber-500">
                            <Sparkles size={14} />
                            <span className="text-[10px] font-black uppercase">Suggestion</span>
                        </div>
                        <p className="text-xs text-amber-200">{aiFeedback}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
