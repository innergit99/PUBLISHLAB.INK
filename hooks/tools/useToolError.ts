import { useState, useCallback } from 'react';

interface UseToolErrorReturn {
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
  handleError: (err: unknown) => void;
}

export function useToolError(): UseToolErrorReturn {
  const [error, setErrorState] = useState<string | null>(null);

  const setError = useCallback((error: string | null) => {
    setErrorState(error);
  }, []);

  const clearError = useCallback(() => {
    setErrorState(null);
  }, []);

  const handleError = useCallback((err: unknown) => {
    if (err instanceof Error) {
      setErrorState(err.message);
    } else if (typeof err === 'string') {
      setErrorState(err);
    } else {
      setErrorState('An unknown error occurred');
    }
  }, []);

  return { error, setError, clearError, handleError };
}
