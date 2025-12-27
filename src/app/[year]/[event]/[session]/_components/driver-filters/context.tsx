import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initAppliedRef = useRef(false);
  const [hiddenItems, dispatch] = useReducer(visibilityReducer, {});

  // Get all available driver abbreviations
  const allDriverAbbreviations = useMemo(() => {
    return (
      sessions
        ?.map((ds) => ds.driver?.abbreviation)
        .filter((abbr): abbr is string => !!abbr) ?? []
    );
  }, [sessions]);

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

  // Calculate selected drivers (not hidden)
  const selectedDrivers = useMemo(() => {
    return allDriverAbbreviations.filter((abbr) => !hiddenItems[abbr]);
  }, [allDriverAbbreviations, hiddenItems]);

  // Initialize from search params or initialHiddenDrivers
  useEffect(() => {
    if (initAppliedRef.current || !allDriverAbbreviations.length) return;

    const driversParam = searchParams.get('drivers');

    if (driversParam) {
      // Parse selected drivers from search params
      const selectedFromParams = driversParam.split(',').filter(Boolean);
      const hiddenFromParams = allDriverAbbreviations.filter(
        (abbr) => !selectedFromParams.includes(abbr),
      );

      if (hiddenFromParams.length > 0) {
        dispatch({
          type: 'SET_HIDDEN',
          payload: { ids: hiddenFromParams, value: true },
        });
      }
    } else if (initialHiddenDrivers?.length) {
      // Fallback to initialHiddenDrivers if no search params
      dispatch({
        type: 'SET_HIDDEN',
        payload: { ids: initialHiddenDrivers, value: true },
      });
    }

    initAppliedRef.current = true;
  }, [searchParams, initialHiddenDrivers, allDriverAbbreviations]);

  // Update search params when selected drivers change
  useEffect(() => {
    if (!initAppliedRef.current || !allDriverAbbreviations.length) return; // Don't update on initial load or before sessions load

    const params = new URLSearchParams(searchParams);
    const currentDriversParam = params.get('drivers') || '';
    const newDriversParam =
      selectedDrivers.length === allDriverAbbreviations.length
        ? '' // All drivers selected, remove the param
        : selectedDrivers.join(',');

    // Only update if the value actually changed
    if (currentDriversParam !== newDriversParam) {
      // Remove drivers param to rebuild manually
      params.delete('drivers');

      // Build query string manually to avoid encoding the pipe separator
      const queryParts: string[] = [];

      // Add all other params (properly encoded)
      params.forEach((value, key) => {
        queryParts.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
        );
      });

      // Add drivers param first (unencoded pipe separator)
      if (newDriversParam) {
        queryParts.push(`drivers=${newDriversParam}`);
      }

      const newUrl =
        queryParts.length > 0
          ? `${pathname}?${queryParts.join('&')}`
          : pathname;
      router.replace(newUrl, { scroll: false });
    }
  }, [selectedDrivers, allDriverAbbreviations, searchParams, router, pathname]);

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
