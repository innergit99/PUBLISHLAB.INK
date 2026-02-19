import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { PODStyle } from '../types';

interface PODStyleCardProps {
  style: PODStyle;
  isSelected: boolean;
  onClick: () => void;
}

export const PODStyleCard: React.FC<PODStyleCardProps> = ({
  style,
  isSelected,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative group flex-shrink-0 w-32 md:w-40 aspect-[2/3] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] transition-all duration-500
        ${isSelected
          ? 'ring-4 ring-indigo-500 scale-105 shadow-[0_20px_50px_rgba(99,102,241,0.4)] z-10'
          : 'hover:scale-105 border border-white/5 hover:border-white/20'
        }
      `}
    >
      {/* Visual Preview */}
      {style.previewUrl ? (
        <img
          src={style.previewUrl}
          alt={style.label}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}
        />
      ) : (
        <div className={`absolute inset-0 bg-linear-to-br ${style.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />
      )}

      {/* Pattern Overlay & Vignette */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80" />
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4zKSIvPjwvc3ZnPg==')]" />

      {/* Selection State Glow */}
      {isSelected && (
        <div className="absolute inset-0 bg-indigo-500/20 animate-pulse" />
      )}

      {/* Content */}
      <div className="absolute inset-0 p-3 md:p-4 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="p-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
            <Sparkles size={10} className="text-white/80" />
          </div>
          {isSelected && (
            <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
              <Check size={14} className="text-white" strokeWidth={3} />
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-white/60">
            {style.category}
          </p>
          <h3 className="text-xs md:text-sm font-black uppercase italic tracking-tight text-white leading-tight drop-shadow-md">
            {style.label}
          </h3>
          <div className={`h-1 rounded-full transition-all duration-500 ${isSelected ? 'w-full bg-indigo-400' : 'w-0 group-hover:w-8 bg-white/30'}`} />
        </div>
      </div>

      {/* Interactions Overlay */}
      <div className={`absolute inset-0 border-2 rounded-[1.5rem] md:rounded-[2rem] transition-colors duration-500 ${isSelected ? 'border-white/30' : 'border-transparent group-hover:border-white/10'}`} />
    </button>
  );
};
