import { ToolType, GeneratedImage } from '../../types';

export interface ToolComponentProps {
  toolType: ToolType;
  initialPrompt?: string | null;
  onBack: () => void;
  onNavigate: (tab: ToolType, prompt?: string) => void;
  isDarkMode: boolean;
}

export interface ToolWithImageGenerationProps extends ToolComponentProps {
  onImageGenerated: (image: GeneratedImage) => void;
}

export type ToolComponent = React.FC<ToolComponentProps>;
export type ToolWithImageGenComponent = React.FC<ToolWithImageGenerationProps>;
