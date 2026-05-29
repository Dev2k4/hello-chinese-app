import { useCallback, useRef } from "react";

export function useTimer() {
  const startTimeRef = useRef<number | null>(null);

  const start = useCallback(() => {
    startTimeRef.current = Date.now();
  }, []);

  const getElapsed = useCallback((): number => {
    if (!startTimeRef.current) return 0;
    return Math.floor((Date.now() - startTimeRef.current) / 1000);
  }, []);

  const reset = useCallback(() => {
    startTimeRef.current = null;
  }, []);

  return { start, getElapsed, reset };
}
