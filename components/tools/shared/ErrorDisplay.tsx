import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ErrorDisplayProps {
  error: string;
  onDismiss?: () => void;
  isDarkMode: boolean;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ 
  error, 
  onDismiss,
  isDarkMode 
}) => {
  return (
    <div className={`p-6 rounded-2xl mb-6 flex items-start gap-4 ${
      isDarkMode 
        ? 'bg-red-500/10 border border-red-500/20 text-red-200' 
        : 'bg-red-50 border border-red-200 text-red-800'
    }`}>
      <AlertTriangle className="flex-shrink-0 mt-0.5" size={20} />
      <div className="flex-1">
        <p className="font-bold mb-1">Error</p>
        <p className="text-sm opacity-80">{error}</p>
      </div>
      {onDismiss && (
        <button 
          onClick={onDismiss}
          className="opacity-60 hover:opacity-100 transition-opacity"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};
