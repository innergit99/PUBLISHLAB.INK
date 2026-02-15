import React, { Suspense, lazy, useMemo } from 'react';
import { ToolType, GeneratedImage } from '../types';
import { toolRegistry } from './registry';
import { LoadingState } from './shared/LoadingState';
import { ToolContainer } from './shared/ToolContainer';

interface ToolRouterProps {
  toolType: ToolType;
  initialPrompt?: string | null;
  onBack: () => void;
  onImageGenerated: (image: GeneratedImage) => void;
  onNavigate: (tab: ToolType, prompt?: string) => void;
  isDarkMode: boolean;
}

// Error Boundary Component
class ToolErrorBoundary extends React.Component<
  { children: React.ReactNode; isDarkMode: boolean },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; isDarkMode: boolean }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Tool error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ToolContainer isDarkMode={this.props.isDarkMode}>
          <div className={`p-12 text-center ${
            this.props.isDarkMode ? 'text-red-400' : 'text-red-600'
          }`}>
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="opacity-80 mb-6">This tool encountered an error. Please try another tool or refresh the page.</p>
            <pre className="text-left bg-black/50 p-4 rounded-lg text-xs overflow-auto max-w-2xl mx-auto">
              {this.state.error?.message}
            </pre>
          </div>
        </ToolContainer>
      );
    }

    return this.props.children;
  }
}

export const ToolRouter: React.FC<ToolRouterProps> = (props) => {
  const { toolType, isDarkMode } = props;

  // Lazy load the tool component based on toolType
  const ToolComponent = useMemo(() => {
    const loader = toolRegistry[toolType];
    if (!loader) {
      console.warn(`No tool registered for type: ${toolType}`);
      return null;
    }
    return lazy(loader);
  }, [toolType]);

  if (!ToolComponent) {
    return (
      <ToolContainer isDarkMode={isDarkMode}>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Tool Not Found</h2>
          <p className="opacity-60">The requested tool is not available.</p>
        </div>
      </ToolContainer>
    );
  }

  return (
    <ToolErrorBoundary isDarkMode={isDarkMode}>
      <Suspense fallback={<LoadingState message="Loading tool..." isDarkMode={isDarkMode} />}>
        <ToolComponent 
          toolType={toolType}
          initialPrompt={props.initialPrompt}
          onBack={props.onBack}
          onNavigate={props.onNavigate}
          isDarkMode={isDarkMode}
        />
      </Suspense>
    </ToolErrorBoundary>
  );
};

export default ToolRouter;
