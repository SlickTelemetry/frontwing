import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';

import { visibilityReducer } from '@/app/[year]/[event]/[session]/_components/driver-filters/reducer';

import { GetSessionDetailsQuery } from '@/types/graphql';

type SessionItemContextValue = {
  hiddenItems: string[];
  // New explicit APIs
  setHidden: (ids: string[], value: boolean) => void;
  resetHidden: () => void;
  setAllHidden: () => void;
  toggleConstructor: (team: string) => void;
  toggleDrivers: (ids: string[]) => void;
};

const SessionItemContext = createContext<SessionItemContextValue | null>(null);

export function useSessionItems() {
  const ctx = useContext(SessionItemContext);
  if (!ctx) {
    throw new Error('useHiddenItems must be used within HiddenItemProvider');
  }
  return ctx;
}

export function SessionItemProvider({
  children,
  sessions,
  initialHiddenDrivers,
}: {
  children: React.ReactNode;
  sessions?: GetSessionDetailsQuery['sessions'][number]['driver_sessions'];
  initialHiddenDrivers?: string[];
}) {
  const initAppliedRef = useRef(false);
  const [hiddenItems, dispatch] = useReducer(visibilityReducer, {});
  const hiddenKeys = useMemo(() => {
    const hiddenConstructors = new Set<string>();

    // Check if all drivers of a constructor are hidden
    sessions?.forEach((ds) => {
      const constructorName = ds.constructorByConstructorId?.name;
      const driverAbbreviation = ds.driver?.abbreviation;

      if (constructorName && driverAbbreviation) {
        const allDriversHidden = sessions
          .filter((s) => s.constructorByConstructorId?.name === constructorName)
          .every((s) => hiddenItems[s.driver?.abbreviation ?? '']);

        if (allDriversHidden) {
          hiddenConstructors.add(constructorName);
        }
      }
    });

    return Object.keys(hiddenItems)
      .filter((key) => hiddenItems[key])
      .concat(Array.from(hiddenConstructors));
  }, [hiddenItems, sessions]);

  useEffect(() => {
    if (initAppliedRef.current || !initialHiddenDrivers?.length) return;
    dispatch({
      type: 'SET_HIDDEN',
      payload: { ids: initialHiddenDrivers, value: true },
    });
    initAppliedRef.current = true;
  }, [initialHiddenDrivers]);

  const setHidden = useCallback(
    (ids: string[], value: boolean) =>
      dispatch({ type: 'SET_HIDDEN', payload: { ids, value } }),
    [],
  );

  const resetHidden = useCallback(() => dispatch({ type: 'RESET' }), []);

  const setAllHidden = useCallback(() => {
    const allIds =
      sessions?.flatMap((ds) => [
        ds.constructorByConstructorId?.name,
        ds.driver?.abbreviation,
      ]) ?? [];
    dispatch({ type: 'SET_HIDDEN', payload: { ids: allIds, value: true } });
  }, [sessions]);

  const toggleConstructor = useCallback(
    (team: string) => {
      const isHidden = !!hiddenItems[team];
      const driverIds =
        sessions
          ?.filter((ds) => ds.constructorByConstructorId?.name === team)
          .map((ds) => ds.driver?.abbreviation ?? '') ?? [];
      setHidden([team, ...driverIds], !isHidden);
    },
    [hiddenItems, sessions, setHidden],
  );

  const toggleDrivers = useCallback(
    (ids: string[]) => {
      const [toHide, toShow] = ids.reduce(
        ([hide, show], id) =>
          hiddenItems[id] ? [hide, [...show, id]] : [[...hide, id], show],
        [[], []] as [string[], string[]],
      );
      if (toHide.length) setHidden(toHide, true);
      if (toShow.length) setHidden(toShow, false);
    },
    [hiddenItems, setHidden],
  );

  return (
    <SessionItemContext.Provider
      value={{
        hiddenItems: hiddenKeys,
        // Actions
        setHidden,
        resetHidden,
        setAllHidden,
        toggleConstructor,
        toggleDrivers,
      }}
    >
      {children}
    </SessionItemContext.Provider>
  );
}
