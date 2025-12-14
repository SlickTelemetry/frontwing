import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { SPRINT_EVENT_FORMATS } from '@/lib/constants';

import {
  Event_Format_Choices_Enum,
  EventCompetitionResultsFragment,
  EventPracticeResultsFragment,
  EventQualifyingResultsFragment,
} from '@/types/graphql';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get midnight of current day
// eg: today is sat, return sat 00:00/12:00AM
export const getTodayMidnightUTC = () => {
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0); // Set to midnight UTC
  return now.toISOString(); // Convert to ISO 8601 format
};

export const isFutureDate = (date?: string | null) => {
  if (!date) return false;
  return new Date(getTodayMidnightUTC()).getTime() <= new Date(date).getTime();
};

export function shouldHideResults(date?: string | null): boolean {
  // Default to hiding results better safe than spoiled
  if (!date) return true;
  const eventDate = new Date(date);
  const timeThreshold = new Date(eventDate.getTime() + 2 * 24 * 60 * 60 * 1000);

  return new Date() < timeThreshold;
}

const mapColors = {
  past: '#28a745',
  future: '#5279BA',
};
/**
 * @description Get designated map color
 * @param {(string | null)} [date]
 * @return {string} value of mapColor
 */
export const getColor = (date?: string | null): string => {
  const futureDate = isFutureDate(date);
  return mapColors[futureDate ? 'future' : 'past'];
};

/**
 * @description converts hexCode to rgba used for background gradients
 * @param {string} hex
 * @param {number} opacity
 * @return {*}
 */
export const hexToRgba = (hex: string, opacity: number) => {
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r},${g},${b},${opacity})`;
};

/**
 * @description Return value for default background gradient
 * @param {string} color
 */
export const bgGradient = (color: string) =>
  `linear-gradient(to top left, ${hexToRgba(color, 0.8)}, ${hexToRgba(color, 0)})`;

export function isAllEmptyArrays(o: { [key: string]: unknown }) {
  return Object.values(o).every((v) => Array.isArray(v) && v.length === 0);
}

/**
 * @description Take a position value and returns position end
 * @param {(number | string)} position
 * @return {('st' | 'nd' | 'rd' | 'th')}
 */
export const positionEnding = (position: number | string) => {
  // Convert to int
  position = typeof position === 'string' ? parseInt(position) : position;
  // Format
  if ([1, 21].includes(position)) return 'st';
  else if ([2, 22].includes(position)) return 'nd';
  else if ([3, 23].includes(position)) return 'rd';
  else return 'th';
};

export const positionDisplay = (position: string | number) => {
  const map: Record<string, string> = {
    R: 'Retired',
    D: 'Disqualified',
    E: 'Excluded',
    W: 'Withdrawn',
    F: 'Failed to Qualify',
    N: 'Not Classified',
  };
  // If position is a number or a string that can be converted to a number, show the number
  if (!isNaN(Number(position))) {
    return position + positionEnding(position);
  }
  // Otherwise, show the mapped value or the original string
  return map[String(position)] || position;
};

// Migrate to use event name
// Remove grand prix
// trim spaces
// Replace spaces with underscores
// Lowercase all characters
export const eventLocationEncode = (location?: string | null) =>
  !location
    ? null
    : location.replace('Grand Prix', 'gp').replace(/ /g, '_').toLowerCase();

export const eventLocationDecode = (location?: string | null) => {
  if (!location) {
    return '';
  }

  const decodedLocation = location
    .replace('gp', 'Grand Prix')
    .replace(/-|_/g, ' ')
    .replace(/(^|_|\s)\w/g, (match) => match.toUpperCase());

  // https://slicktelemetry.youtrack.cloud/issue/FRON-170
  // Handle the specific Spa-Francorchamps case
  if (decodedLocation === 'Spa Francorchamps') {
    return 'Spa-Francorchamps';
  }

  return decodedLocation;
};

export const sessionDecode = (location?: string) => {
  if (!location) {
    return '';
  }

  return location
    .replace(/-/g, ' ')
    .replace(/(^|_|\s)\w/g, (match) => match.toUpperCase());
};

export const findSessionType = (sessionName: string) => {
  switch (sessionName) {
    case 'Sprint_Shootout':
    case 'Sprint_Qualifying':
    case 'Qualifying':
      return 'qualifying';

    case 'Practice_1':
    case 'Practice_2':
    case 'Practice_3':
      return 'practice';

    case 'Sprint':
    case 'Race':
      return 'competition';

    default:
      return 'unknown';
  }
};

export const formatLapTime = (time?: string | number | bigint | null) => {
  if (typeof time === 'string') time = parseInt(time);
  if (!time) return time;
  const date = new Date(Number(time));
  const iso = date.toISOString();
  // Convert to numbers to remove leading zeros, but pad seconds/minutes if needed
  const hours = Number(iso.slice(11, 13));
  const minutes = Number(iso.slice(14, 16));
  const seconds = Number(iso.slice(17, 19));
  const millis = iso.slice(19, -1); // .sss

  // Helper to pad with zero if needed
  const pad = (n: number) => n.toString().padStart(2, '0');

  if (hours === 0 && minutes === 0) {
    return `${seconds}${millis}`;
  }
  if (hours === 0) {
    return `${minutes}:${pad(seconds)}${millis}`;
  }
  return `${hours}:${pad(minutes)}:${pad(seconds)}${millis}`;
};

export const sortFastestLaps = (
  sessions:
    | EventCompetitionResultsFragment['competition_sessions']
    | EventPracticeResultsFragment['practice_sessions'],
) => {
  return sessions
    ?.filter((driver) => {
      return (
        driver?.fastest_lap?.length !== 0 && !!driver.fastest_lap?.[0].lap_time
      );
    })
    .sort((a, b) => {
      return (
        Number(a.fastest_lap[0]?.lap_time || 0) -
        Number(b.fastest_lap[0]?.lap_time || 0)
      );
    });
};

export const sortQuali = (
  sessions: EventQualifyingResultsFragment['qualifying_session'],
) => {
  return sessions
    .filter((driver) => !!driver.results[0]?.finishing_position)
    .sort((a, b) => {
      return (
        Number(a.results[0]?.finishing_position || 0) -
        Number(b.results[0]?.finishing_position || 0)
      );
    });
};

export const isSprintFormat = (
  format?: Event_Format_Choices_Enum | null,
): boolean => {
  if (!format) return false;
  return SPRINT_EVENT_FORMATS.includes(format);
};
