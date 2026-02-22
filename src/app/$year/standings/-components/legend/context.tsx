import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import {
  compareCountback,
  countConstructorPositions,
  countDriverPositions,
} from '../countback';
import { visibilityReducer } from './reducer';

import { GetStandingsQuery } from '@/types/graphql';

type HiddenItemContextValue = {
  data: {
    drivers: (GetStandingsQuery['drivers'][number] & { isHidden: boolean })[];
    constructors: (GetStandingsQuery['constructors'][number] & {
      isHidden: boolean;
    })[];
  };
  constructorDriversMap: Map<string, string[]>;
  toggleVisibility: (
    type: 'drivers' | 'constructors' | 'all' | 'none',
    ids?: string[],
  ) => void;
};

const HiddenItemContext = createContext<HiddenItemContextValue | null>(null);

export function useHiddenItems() {
  const ctx = useContext(HiddenItemContext);
  if (!ctx) {
    throw new Error('useHiddenItems must be used within HiddenItemProvider');
  }
  return ctx;
}

export function HiddenItemProvider({
  children,
  standings,
}: {
  children: React.ReactNode;
  standings: GetStandingsQuery;
}) {
  const {
    memoizedDrivers,
    memoizedConstructors,
    driverLookupMap,
    constructorDriversMap,
  } = useMemo(() => {
    if (!standings?.drivers || !standings?.events || !standings?.constructors) {
      return {
        memoizedDrivers: [],
        memoizedConstructors: [],
        driverLookupMap: {},
        constructorDriversMap: new Map<string, string[]>(),
      };
    }
    const sortedConstructors = [...standings.constructors].sort((a, b) => {
      const aPoints = a?.lastRoundPoints?.[0]?.points ?? 0;
      const bPoints = b?.lastRoundPoints?.[0]?.points ?? 0;
      if (aPoints !== bPoints) {
        return bPoints - aPoints;
      }
      const aPositionCount = countConstructorPositions(
        a.name ?? 'Unknown',
        standings.events,
      );
      const bPositionCount = countConstructorPositions(
        b.name ?? 'Unknown',
        standings.events,
      );
      return compareCountback(aPositionCount, bPositionCount);
    });
    const sortedDrivers = [...standings.drivers].sort((a, b) => {
      const aPoints = a.driver_standings?.at(-1)?.points ?? 0;
      const bPoints = b.driver_standings?.at(-1)?.points ?? 0;
      if (aPoints !== bPoints) {
        return bPoints - aPoints;
      }
      const aPositionCount = countDriverPositions(
        a.full_name ?? '',
        standings.events,
      );
      const bPositionCount = countDriverPositions(
        b.full_name ?? '',
        standings.events,
      );
      return compareCountback(aPositionCount, bPositionCount);
    });
    const driverLookupMap: Record<
      string,
      GetStandingsQuery['drivers'][number]
    > = {};
    const constructorDriversMap = new Map<string, string[]>();

    sortedConstructors.forEach((constructor) => {
      const constructorName = constructor.name ?? 'Unknown';
      constructorDriversMap.set(constructorName, []);
    });

    sortedDrivers.forEach((driver) => {
      const abbr = driver.abbreviation ?? '';
      const constructor = driver.latest_constructor[0].constructor?.name ?? '';
      driverLookupMap[abbr] = driver;
      if (constructorDriversMap.has(constructor)) {
        constructorDriversMap.get(constructor)?.push(driver.abbreviation ?? '');
      }
    });

    return {
      memoizedDrivers: sortedDrivers,
      memoizedConstructors: sortedConstructors,
      driverLookupMap,
      constructorDriversMap,
    };
  }, [standings]);

  const [hiddenItems, dispatch] = useReducer(visibilityReducer, {});

  const toggleVisibility = useCallback(
    (type: 'drivers' | 'constructors' | 'all' | 'none', ids?: string[]) => {
      dispatch({
        type: 'TOGGLE_VISIBILITY',
        payload: {
          type,
          ids,
          data: {
            memoizedDrivers,
            memoizedConstructors,
            driverLookupMap,
            constructorDriversMap,
          },
        },
      });
    },
    [
      memoizedDrivers,
      memoizedConstructors,
      driverLookupMap,
      constructorDriversMap,
    ],
  );

  const data = useMemo(() => {
    const driversWithVisibility = memoizedDrivers.map((d) => ({
      ...d,
      isHidden: !!hiddenItems[d.abbreviation ?? ''],
    }));

    const constructorsWithVisibility = memoizedConstructors.map((c) => ({
      ...c,
      isHidden: !!hiddenItems[c.name ?? 'Unknown'],
    }));

    return {
      drivers: driversWithVisibility,
      constructors: constructorsWithVisibility,
    };
  }, [memoizedDrivers, memoizedConstructors, hiddenItems]);

  return (
    <HiddenItemContext.Provider
      value={{
        toggleVisibility,
        constructorDriversMap,
        data,
      }}
    >
      {children}
    </HiddenItemContext.Provider>
  );
}
