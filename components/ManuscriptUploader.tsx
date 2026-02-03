import React, { useState, useCallback } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, Loader2, Sparkles, Download, Eye } from 'lucide-react';
import { manuscriptDoctorService, ManuscriptUpload, RewriteMode, ContextProfile } from '../manuscriptDoctorService';

interface ManuscriptUploaderProps {
    onComplete: (upload: ManuscriptUpload) => void;
    isDarkMode: boolean;
}

export const ManuscriptUploader: React.FC<ManuscriptUploaderProps> = ({ onComplete, isDarkMode }) => {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [status, setStatus] = useState<'idle' | 'parsing' | 'analyzing' | 'rewriting' | 'complete' | 'error'>('idle');
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const [rewriteMode, setRewriteMode] = useState<RewriteMode>('fix_errors');
    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const [preserveVoice, setPreserveVoice] = useState(true);

    const [contextProfile, setContextProfile] = useState<ContextProfile | null>(null);
    const [rawText, setRawText] = useState<string>('');
    const [enhancedText, setEnhancedText] = useState<string>('');
    const [showDiff, setShowDiff] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            validateAndSetFile(droppedFile);
        }
    }, []);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            validateAndSetFile(selectedFile);
        }
    }, []);

    const validateAndSetFile = (file: File) => {
        const validTypes = ['text/plain', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const maxSize = 50 * 1024 * 1024; // 50MB

        if (!validTypes.includes(file.type) && !file.name.match(/\.(txt|pdf|docx)$/i)) {
            setError('Invalid file type. Please upload .txt, .pdf, or .docx files.');
            return;
        }

        if (file.size > maxSize) {
            setError('File too large. Maximum size is 50MB.');
            return;
        }

        setFile(file);
        setError(null);
    };

    const handleProcess = async () => {
        if (!file) return;

        try {
            setStatus('parsing');
            setProgress(10);

            // Parse file
            const { text, metadata } = await manuscriptDoctorService.parseFile(file);
            setRawText(text);
            setProgress(30);

            // Analyze context
            setStatus('analyzing');
            const profile = manuscriptDoctorService.analyzeContext(text, selectedGenre || undefined);
            setContextProfile(profile);
            setProgress(50);

            // Rewrite
            setStatus('rewriting');
            const { enhancedText: enhanced, report } = await manuscriptDoctorService.rewriteManuscript(
                text,
                rewriteMode,
                profile,
                preserveVoice
            );
            setEnhancedText(enhanced);
            setProgress(90);

            // Complete
            setStatus('complete');
            setProgress(100);

            const upload: ManuscriptUpload = {
                id: `upload-${Date.now()}`,
                userId: 'current-user',
                originalFileName: file.name,
                fileType: file.name.split('.').pop() as 'pdf' | 'docx' | 'txt',
                fileSize: file.size,
                uploadedAt: new Date(),
                status: 'complete',
                rawText: text,
                wordCount: text.split(/\s+/).length,
                chapterCount: enhanced.split(/(?:^|\n)(?:Chapter|CHAPTER)\s+\d+/g).length - 1,
                contextProfile: profile,
                rewriteMode,
                selectedGenre,
                targetAudience: 'General',
                preserveVoice,
                enhancedText: enhanced,
                changesCount: report.changeLog.length,
                kdpReadinessScore: Math.min(100, Math.round(profile.readabilityGrade * 10 + report.readabilityImprovement)),
                rewriteReport: report
            };

            onComplete(upload);

        } catch (err) {
            setStatus('error');
            setError(err instanceof Error ? err.message : 'An error occurred during processing');
        }
    };

    const getModeDescription = (mode: RewriteMode): string => {
        switch (mode) {
            case 'fix_errors':
                return 'Fix grammar, spelling, and formatting issues only';
            case 'full_rewrite':
                return 'Complete rewrite with genre-specific enhancements';
            case 'enhance_style':
                return 'Improve style while preserving your voice';
            case 'continue_writing':
                return 'AI continues writing from your last paragraph';
        }
    };

    return (
        <div className={`max-w-5xl mx-auto p-8 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <div className="mb-12">
                <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4">
                    Manuscript <span className="text-indigo-500">Doctor</span>
                </h1>
                <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Upload your existing manuscript for AI-powered enhancement and KDP optimization
                </p>
            </div>

            {status === 'idle' && (
                <>
                    {/* File Upload Zone */}
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`relative border-2 border-dashed rounded-3xl p-16 text-center transition-all ${isDragging
                                ? 'border-indigo-500 bg-indigo-500/10'
                                : isDarkMode
                                    ? 'border-slate-700 hover:border-slate-600'
                                    : 'border-slate-300 hover:border-slate-400'
                            }`}
                    >
                        <input
                            type="file"
                            accept=".txt,.pdf,.docx"
                            onChange={handleFileSelect}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />

                        <Upload size={64} className={`mx-auto mb-6 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`} />

                        <h3 className="text-2xl font-black mb-2">
                            {file ? file.name : 'Drop your manuscript here'}
                        </h3>
                        <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
                            Supports .TXT, .DOCX, .PDF (max 50MB)
                        </p>

                        {file && (
                            <div className="mt-6 flex items-center justify-center gap-4">
                                <FileText size={20} className="text-indigo-500" />
                                <span className="text-sm font-bold">{(file.size / 1024).toFixed(0)} KB</span>
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3">
                            <AlertCircle size={20} className="text-red-500" />
                            <span className="text-sm font-bold text-red-500">{error}</span>
                        </div>
                    )}

                    {file && !error && (
                        <>
                            {/* Rewrite Mode Selection */}
                            <div className="mt-12 space-y-6">
                                <h3 className="text-2xl font-black uppercase tracking-tighter">Enhancement Mode</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {(['fix_errors', 'full_rewrite', 'enhance_style', 'continue_writing'] as RewriteMode[]).map(mode => (
                                        <button
                                            key={mode}
                                            onClick={() => setRewriteMode(mode)}
                                            className={`p-6 rounded-2xl border-2 text-left transition-all ${rewriteMode === mode
                                                    ? 'border-indigo-500 bg-indigo-500/10'
                                                    : isDarkMode
                                                        ? 'border-slate-800 hover:border-slate-700'
                                                        : 'border-slate-200 hover:border-slate-300'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-black uppercase tracking-widest">
                                                    {mode.replace('_', ' ')}
                                                </span>
                                                {rewriteMode === mode && <CheckCircle size={18} className="text-indigo-500" />}
                                            </div>
                                            <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
                                                {getModeDescription(mode)}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Options */}
                            <div className="mt-8 space-y-4">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={preserveVoice}
                                        onChange={e => setPreserveVoice(e.target.checked)}
                                        className="w-5 h-5 rounded border-2 border-slate-700"
                                    />
                                    <span className="text-sm font-bold">Preserve Author Voice</span>
                                </label>

                                <div>
                                    <label className="block text-sm font-black uppercase tracking-widest mb-2">
                                        Genre (Optional)
                                    </label>
                                    <select
                                        value={selectedGenre}
                                        onChange={e => setSelectedGenre(e.target.value)}
                                        className={`w-full p-3 rounded-xl border-2 ${isDarkMode
                                                ? 'bg-slate-900 border-slate-800'
                                                : 'bg-white border-slate-200'
                                            }`}
                                    >
                                        <option value="">Auto-Detect</option>
                                        <option value="ROMANCE">Romance</option>
                                        <option value="MYSTERY">Mystery/Thriller</option>
                                        <option value="FANTASY">Fantasy</option>
                                        <option value="SCIFI">Sci-Fi</option>
                                        <option value="HORROR">Horror</option>
                                        <option value="NONFICTION">Non-Fiction</option>
                                    </select>
                                </div>
                            </div>

                            {/* Process Button */}
                            <button
                                onClick={handleProcess}
                                className="mt-8 w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl"
                            >
                                <Sparkles size={20} />
                                Enhance Manuscript
                            </button>
                        </>
                    )}
                </>
            )}

            {/* Processing Status */}
            {(status === 'parsing' || status === 'analyzing' || status === 'rewriting') && (
                <div className="space-y-8">
                    <div className="text-center">
                        <Loader2 size={64} className="mx-auto mb-6 animate-spin text-indigo-500" />
                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">
                            {status === 'parsing' && 'Parsing Manuscript...'}
                            {status === 'analyzing' && 'Analyzing Context...'}
                            {status === 'rewriting' && 'Enhancing Content...'}
                        </h3>
                        <p className={isDarkMode ? 'text-slate-500' : 'text-slate-600'}>
                            This may take a few moments
                        </p>
                    </div>

                    <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Complete */}
            {status === 'complete' && contextProfile && (
                <div className="space-y-8">
                    <div className="text-center p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl">
                        <CheckCircle size={64} className="mx-auto mb-4 text-emerald-500" />
                        <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">
                            Enhancement Complete!
                        </h3>
                        <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                            Your manuscript has been optimized for KDP publishing
                        </p>
                    </div>

                    {/* Context Profile */}
                    <div className={`p-8 rounded-3xl border-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                        <h4 className="text-xl font-black uppercase tracking-tighter mb-6">Manuscript Analysis</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div>
                                <span className={`text-xs font-black uppercase tracking-widest block mb-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
                                    Genre
                                </span>
                                <span className="text-lg font-bold text-indigo-500">{contextProfile.detectedGenre}</span>
                            </div>
                            <div>
                                <span className={`text-xs font-black uppercase tracking-widest block mb-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
                                    Tone
                                </span>
                                <span className="text-lg font-bold">{contextProfile.tone}</span>
                            </div>
                            <div>
                                <span className={`text-xs font-black uppercase tracking-widest block mb-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
                                    POV
                                </span>
                                <span className="text-lg font-bold">{contextProfile.pov} Person</span>
                            </div>
                            <div>
                                <span className={`text-xs font-black uppercase tracking-widest block mb-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
                                    Grade Level
                                </span>
                                <span className="text-lg font-bold">{contextProfile.readabilityGrade}</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowDiff(!showDiff)}
                            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all"
                        >
                            <Eye size={20} />
                            {showDiff ? 'Hide' : 'View'} Changes
                        </button>
                        <button
                            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all"
                        >
                            <Download size={20} />
                            Download Enhanced
                        </button>
                    </div>

                    {/* Diff View */}
                    {showDiff && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className={`p-6 rounded-2xl border-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                                <h5 className="text-sm font-black uppercase tracking-widest mb-4 text-red-500">Original</h5>
                                <pre className="text-xs whitespace-pre-wrap font-mono">{rawText.substring(0, 500)}...</pre>
                            </div>
                            <div className={`p-6 rounded-2xl border-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                                <h5 className="text-sm font-black uppercase tracking-widest mb-4 text-emerald-500">Enhanced</h5>
                                <pre className="text-xs whitespace-pre-wrap font-mono">{enhancedText.substring(0, 500)}...</pre>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
