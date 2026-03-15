"use client";

import { useRef } from "react";

const DEFAULT_DELAY_MS = 3000;

export type UseDebounceOptions = {
  delay?: number;
};

export type DebouncedRun = (args: { callback: () => void }) => void;

/**
 * Returns a debounced runner: each call schedules the callback after `delay` ms.
 * If called again before the delay, the previous schedule is cleared (last call wins).
 */
export const useDebounce = ({
  delay = DEFAULT_DELAY_MS,
}: UseDebounceOptions = {}): DebouncedRun => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return ({ callback }: { callback: () => void }) => {
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callback();
      timeoutRef.current = null;
    }, delay);
  };
};
