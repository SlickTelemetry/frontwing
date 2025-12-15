import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
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
  toggleVisibility: (
    type: 'drivers' | 'constructors' | 'all' | 'none',
    ids?: string[],
  ) => void;
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
}: {
  children: React.ReactNode;
  sessions?: GetSessionDetailsQuery['sessions'][number]['driver_sessions'];
}) {
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

  const [hiddenItems, dispatch] = useReducer(visibilityReducer, {});

  const toggleVisibility = useCallback(
    (type: 'drivers' | 'constructors' | 'all' | 'none', ids?: string[]) => {
      dispatch({
        type: 'TOGGLE_VISIBILITY',
        payload: {
          type,
          ids,
          // Pass the memoized data structures needed for calculation
          data: {
            memoizedDrivers,
            memoizedConstructors,
            driverLookupMap,
            constructorDriversMap,
          },
        },
      });
    },
    // Dependencies: dispatch is stable. The maps are stable unless `standings` changes.
    // Including them here ensures the function passed into dispatch has the latest data references.
    [
      memoizedDrivers,
      memoizedConstructors,
      driverLookupMap,
      constructorDriversMap,
    ],
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

  return (
    <SessionItemContext.Provider
      value={{
        toggleVisibility,
        constructorDriversMap,
        data,
      }}
    >
      {children}
    </SessionItemContext.Provider>
  );
}
