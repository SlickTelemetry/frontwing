import { useCallback, useEffect, useState } from 'react';

// Create a custom event bus for synchronizing state
const eventBus = new EventTarget();

export function useLocalStorage<T>(key: string, initial: T) {
  const [state, setState] = useState<T | null>();

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored != null) setState(JSON.parse(stored));
    else setState(initial);

    const handleStorageChange = (e: Event) => {
      const customEvent = e as CustomEvent<T>;
      setState(customEvent.detail);
    };

    eventBus.addEventListener(`local-storage-${key}`, handleStorageChange);
    return () =>
      eventBus.removeEventListener(`local-storage-${key}`, handleStorageChange);
  }, [initial, key]);

  useEffect(() => {
    if (state != null) localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  // Wrap setState to dispatch custom event when value changes
  const updateState = useCallback(
    (value: T) => {
      const event = new CustomEvent(`local-storage-${key}`, { detail: value });
      eventBus.dispatchEvent(event);
    },
    [key],
  );

  function removeState() {
    setState(null);
    sessionStorage.removeItem(key);
  }
  return [state, updateState, removeState] as const;
}

export function useReadLocalStorage(key: string) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored != null) setValue(JSON.parse(stored));

    const handleStorageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setValue(customEvent.detail);
    };

    eventBus.addEventListener(`local-storage-${key}`, handleStorageChange);
    return () =>
      eventBus.removeEventListener(`local-storage-${key}`, handleStorageChange);
  }, [key]);

  return value;
}

export function useSessionStorage<T>(key: string, initial: T) {
  const [state, setState] = useState<T | null>();

  useEffect(() => {
    const stored = sessionStorage.getItem(key);
    if (stored != null) {
      setState(JSON.parse(stored));
    } else {
      setState(initial);
    }

    const handleStorageChange = (e: Event) => {
      const customEvent = e as CustomEvent<T>;
      setState(customEvent.detail);
    };

    eventBus.addEventListener(`session-storage-${key}`, handleStorageChange);
    return () =>
      eventBus.removeEventListener(
        `session-storage-${key}`,
        handleStorageChange,
      );
  }, [initial, key]);

  useEffect(() => {
    if (state != null) sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  // Wrap setState to dispatch custom event when value changes
  const updateState = useCallback(
    (value: T) => {
      const event = new CustomEvent(`session-storage-${key}`, {
        detail: value,
      });
      eventBus.dispatchEvent(event);
    },
    [key],
  );

  function removeState() {
    setState(null);
    sessionStorage.removeItem(key);
  }

  return [state, updateState, removeState] as const;
}

export function useReadSessionStorage(key: string) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem(key);
    if (stored != null) setValue(JSON.parse(stored));

    const handleStorageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setValue(customEvent.detail);
    };

    eventBus.addEventListener(`session-storage-${key}`, handleStorageChange);
    return () =>
      eventBus.removeEventListener(
        `session-storage-${key}`,
        handleStorageChange,
      );
  }, [key]);

  return value;
}
