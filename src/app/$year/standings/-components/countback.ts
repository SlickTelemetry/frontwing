import type { GetStandingsQuery } from '@/types/graphql';

/**
 * Countback utilities for Formula 1 standings tiebreaking.
 *
 * In F1, when drivers or constructors have the same total points, countback is used
 * to determine ranking. Countback compares finishing positions in order of preference:
 * 1. Number of wins (1st place finishes)
 * 2. Number of 2nd place finishes
 * 3. Number of 3rd place finishes
 * 4. And so on...
 *
 * Position count arrays are 0-indexed where:
 * - index 0 = number of 1st place finishes (wins)
 * - index 1 = number of 2nd place finishes
 * - index 2 = number of 3rd place finishes
 * - etc.
 *
 * Example: [7, 3, 4] means 7 wins, 3 second places, 4 third places
 */

/**
 * Counts finishing positions for a specific driver across all events.
 */
export const countDriverPositions = (
  driverAbbr: string,
  events: GetStandingsQuery['events'],
): number[] => {
  const positionCounts: number[] = [];

  events.forEach((event) => {
    event.race_sessions?.forEach((session) => {
      session.driver_sessions?.forEach((driverSession) => {
        if (driverSession.driver?.abbreviation === driverAbbr) {
          driverSession.results?.forEach((result) => {
            const position = parseInt(result?.classified_position ?? '0', 10);
            if (position !== null && position > 0) {
              while (positionCounts.length < position) {
                positionCounts.push(0);
              }
              positionCounts[position - 1] =
                (positionCounts[position - 1] || 0) + 1;
            }
          });
        }
      });
    });
  });

  return positionCounts;
};

/**
 * Counts finishing positions for a constructor (all drivers on that team).
 */
export const countConstructorPositions = (
  constructorName: string,
  events: GetStandingsQuery['events'],
): number[] => {
  const positionCounts: number[] = [];

  events.forEach((event) => {
    event.race_sessions?.forEach((session) => {
      session.driver_sessions?.forEach((driverSession) => {
        if (
          driverSession.constructorByConstructorId?.name === constructorName
        ) {
          driverSession.results?.forEach((result) => {
            const position = parseInt(result?.classified_position ?? '0', 10);
            if (position !== null && position > 0) {
              while (positionCounts.length < position) {
                positionCounts.push(0);
              }
              positionCounts[position - 1] =
                (positionCounts[position - 1] || 0) + 1;
            }
          });
        }
      });
    });
  });

  return positionCounts;
};

/**
 * Compares two position count arrays for countback sorting.
 */
export const compareCountback = (a: number[], b: number[]): number => {
  const maxLength = Math.max(a.length, b.length);
  for (let i = 0; i < maxLength; i++) {
    const aCount = a[i] || 0;
    const bCount = b[i] || 0;
    if (aCount !== bCount) {
      return bCount - aCount;
    }
  }
  return 0;
};

const cloneCounts = (counts: number[]) => counts.slice();

const ensurePositionSlot = (counts: number[], position: number) => {
  while (counts.length < position) {
    counts.push(0);
  }
};

const updateCountsFromResult = (counts: number[], position: number | null) => {
  if (position === null || position <= 0) return;
  ensurePositionSlot(counts, position);
  counts[position - 1] = (counts[position - 1] || 0) + 1;
};

/**
 * Builds a timeline of position counts for multiple drivers across events.
 */
export const buildDriverPositionCountsTimeline = (
  driverAbbrs: string[],
  events: GetStandingsQuery['events'],
) => {
  const cumulative: Record<string, number[]> = {};
  const timeline: Record<string, number[][]> = {};

  driverAbbrs.forEach((abbr) => {
    if (!abbr) return;
    cumulative[abbr] = [];
    timeline[abbr] = [];
  });

  events.forEach((event) => {
    event.race_sessions?.forEach((session) => {
      session.driver_sessions?.forEach((driverSession) => {
        const abbr = driverSession.driver?.abbreviation;
        if (!abbr) return;
        const counts = cumulative[abbr] || (cumulative[abbr] = []);
        driverSession.results?.forEach((result) => {
          const position = parseInt(result?.classified_position ?? '0', 10);
          updateCountsFromResult(counts, position);
        });
      });
    });

    driverAbbrs.forEach((abbr) => {
      if (!abbr) return;
      const counts = cumulative[abbr] || [];
      timeline[abbr].push(cloneCounts(counts));
    });
  });

  return timeline;
};

/**
 * Builds a timeline of position counts for multiple constructors across events.
 */
export const buildConstructorPositionCountsTimeline = (
  constructorNames: string[],
  events: GetStandingsQuery['events'],
) => {
  const cumulative: Record<string, number[]> = {};
  const timeline: Record<string, number[][]> = {};

  constructorNames.forEach((name) => {
    if (!name) return;
    cumulative[name] = [];
    timeline[name] = [];
  });

  events.forEach((event) => {
    event.race_sessions?.forEach((session) => {
      session.driver_sessions?.forEach((driverSession) => {
        const constructorName =
          driverSession.constructorByConstructorId?.name ?? undefined;
        if (!constructorName) return;
        const counts =
          cumulative[constructorName] || (cumulative[constructorName] = []);
        driverSession.results?.forEach((result) => {
          const position = parseInt(result?.classified_position ?? '0', 10);
          updateCountsFromResult(counts, position);
        });
      });
    });

    constructorNames.forEach((name) => {
      if (!name) return;
      const counts = cumulative[name] || [];
      timeline[name].push(cloneCounts(counts));
    });
  });

  return timeline;
};
