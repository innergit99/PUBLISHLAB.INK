import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  isDarkMode: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Loading...', 
  isDarkMode 
}) => {
  return (
    <div className={`min-h-[60vh] flex flex-col items-center justify-center ${
      isDarkMode ? 'text-slate-400' : 'text-slate-600'
    }`}>
      <Loader2 className="animate-spin mb-4" size={48} />
      <p className="text-sm font-bold uppercase tracking-widest">{message}</p>
    </div>
  );
};
