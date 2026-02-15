import React from 'react';

interface ToolContainerProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  className?: string;
}

export const ToolContainer: React.FC<ToolContainerProps> = ({ 
  children, 
  isDarkMode,
  className = ''
}) => {
  return (
    <div className={`p-12 animate-in fade-in duration-500 ${className}`}>
      <div className={`max-w-6xl mx-auto ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
        {children}
      </div>
    </div>
  );
};
