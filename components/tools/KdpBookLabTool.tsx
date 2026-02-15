// Phase 6: KDP Book Lab - Wrapper Component
// Note: This is a large tool (~1,700 lines) with complex wizard flow
// Full extraction scheduled for Phase 7 to ensure zero functionality loss

import React from 'react';
import { ToolComponentProps } from './types';

// Import the original ToolView to delegate rendering
// This maintains 100% functionality while enabling the modular architecture
import ToolView from '../ToolView';

export const KdpBookLabTool: React.FC<ToolComponentProps> = (props) => {
  // Delegate to original ToolView for complex KDP logic
  // This preserves all: wizard steps, state management, auto-save, AI deck
  return <ToolView {...props} toolType={props.toolType} />;
};

export default KdpBookLabTool;
