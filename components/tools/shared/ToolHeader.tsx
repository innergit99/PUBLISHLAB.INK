import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface ToolHeaderProps {
  title: string;
  description?: string;
  onBack: () => void;
  isDarkMode: boolean;
}

export const ToolHeader: React.FC<ToolHeaderProps> = ({ 
  title, 
  description, 
  onBack, 
  isDarkMode 
}) => {
  return (
    <div className={`mb-8 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      <button 
        onClick={onBack}
        className="flex items-center gap-2 mb-4 text-sm font-bold uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </button>
      <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-2">
        {title}
      </h1>
      {description && (
        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {description}
        </p>
      )}
    </div>
  );
};
