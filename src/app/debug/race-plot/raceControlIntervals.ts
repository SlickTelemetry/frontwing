import {
  Race_Control_Messages_Categories_Enum,
  Race_Control_Messages_Flags_Enum,
} from '@/types/graphql';

/** Subset of race control row used by the race plot (matches GetSessionLapTimesQuery). */
export type RaceControlMessageRow = {
  category?: Race_Control_Messages_Categories_Enum | null;
  flag?: Race_Control_Messages_Flags_Enum | null;
  message?: string | null;
  status?: string | null;
  lap?: number | null;
};

function upper(msg: string | null | undefined): string {
  return (msg ?? '').toUpperCase();
}

/** VSC phrasing: full “virtual safety car” or abbreviated “VSC” as a word (not “SC” alone). */
function hasVscContext(u: string): boolean {
  return u.includes('VIRTUAL SAFETY CAR') || /\bVSC\b/.test(u);
}

/** Full “safety car” or abbreviated “SC” as a word; excludes VSC lines. */
function hasScContext(u: string): boolean {
  if (hasVscContext(u)) return false;
  return u.includes('SAFETY CAR') || /\bSC\b/.test(u);
}

function isRedFlag(m: RaceControlMessageRow): boolean {
  return m.flag === Race_Control_Messages_Flags_Enum.Red;
}

function isVscStart(m: RaceControlMessageRow): boolean {
  if (m.category !== Race_Control_Messages_Categories_Enum.SafetyCar)
    return false;
  const u = upper(m.message);
  if (!hasVscContext(u)) return false;
  return u.includes('DEPLOYED');
}

function isVscEnd(m: RaceControlMessageRow): boolean {
  if (m.category !== Race_Control_Messages_Categories_Enum.SafetyCar)
    return false;
  const u = upper(m.message);
  if (!hasVscContext(u)) return false;
  return u.includes('ENDING') || u.includes('IN THIS LAP');
}

function isScStart(m: RaceControlMessageRow): boolean {
  if (m.category !== Race_Control_Messages_Categories_Enum.SafetyCar)
    return false;
  const u = upper(m.message);
  if (hasVscContext(u) || u.includes('VIRTUAL')) return false;
  return hasScContext(u) && u.includes('DEPLOYED');
}

function isScEnd(m: RaceControlMessageRow): boolean {
  if (m.category !== Race_Control_Messages_Categories_Enum.SafetyCar)
    return false;
  const u = upper(m.message);
  if (hasVscContext(u) || u.includes('VIRTUAL')) return false;
  if (!(u.includes('ENDING') || u.includes('IN THIS LAP'))) return false;
  return hasScContext(u);
}

export type RaceControlBands = {
  vscBands: [number, number][];
  scBands: [number, number][];
  redFlagLaps: number[];
};

/** Chart x-axis band start for SC: deploy lap minus 1 (floor 0). */
function chartScBandStart(deployLap: number): number {
  return Math.max(0, deployLap - 1);
}

/**
 * Chart x-axis band start for VSC: deploy − 2 when deploy and end laps match, else deploy − 1.
 */
function chartVscBandStart(deployLap: number, endLap: number): number {
  const delta = deployLap === endLap ? 2 : 1;
  return Math.max(0, deployLap - delta);
}

/**
 * Derives VSC/SC lap bands and red-flag laps from time-ordered race control messages.
 * Red flags close any active VSC/SC at the red-flag lap.
 */
export function buildRaceControlBands(
  messages: RaceControlMessageRow[] | null | undefined,
): RaceControlBands {
  const vscBands: [number, number][] = [];
  const scBands: [number, number][] = [];
  const redFlagSet = new Set<number>();

  if (!messages?.length) {
    return { vscBands, scBands, redFlagLaps: [] };
  }

  let openVsc: number | null = null;
  let openSc: number | null = null;

  for (const m of messages) {
    const lap = m.lap;
    if (lap == null) continue;

    if (isRedFlag(m)) {
      if (openVsc != null) {
        vscBands.push([chartVscBandStart(openVsc, lap), lap]);
        openVsc = null;
      }
      if (openSc != null) {
        scBands.push([chartScBandStart(openSc), lap]);
        openSc = null;
      }
      redFlagSet.add(lap);
      continue;
    }

    if (isVscStart(m)) {
      openVsc = lap;
      continue;
    }
    if (isVscEnd(m)) {
      if (openVsc != null) {
        vscBands.push([chartVscBandStart(openVsc, lap), lap]);
        openVsc = null;
      }
      continue;
    }
    if (isScStart(m)) {
      openSc = lap;
      continue;
    }
    if (isScEnd(m)) {
      if (openSc != null) {
        scBands.push([chartScBandStart(openSc), lap]);
        openSc = null;
      }
    }
  }

  const validBand = ([a, b]: [number, number]) => a <= b;

  return {
    vscBands: vscBands.filter(validBand),
    scBands: scBands.filter(validBand),
    redFlagLaps: Array.from(redFlagSet).sort((a, b) => a - b),
  };
}
