import React, { useState, useEffect } from 'react';
import {
    Users, Plus, Trash2, Edit3, Save, X, User,
    Zap, Sparkles, Shield, Camera, Dna, Mail
} from 'lucide-react';
import { CharacterProfile } from '../types';
import { storage } from '../storageService';

export const CharacterVault: React.FC = () => {
    const [characters, setCharacters] = useState<CharacterProfile[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newChar, setNewChar] = useState<Partial<CharacterProfile>>({
        name: '',
        role: 'PROTAGONIST',
        physicalDNA: {},
        personality: {
            traits: [],
            motivation: '',
            flaw: ''
        },
        visualMasterPrompt: ''
    });

    useEffect(() => {
        loadCharacters();
    }, []);

    const loadCharacters = async () => {
        const data = await storage.getAllCharacters();
        setCharacters(data);
    };

    const handleSave = async () => {
        const id = editingId || `char_${Date.now()}`;
        const profile: CharacterProfile = {
            ...newChar as CharacterProfile,
            id,
            visualMasterPrompt: generateMasterPrompt(newChar)
        };

        await storage.saveCharacter(profile);
        setIsAdding(false);
        setEditingId(null);
        setNewChar({
            name: '',
            role: 'PROTAGONIST',
            physicalDNA: {},
            personality: { traits: [], motivation: '', flaw: '' }
        });
        loadCharacters();
    };

    const generateMasterPrompt = (char: Partial<CharacterProfile>) => {
        const dna = char.physicalDNA || {};
        const traits = [
            char.name,
            char.role?.toLowerCase(),
            dna.age,
            dna.build,
            dna.hair ? `${dna.hair} hair` : '',
            dna.eyes ? `${dna.eyes} eyes` : '',
            dna.clothingStyle,
            ...(dna.distinguishingMarks || [])
        ].filter(Boolean).join(', ');

        return `High-fidelity consistent character: ${traits}. cinematic lighting, detailed facial features, consistent character design.`;
    };

    const handleDelete = async (id: string) => {
        if (confirm('Permanently delete this character DNA?')) {
            await storage.deleteCharacter(id);
            loadCharacters();
        }
    };

    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4">
            <header className="flex justify-between items-end mb-12">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Dna className="text-indigo-500" size={24} />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">Phase 5 Production</span>
                    </div>
                    <h1 className="text-6xl font-black italic uppercase tracking-tighter text-white">Character Vault</h1>
                    <p className="text-gray-500 mt-2 font-medium">Manage visual DNA for architectural consistency cross-asset.</p>
                </div>
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                    >
                        <Plus size={16} /> Forge New Persona
                    </button>
                )}
            </header>

            {isAdding && (
                <div className="mb-12 p-10 rounded-[2.5rem] bg-slate-900 border border-slate-800 shadow-2xl animate-in zoom-in-95 duration-300">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                            <Sparkles className="text-indigo-400" /> Defining Character DNA
                        </h2>
                        <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X /></button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 text-left">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Full Identity</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Elena 'Rogue' Vance"
                                    className="w-full bg-black border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none transition-colors"
                                    value={newChar.name}
                                    onChange={e => setNewChar({ ...newChar, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Production Role</label>
                                <select
                                    className="w-full bg-black border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none"
                                    value={newChar.role}
                                    onChange={e => setNewChar({ ...newChar, role: e.target.value as any })}
                                >
                                    <option value="PROTAGONIST">Primary Protag</option>
                                    <option value="ANTAGONIST">Primary Antag</option>
                                    <option value="SUPPORTING">Supporting Cast</option>
                                    <option value="MENTOR">Mentor Figure</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Visual DNA (Physical Traits)</label>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text" placeholder="Age range (e.g. 20s)"
                                    className="bg-black border border-slate-800 rounded-xl px-4 py-3 text-xs"
                                    value={newChar.physicalDNA?.age}
                                    onChange={e => setNewChar({ ...newChar, physicalDNA: { ...newChar.physicalDNA, age: e.target.value } })}
                                />
                                <input
                                    type="text" placeholder="Hair (e.g. Neon Blue Bob)"
                                    className="bg-black border border-slate-800 rounded-xl px-4 py-3 text-xs"
                                    value={newChar.physicalDNA?.hair}
                                    onChange={e => setNewChar({ ...newChar, physicalDNA: { ...newChar.physicalDNA, hair: e.target.value } })}
                                />
                                <input
                                    type="text" placeholder="Eyes (e.g. Emerald)"
                                    className="bg-black border border-slate-800 rounded-xl px-4 py-3 text-xs"
                                    value={newChar.physicalDNA?.eyes}
                                    onChange={e => setNewChar({ ...newChar, physicalDNA: { ...newChar.physicalDNA, eyes: e.target.value } })}
                                />
                                <input
                                    type="text" placeholder="Build (e.g. Wiry)"
                                    className="bg-black border border-slate-800 rounded-xl px-4 py-3 text-xs"
                                    value={newChar.physicalDNA?.build}
                                    onChange={e => setNewChar({ ...newChar, physicalDNA: { ...newChar.physicalDNA, build: e.target.value } })}
                                />
                            </div>
                            <input
                                type="text" placeholder="Clothing Style (e.g. Cyberpunk Techwear)"
                                className="w-full bg-black border border-slate-800 rounded-xl px-4 py-3 text-xs"
                                value={newChar.physicalDNA?.clothingStyle}
                                onChange={e => setNewChar({ ...newChar, physicalDNA: { ...newChar.physicalDNA, clothingStyle: e.target.value } })}
                            />
                        </div>
                    </div>

                    <div className="mt-12 flex justify-end">
                        <button
                            onClick={handleSave}
                            className="bg-indigo-600 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-500 transition-colors"
                        >
                            Commit DNA to Vault
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {characters.map(char => (
                    <div key={char.id} className="group relative p-8 rounded-[2rem] bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all text-left">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                                <User size={24} />
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-slate-500 hover:text-white transition-colors"><Edit3 size={16} /></button>
                                <button
                                    onClick={() => handleDelete(char.id)}
                                    className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-1 tracking-tight">{char.name}</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-6">{char.role}</p>

                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-slate-500 font-bold uppercase">Consistency Strength</span>
                                    <span className="text-emerald-400 font-bold">UNIFORM</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-full"></div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {char.physicalDNA?.hair && <span className="px-2 py-1 rounded-md bg-white/5 text-[9px] font-bold text-slate-400 border border-white/5">{char.physicalDNA.hair}</span>}
                                {char.physicalDNA?.eyes && <span className="px-2 py-1 rounded-md bg-white/5 text-[9px] font-bold text-slate-400 border border-white/5">{char.physicalDNA.eyes}</span>}
                                {char.physicalDNA?.age && <span className="px-2 py-1 rounded-md bg-white/5 text-[9px] font-bold text-slate-400 border border-white/5">{char.physicalDNA.age}</span>}
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                                Load Visual Blueprint
                            </button>
                        </div>
                    </div>
                ))}

                {characters.length === 0 && !isAdding && (
                    <div className="lg:col-span-3 py-32 text-center space-y-4 opacity-50">
                        <Users className="mx-auto text-slate-700" size={48} />
                        <p className="text-sm font-bold text-slate-600 uppercase tracking-widest">No character DNA records found in this vault.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
