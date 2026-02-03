import React from 'react';
import { Users, AlertTriangle, Megaphone, Gift, BookOpen, Sparkles, Download, Loader2 } from 'lucide-react';
import { KDPBlueprint } from '../types';

interface SkillsTabProps {
    blueprint: KDPBlueprint;
    isGenerating: boolean;
    onGenerateCharacterProfiles: () => void;
    onCheckContinuity: () => void;
    onGenerateMarketing: () => void;
    onGenerateReaderMagnet: (type: 'bonus-chapter' | 'character-interview' | 'behind-scenes' | 'prequel-scene') => void;
}

export const SkillsTab: React.FC<SkillsTabProps> = ({
    blueprint,
    isGenerating,
    onGenerateCharacterProfiles,
    onCheckContinuity,
    onGenerateMarketing,
    onGenerateReaderMagnet
}) => {
    const skillsData = blueprint.SKILLS_DATA || {};

    return (
        <div className="space-y-12 animate-in slide-in-from-right-8">
            {/* Header */}
            <div className="bg-slate-900 border border-slate-800 p-12 rounded-[4rem] shadow-2xl">
                <div className="flex items-center gap-6 mb-6">
                    <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center">
                        <Sparkles size={32} className="text-indigo-400" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-black uppercase italic tracking-tighter">Advanced Skills</h2>
                        <p className="text-slate-500 font-medium italic text-lg mt-2">AI-powered tools for professional authors</p>
                    </div>
                </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* SKILL 1: Character Profiles */}
                <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 hover:border-indigo-500/40 transition-all">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                            <Users size={24} className="text-purple-400" />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic">Character Profiles</h3>
                    </div>
                    <p className="text-slate-400 mb-6">Generate detailed character sheets with personality, background, and development arcs.</p>

                    <button
                        onClick={onGenerateCharacterProfiles}
                        disabled={isGenerating}
                        className="w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                        {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Users size={20} />}
                        Generate Profiles
                    </button>

                    {skillsData.characterProfiles && skillsData.characterProfiles.length > 0 && (
                        <div className="mt-6 space-y-3">
                            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400">✓ {skillsData.characterProfiles.length} Profiles Created</div>
                            {skillsData.characterProfiles.slice(0, 3).map((profile: any, i: number) => (
                                <div key={i} className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                                    <div className="font-bold text-white">{profile.name}</div>
                                    <div className="text-[10px] uppercase text-slate-500">{profile.role}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* SKILL 2: Continuity Check */}
                <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 hover:border-amber-500/40 transition-all">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                            <AlertTriangle size={24} className="text-amber-400" />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic">Continuity Check</h3>
                    </div>
                    <p className="text-slate-400 mb-6">Identify plot holes, timeline issues, and character inconsistencies.</p>

                    <button
                        onClick={onCheckContinuity}
                        disabled={isGenerating}
                        className="w-full bg-amber-600 hover:bg-amber-500 text-white px-6 py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                        {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <AlertTriangle size={20} />}
                        Check Continuity
                    </button>

                    {skillsData.continuityIssues && skillsData.continuityIssues.length > 0 && (
                        <div className="mt-6 space-y-3">
                            <div className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                                {skillsData.continuityIssues.length} Issues Found
                            </div>
                            {skillsData.continuityIssues.slice(0, 3).map((issue: any, i: number) => (
                                <div key={i} className={`p-4 bg-slate-950 rounded-xl border ${issue.severity === 'critical' ? 'border-red-500/30' :
                                        issue.severity === 'moderate' ? 'border-amber-500/30' :
                                            'border-slate-800'
                                    }`}>
                                    <div className="text-[10px] uppercase font-bold text-amber-400">Chapter {issue.chapter} • {issue.type}</div>
                                    <div className="text-sm text-slate-300 mt-1">{issue.description}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* SKILL 3: Marketing Copy */}
                <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 hover:border-emerald-500/40 transition-all">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                            <Megaphone size={24} className="text-emerald-400" />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic">Marketing Suite</h3>
                    </div>
                    <p className="text-slate-400 mb-6">Generate Amazon descriptions, social posts, and email announcements.</p>

                    <button
                        onClick={onGenerateMarketing}
                        disabled={isGenerating}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                        {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Megaphone size={20} />}
                        Generate Marketing
                    </button>

                    {skillsData.marketingCopy && (
                        <div className="mt-6 space-y-3">
                            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400">✓ Marketing Pack Ready</div>
                            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                                <div className="text-[10px] uppercase text-slate-500 mb-2">Amazon Description</div>
                                <div className="text-sm text-slate-300 line-clamp-3">{skillsData.marketingCopy.amazonDescription?.replace(/<[^>]*>/g, '')}</div>
                            </div>
                            <button className="w-full bg-slate-950 hover:bg-slate-800 text-white px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                                <Download size={16} />
                                Download Marketing Pack
                            </button>
                        </div>
                    )}
                </div>

                {/* SKILL 4: Reader Magnets */}
                <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 hover:border-pink-500/40 transition-all">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center">
                            <Gift size={24} className="text-pink-400" />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic">Reader Magnets</h3>
                    </div>
                    <p className="text-slate-400 mb-6">Create bonus content to attract and engage readers.</p>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => onGenerateReaderMagnet('bonus-chapter')}
                            disabled={isGenerating}
                            className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
                        >
                            Bonus Chapter
                        </button>
                        <button
                            onClick={() => onGenerateReaderMagnet('character-interview')}
                            disabled={isGenerating}
                            className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
                        >
                            Interview
                        </button>
                        <button
                            onClick={() => onGenerateReaderMagnet('behind-scenes')}
                            disabled={isGenerating}
                            className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
                        >
                            Behind Scenes
                        </button>
                        <button
                            onClick={() => onGenerateReaderMagnet('prequel-scene')}
                            disabled={isGenerating}
                            className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
                        >
                            Prequel Scene
                        </button>
                    </div>

                    {skillsData.readerMagnets && skillsData.readerMagnets.length > 0 && (
                        <div className="mt-6 space-y-3">
                            <div className="text-[10px] font-black uppercase tracking-widest text-pink-400">
                                ✓ {skillsData.readerMagnets.length} Magnets Created
                            </div>
                            {skillsData.readerMagnets.map((magnet: any, i: number) => (
                                <div key={i} className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                                    <div className="text-[10px] uppercase font-bold text-pink-400">{magnet.type.replace('-', ' ')}</div>
                                    <div className="text-sm text-slate-300 mt-1 line-clamp-2">{magnet.content.substring(0, 100)}...</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
