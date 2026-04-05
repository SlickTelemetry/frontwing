function cumulativeTimesMs(lapTimes: number[]): number[] {
  return lapTimes.reduce((acc: number[], curr: number) => {
    const prev = acc.length > 0 ? acc[acc.length - 1] : 0;
    acc.push(prev + curr);
    return acc;
  }, []);
}

/**
 * Min cumulative race time per racing lap (ms), same length as lap count.
 */
function leaderCumMinPerLap(
  sortedDrivers: string[],
  cumulativeByDriver: Map<string, number[]>,
  maxLaps: number,
): number[] {
  const leaderCum: number[] = [];
  for (let i = 0; i < maxLaps; i++) {
    let minC = Infinity;
    for (const abbr of sortedDrivers) {
      const cum = cumulativeByDriver.get(abbr);
      if (cum == null || i >= cum.length) continue;
      const v = cum[i];
      if (v !== undefined && !Number.isNaN(v)) minC = Math.min(minC, v);
    }
    leaderCum.push(minC === Infinity ? NaN : minC);
  }
  return leaderCum;
}

function leaderCumWithLapZero(leaderCumRacing: number[]): number[] {
  return [0, ...leaderCumRacing];
}

export function computeLeaderShadowData(
  sortedDrivers: string[],
  lapTimesByDriver: Map<string, number[]>,
  cumulativeMedians: number[],
  maxLaps: number,
  negativeCutoff: number,
): [number, number][] {
  if (maxLaps < 1) return [];

  const cumulativeByDriver = new Map<string, number[]>();
  for (const abbr of sortedDrivers) {
    const lt = lapTimesByDriver.get(abbr) || [];
    cumulativeByDriver.set(abbr, cumulativeTimesMs(lt));
  }

  const leaderCumRacing = leaderCumMinPerLap(
    sortedDrivers,
    cumulativeByDriver,
    maxLaps,
  );
  const leaderCumExt = leaderCumWithLapZero(leaderCumRacing);

  const points: [number, number][] = [];

  // k = lap index (0 = synthetic, 1.. = racing laps)
  for (let k = 0; k < maxLaps; k++) {
    const lc0 = leaderCumExt[k];
    const lc1 = leaderCumExt[k + 1];
    if (!Number.isFinite(lc0) || !Number.isFinite(lc1)) continue;

    const leaderTimesSec = (lc1 - lc0) / 1000;

    let leaderLine: number;
    if (k === 0) {
      leaderLine = 0;
    } else {
      const lapIdx = k - 1;
      let maxG = -Infinity;
      for (const abbr of sortedDrivers) {
        const cum = cumulativeByDriver.get(abbr);
        if (cum == null || lapIdx >= cum.length) continue;
        const medianTime = cumulativeMedians[lapIdx] ?? 0;
        const rawSec = -(cum[lapIdx] - medianTime) / 1000;
        if (!Number.isNaN(rawSec)) maxG = Math.max(maxG, rawSec);
      }
      if (maxG === -Infinity) continue;
      leaderLine = maxG;
    }

    const upper = Math.max(leaderLine - leaderTimesSec, negativeCutoff);
    points.push([k, upper]);
  }

  return points;
}
