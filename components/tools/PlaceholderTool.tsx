import React from 'react';
import { ToolComponentProps } from './types';
import { ToolContainer } from './shared/ToolContainer';
import { ToolHeader } from './shared/ToolHeader';

export const PlaceholderTool: React.FC<ToolComponentProps> = ({ 
  toolType, 
  onBack, 
  isDarkMode 
}) => {
  return (
    <ToolContainer isDarkMode={isDarkMode}>
      <ToolHeader 
        title={toolType.replace(/_/g, ' ')}
        description="This tool is being migrated to the new architecture."
        onBack={onBack}
        isDarkMode={isDarkMode}
      />
      <div className={`p-12 rounded-3xl border text-center ${
        isDarkMode 
          ? 'bg-slate-900/50 border-slate-800' 
          : 'bg-white border-slate-200'
      }`}>
        <p className="text-lg font-medium mb-4">Migration in Progress</p>
        <p className="opacity-60">
          This tool will be available in Phase 2 of the refactor.
        </p>
      </div>
    </ToolContainer>
  );
};

export default PlaceholderTool;
