import { RefObject, useEffect, useRef } from 'react';

export function useResizeObserver(
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
) {
  const callbackRef = useRef(callback);

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!ref?.current) return;

    // Event-driven resize: observe container size changes (e.g., sidebar animation)
    const observer = new ResizeObserver(() => {
      callbackRef.current();
    });

    observer.observe(document.documentElement);

    return () => {
      observer.disconnect();
    };
  }, [ref]);
}
