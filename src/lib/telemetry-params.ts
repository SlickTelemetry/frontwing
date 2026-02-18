/**
 * Telemetry URL parameter utilities for serializing/deserializing active drivers
 * Format: ?f=ALB-2024-Monaco-Race.1.2.3~OCO-2024-Monaco-Race.4.5
 * Uses only URL-safe characters: - (driver info separator), . (lap separator), ~ (driver separator)
 */

export interface SerializedDriver {
  driver: string;
  season: number;
  event?: string | null;
  session?: string;
  laps: number[];
}

/**
 * Serialize active drivers to URL parameter format
 * Format: driver-season-event-session.lap1.lap2.lap3~driver2-season2-event2-session2.lap1.lap2
 * Uses dots as lap separators and tilde as driver separators (URL-safe, no encoding needed)
 */
export function serializeDrivers(drivers: SerializedDriver[]): string {
  if (!drivers.length) return '';

  return drivers
    .map((driverItem) => {
      const driverKey = [
        driverItem.driver,
        driverItem.season,
        driverItem.session || '',
        driverItem.event || '',
      ]
        .filter((v) => v !== '')
        .join('-');
      const lapsStr = driverItem.laps.sort((a, b) => a - b).join('.');
      return `${driverKey}.${lapsStr}`;
    })
    .join('~');
}

/**
 * Deserialize URL parameter to active drivers
 * Handles format: ALB-2024-Monaco-Race.1.2.3~OCO-2024-Monaco-Race.4.5
 */
export function deserializeDrivers(paramValue: string): SerializedDriver[] {
  if (!paramValue) return [];

  return paramValue
    .split('~')
    .map((driverStr) => {
      // Split by the last dot to separate driver key from laps
      // This handles cases where event/session might contain dots
      const dotIndex = driverStr.indexOf('.');
      if (dotIndex === -1) return null;

      const driverPart = driverStr.substring(0, dotIndex);
      const lapsStr = driverStr.substring(dotIndex + 1);
      const parts = driverPart.split('-');

      // Handle cases where event/session might contain hyphens
      // Minimum: abbreviation-season
      if (parts.length < 2) return null;

      const driver = parts[0];
      const season = parseInt(parts[1], 10);

      // Remaining parts are event and session (event might have hyphens)
      const session = parts[2] || undefined;
      const event = parts[3] || undefined;

      const laps = lapsStr
        ? lapsStr
            .split('.')
            .map((lap) => parseInt(lap, 10))
            .filter((lap) => !isNaN(lap))
        : [];

      return {
        driver,
        season,
        event,
        session,
        laps,
      };
    })
    .filter((driver) => driver !== null);
}

/**
 * Build URL search params with active drivers
 */
export function buildSearchParams(
  drivers: SerializedDriver[],
  existingParams?: URLSearchParams,
): URLSearchParams {
  const params = existingParams
    ? new URLSearchParams(existingParams)
    : new URLSearchParams();

  if (drivers.length > 0) {
    params.set('f', serializeDrivers(drivers));
  } else {
    params.delete('f');
  }

  return params;
}

/**
 * Get active drivers from URL search params
 */
export function getDriversFromParams(
  searchParams: URLSearchParams,
): SerializedDriver[] {
  const params =
    searchParams instanceof URLSearchParams
      ? searchParams
      : new URLSearchParams(searchParams);
  const driverParam = params.get('f');
  return driverParam ? deserializeDrivers(driverParam) : [];
}

/**
 * Toggle a lap for a specific driver in the URL search params
 * Adds or removes the lap number for the driver
 * If driver doesn't exist in params, creates a new entry with the lap
 * If driver exists but lap already selected, removes it
 * If all laps removed, removes driver from params
 */
export function toggleDriverLap(
  searchParams: URLSearchParams,
  driverAbbrv: string,
  season: number,
  session: string,
  lapNum: number,
  event?: string | null,
): URLSearchParams {
  const drivers = getDriversFromParams(searchParams);

  // Find the driver in the list
  const driverIndex = drivers.findIndex(
    (d) =>
      d.driver === driverAbbrv &&
      d.season === season &&
      d.session === session &&
      d.event === event,
  );

  if (driverIndex === -1) {
    // Driver not in params, add them with this lap
    drivers.push({
      driver: driverAbbrv,
      season,
      session,
      event,
      laps: [lapNum],
    });
  } else {
    // Driver exists, toggle lap
    const driverLaps = drivers[driverIndex].laps;
    if (driverLaps.includes(lapNum)) {
      // Remove lap
      driverLaps.splice(driverLaps.indexOf(lapNum), 1);

      // If no laps left, remove driver entirely
      if (driverLaps.length === 0) {
        drivers.splice(driverIndex, 1);
      }
    } else {
      // Add lap
      driverLaps.push(lapNum);
      driverLaps.sort((a, b) => a - b);
    }
  }

  // Update and return search params
  const params = new URLSearchParams(searchParams);
  if (drivers.length > 0) {
    params.set('f', serializeDrivers(drivers));
  } else {
    params.delete('f');
  }
  return params;
}
