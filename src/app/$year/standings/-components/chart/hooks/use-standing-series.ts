import { useMemo } from 'react';

import { makeLineSeries, preparePoints } from '../utils';

import { GetStandingsQuery } from '@/types/graphql';

interface UseStandingsSeriesProps {
  drivers: GetStandingsQuery['drivers'];
  constructors: GetStandingsQuery['constructors'];
  allRounds: number[];
  showPointsPerRound: boolean;
}

export function useStandingsSeries({
  drivers,
  constructors,
  allRounds,
  showPointsPerRound,
}: UseStandingsSeriesProps) {
  return useMemo(() => {
    const topDriverPerConstructor = drivers.reduce((acc, driver) => {
      const cName = driver.latest_constructor?.[0]?.constructor?.name;
      if (!cName) return acc;

      const pts = driver.driver_standings.at(-1)?.points ?? 0;

      const current = acc.get(cName);
      if (!current || pts > current.points) {
        acc.set(cName, { abbr: driver.abbreviation || '', points: pts });
      }
      return acc;
    }, new Map<string, { abbr: string; points: number }>());

    const driversSeries = drivers.map((driver) => {
      const points = preparePoints(
        driver.driver_standings,
        allRounds,
        showPointsPerRound,
      );

      const { color, name } = driver.latest_constructor?.[0]?.constructor ?? {};
      const isTop =
        topDriverPerConstructor.get(name || '')?.abbr === driver.abbreviation;

      return makeLineSeries(
        driver.abbreviation || '',
        points,
        `#${color || 'b0b0b0'}`,
        isTop ? 'solid' : 'dotted',
      );
    });

    const constructorsSeries = constructors.map((c) => {
      const points = preparePoints(
        c.constructor_standings,
        allRounds,
        showPointsPerRound,
      );
      return makeLineSeries(c.name || '', points, `#${c.color || 'cccccc'}`);
    });

    return {
      driversSeries,
      constructorsSeries,
    };
  }, [drivers, constructors, allRounds, showPointsPerRound]);
}
