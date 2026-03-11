import { useNavigate } from '@tanstack/react-router';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';

import { visibilityReducer } from '@/app/$year/$event/$session/-components/driver-filters/reducer';
import { Route } from '@/app/$year/$event/$session/route';

import { GetSessionDetailsQuery } from '@/types/graphql';

type SessionItemContextValue = {
  hiddenItems: string[];
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
  const navigate = useNavigate();
  const search = Route.useSearch();
  const initAppliedRef = useRef(false);
  const [hiddenItems, dispatch] = useReducer(visibilityReducer, {});

  const allDriverAbbreviations = useMemo(() => {
    return (
      sessions
        ?.map((ds) => ds.driver?.abbreviation)
        .filter((abbr): abbr is string => !!abbr) ?? []
    );
  }, [sessions]);

  const hiddenKeys = useMemo(() => {
    const hiddenConstructors = new Set<string>();

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

  const selectedDrivers = useMemo(() => {
    return allDriverAbbreviations.filter((abbr) => !hiddenItems[abbr]);
  }, [allDriverAbbreviations, hiddenItems]);

  useEffect(() => {
    if (initAppliedRef.current || !allDriverAbbreviations.length) return;

    const driversParam = search.drivers;

    if (driversParam) {
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
      dispatch({
        type: 'SET_HIDDEN',
        payload: { ids: initialHiddenDrivers, value: true },
      });
    }

    initAppliedRef.current = true;
  }, [search.drivers, initialHiddenDrivers, allDriverAbbreviations]);

  useEffect(() => {
    if (!initAppliedRef.current || !allDriverAbbreviations.length) return;

    const currentDriversParam = search.drivers || '';
    const newDriversParam =
      selectedDrivers.length === allDriverAbbreviations.length
        ? undefined
        : selectedDrivers.join(',');

    if (currentDriversParam !== (newDriversParam ?? '')) {
      navigate({
        to: '.',
        search: (prev) => ({ ...prev, drivers: newDriversParam }),
        replace: true,
      });
    }
  }, [selectedDrivers, allDriverAbbreviations, search.drivers, navigate]);

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
