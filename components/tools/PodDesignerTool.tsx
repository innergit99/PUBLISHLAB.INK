// Phase 6: POD Designer - Wrapper Component
// Note: Complex tool with style selection, mockup generation, product catalog
// Full extraction scheduled for Phase 7

import React from 'react';
import { ToolComponentProps } from './types';
import ToolView from '../ToolView';

export const PodDesignerTool: React.FC<ToolComponentProps> = (props) => {
  return <ToolView {...props} toolType={props.toolType} />;
};

export default PodDesignerTool;
