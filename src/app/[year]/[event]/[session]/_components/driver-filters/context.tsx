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
  data: {
    drivers: (GetSessionDetailsQuery['sessions'][number]['driver_sessions'][number]['driver'] & {
      isHidden: boolean;
    })[];
    constructors: {
      name: string;
      color: string;
      isHidden: boolean;
    }[];
  };
  constructorDriversMap: Map<string, string[]>;
  // New explicit APIs
  setHidden: (ids: string[], value: boolean) => void;
  resetHidden: () => void;
  setAllHidden: () => void;
  toggleConstructor: (team: string) => void;
  toggleDrivers: (ids: string[]) => void;
  hiddenDrivers: string[];
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
  const [hiddenItems, dispatch] = useReducer(visibilityReducer, {});
  const initAppliedRef = useRef(false);

  const {
    memoizedDrivers,
    memoizedConstructors,
    driverLookupMap, // New
    constructorDriversMap, // New
  } = useMemo(() => {
    if (!sessions?.length) {
      return {
        memoizedDrivers: [],
        memoizedConstructors: [],
        driverLookupMap: {},
        constructorDriversMap: new Map<string, string[]>(),
      };
    }

    const constructors = Array.from(
      new Map(
        sessions.map((c) => {
          const name = c.constructorByConstructorId?.name ?? 'Unknown';
          const color = c.constructorByConstructorId?.color;
          return [
            name,
            {
              name,
              color: color ? `#${color}` : 'var(--foreground)',
            },
          ];
        }),
      ).values(),
    );

    const driverLookupMap: Record<
      string,
      GetSessionDetailsQuery['sessions'][number]['driver_sessions'][number]
    > = {};
    const constructorDriversMap = new Map<string, string[]>();

    constructors.forEach((constructor) => {
      constructorDriversMap.set(constructor.name, []);
    });

    sessions.forEach((c) => {
      const driver = c.driver;
      const abbr = driver?.abbreviation ?? '';
      const constructor = c.constructorByConstructorId?.name ?? 'Unknown';
      // Populate driver lookup
      driverLookupMap[abbr] = c;

      // Populate constructor drivers map
      if (constructorDriversMap.has(constructor)) {
        constructorDriversMap
          .get(constructor)
          ?.push(driver?.abbreviation ?? '');
      }
    });

    return {
      memoizedDrivers: sessions,
      memoizedConstructors: constructors,
      driverLookupMap,
      constructorDriversMap,
    };
  }, [sessions]);

  // Reset the init flag whenever sessions change so a new session may be initialized
  useEffect(() => {
    initAppliedRef.current = false;
  }, [sessions]);

  const setHidden = useCallback((ids: string[], value: boolean) => {
    dispatch({ type: 'SET_HIDDEN', payload: { ids, value } });
  }, []);

  const resetHidden = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const setAllHidden = useCallback(() => {
    const allIds = [
      ...Object.keys(driverLookupMap),
      ...memoizedConstructors.map((c) => c.name ?? ''),
    ];
    dispatch({ type: 'SET_HIDDEN', payload: { ids: allIds, value: true } });
  }, [driverLookupMap, memoizedConstructors]);

  const toggleConstructor = useCallback(
    (team: string) => {
      const isHidden = !!hiddenItems[team];
      const drivers = constructorDriversMap.get(team) ?? [];
      setHidden([team, ...drivers], !isHidden);
    },
    [constructorDriversMap, hiddenItems, setHidden],
  );

  const toggleDrivers = useCallback(
    (ids: string[]) => {
      const toHide: string[] = [];
      const toShow: string[] = [];
      ids.forEach((id) => {
        if (hiddenItems[id]) toShow.push(id);
        else toHide.push(id);
      });
      if (toHide.length) setHidden(toHide, true);
      if (toShow.length) setHidden(toShow, false);
    },
    [hiddenItems, setHidden],
  );

  const data = useMemo(() => {
    // Combine drivers data with visibility status
    const driversWithVisibility = memoizedDrivers.map((d) => ({
      ...d.driver,
      isHidden: !!hiddenItems[d.driver?.abbreviation ?? ''], // Fast lookup
    }));

    // Combine constructors data with visibility status
    const constructorsWithVisibility = memoizedConstructors.map((c) => ({
      ...c,
      isHidden: !!hiddenItems[c.name], // Fast lookup
    }));

    return {
      drivers: driversWithVisibility,
      constructors: constructorsWithVisibility,
    };
  }, [memoizedDrivers, memoizedConstructors, hiddenItems]); // Depends on base data and visibility state

  const hiddenDrivers = data.drivers
    .filter((d) => d.isHidden)
    .map((d) => d.abbreviation ?? '');

  // Apply initial hidden drivers only once when provider initializes or
  // when we first receive a non-empty `initialHiddenDrivers` value for this session.
  useEffect(() => {
    // Only apply once per session load
    if (initAppliedRef.current) return;

    // Don't apply if we don't have any drivers yet or there is nothing to apply
    if (!initialHiddenDrivers || initialHiddenDrivers.length === 0) return;
    if (!memoizedDrivers || memoizedDrivers.length === 0) return;

    // Apply initial hidden drivers (idempotent SET_HIDDEN)
    dispatch({
      type: 'SET_HIDDEN',
      payload: { ids: initialHiddenDrivers, value: true },
    });
    initAppliedRef.current = true;
  }, [initialHiddenDrivers, memoizedDrivers]);

  return (
    <SessionItemContext.Provider
      value={{
        // Data
        constructorDriversMap,
        data,
        hiddenDrivers,
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
