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
        relative group flex-shrink-0 w-32 md:w-36 aspect-[2/3] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] transition-all duration-500
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

      {/* Gradient Vignette */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />

      {/* Selection State Glow */}
      {isSelected && (
        <div className="absolute inset-0 bg-indigo-500/10 animate-pulse" />
      )}

      {/* Checkmark Marker */}
      <div className="absolute top-3 right-3">
        {isSelected && (
          <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
            <Check size={14} className="text-white" strokeWidth={3} />
          </div>
        )}
      </div>

      <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <Sparkles size={12} className="text-white/40" />
      </div>

      {/* Interactions Overlay */}
      <div className={`absolute inset-0 border-2 rounded-[1.5rem] md:rounded-[2rem] transition-colors duration-500 ${isSelected ? 'border-white/30' : 'border-transparent group-hover:border-white/10'}`} />
    </button>
  );
};
