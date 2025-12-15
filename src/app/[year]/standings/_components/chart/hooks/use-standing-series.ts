import { useMemo } from 'react';

import {
  makeLineSeries,
  preparePoints,
} from '@/app/[year]/standings/_components/chart';

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
    // Compute top driver per constructor (for solid/dotted lines)
    const topDriverPerConstructor = drivers.reduce((acc, driver) => {
      // Find driver's constructor
      const cName = driver.latest_constructor?.[0]?.constructor?.name;
      if (!cName) return acc;

      // Get drivers final points
      const pts = driver.driver_standings.at(-1)?.points ?? 0;

      // If no top driver or more points, set as new top driver
      const current = acc.get(cName);
      if (!current || pts > current.points) {
        acc.set(cName, { abbr: driver.abbreviation || '', points: pts });
      }
      return acc;
    }, new Map<string, { abbr: string; points: number }>());

    // Drivers series
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

    // Constructors series
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
