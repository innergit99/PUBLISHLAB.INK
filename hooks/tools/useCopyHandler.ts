import { useState, useCallback } from 'react';

type CopyStatus = 'idle' | 'copied' | 'error';

interface UseCopyHandlerReturn {
  copy: (text: string) => Promise<void>;
  status: CopyStatus;
  reset: () => void;
}

export function useCopyHandler(): UseCopyHandlerReturn {
  const [status, setStatus] = useState<CopyStatus>('idle');

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('copied');
      // Auto-reset after 2 seconds
      setTimeout(() => setStatus('idle'), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
  }, []);

  return { copy, status, reset };
}
