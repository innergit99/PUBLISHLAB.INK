// Phase 6: Trend Intelligence - Wrapper Component
// Note: Complex dashboard with market data, tabs, opportunity cards
// Full extraction scheduled for Phase 7

import React from 'react';
import { ToolComponentProps } from './types';
import ToolView from '../ToolView';

export const TrendIntelligenceTool: React.FC<ToolComponentProps> = (props) => {
  return <ToolView {...props} toolType={props.toolType} />;
};

export default TrendIntelligenceTool;
