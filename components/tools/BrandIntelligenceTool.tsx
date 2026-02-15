// Phase 6: Brand Intelligence - Wrapper Component
// Note: Brand DNA analysis with report visualization
// Full extraction scheduled for Phase 7

import React from 'react';
import { ToolComponentProps } from './types';
import ToolView from '../ToolView';

export const BrandIntelligenceTool: React.FC<ToolComponentProps> = (props) => {
  return <ToolView {...props} toolType={props.toolType} />;
};

export default BrandIntelligenceTool;
