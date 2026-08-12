import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckSquare, Square, X, ExternalLink, FileText } from 'lucide-react';

interface AIDisclosureModalProps {
  isOpen: boolean;
  bookTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const AIDisclosureModal: React.FC<AIDisclosureModalProps> = ({
  isOpen,
  bookTitle,
  onConfirm,
  onCancel,
}) => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  const allChecked = checked1 && checked2 && checked3;

  const handleClose = () => {
    setChecked1(false);
    setChecked2(false);
    setChecked3(false);
    onCancel();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl shadow-amber-500/10 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <AlertTriangle size={18} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-400">KDP Compliance</p>
                  <h2 className="text-sm font-bold text-white">AI Content Disclosure Required</h2>
                </div>
              </div>
              <button onClick={handleClose} className="text-slate-500 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              {/* Book name */}
              <div className="bg-slate-800/60 rounded-xl px-4 py-3 flex items-center gap-3">
                <FileText size={16} className="text-indigo-400 shrink-0" />
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Exporting</p>
                  <p className="text-sm font-semibold text-white truncate">{bookTitle || 'Your Book'}</p>
                </div>
              </div>

              {/* KDP Policy note */}
              <p className="text-xs text-slate-400 leading-relaxed">
                Amazon KDP requires authors to disclose when AI tools assisted in creating
                content. You must confirm this before downloading your export files.
                <a
                  href="https://kdp.amazon.com/help/topic/G200672390"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 ml-1 underline underline-offset-2"
                >
                  KDP AI Policy <ExternalLink size={10} />
                </a>
              </p>

              {/* Checkboxes */}
              <div className="space-y-3">
                <CheckboxRow
                  checked={checked1}
                  onChange={setChecked1}
                  label="I will disclose AI-assisted content during KDP upload (Content Details page)."
                />
                <CheckboxRow
                  checked={checked2}
                  onChange={setChecked2}
                  label="I have reviewed the exported content and it meets KDP content guidelines."
                />
                <CheckboxRow
                  checked={checked3}
                  onChange={setChecked3}
                  label="I understand I am the author of record and responsible for this content."
                />
              </div>

              {/* Warning if not all checked */}
              <AnimatePresence>
                {!allChecked && (checked1 || checked2 || checked3) && (
                  <motion.p
                    className="text-[10px] text-amber-400/70 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Confirm all 3 items to proceed
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={handleClose}
                  className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={allChecked ? onConfirm : undefined}
                  disabled={!allChecked}
                  className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    allChecked
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-black cursor-pointer'
                      : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                  }`}
                  whileHover={allChecked ? { scale: 1.02 } : {}}
                  whileTap={allChecked ? { scale: 0.98 } : {}}
                >
                  Download Export
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface CheckboxRowProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}

const CheckboxRow: React.FC<CheckboxRowProps> = ({ checked, onChange, label }) => (
  <button
    onClick={() => onChange(!checked)}
    className="w-full flex items-start gap-3 text-left group"
  >
    <div className={`mt-0.5 shrink-0 transition-colors ${checked ? 'text-emerald-400' : 'text-slate-600 group-hover:text-slate-400'}`}>
      {checked ? <CheckSquare size={16} /> : <Square size={16} />}
    </div>
    <p className={`text-xs leading-relaxed transition-colors ${checked ? 'text-slate-200' : 'text-slate-500 group-hover:text-slate-400'}`}>
      {label}
    </p>
  </button>
);

export default AIDisclosureModal;
