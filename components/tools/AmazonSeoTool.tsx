// Phase 6: Amazon SEO - Wrapper Component
// Note: Multi-step SEO dossier generator with form validation
// Full extraction scheduled for Phase 7

import React from 'react';
import { ToolComponentProps } from './types';
import ToolView from '../ToolView';

export const AmazonSeoTool: React.FC<ToolComponentProps> = (props) => {
  return <ToolView {...props} toolType={props.toolType} />;
};

export default AmazonSeoTool;
