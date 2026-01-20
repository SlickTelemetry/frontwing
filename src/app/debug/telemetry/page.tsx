'use client';

import { useQuery } from '@apollo/client/react';
import { useState } from 'react';

import {
  GET_DEBUG_DRIVER_LAPS,
  GET_DEBUG_LAP_TELEMETRY,
  GET_DEBUG_SESSION_DRIVERS,
} from '@/lib/queries';

import { Session_Name_Choices_Enum } from '@/types/graphql';

type DebugDriverSession = {
  driver_id?: string | null;
  session_id?: string | null;
  driver?: {
    abbreviation?: string | null;
    full_name?: string | null;
    number?: number | null;
  } | null;
};

type DebugLap = {
  lap_number?: number | null;
  lap_time?: number | null;
};

type DebugTelemetryPoint = {
  time?: number | null;
  session_time?: number | null;
  speed?: number | null;
  gear?: number | null;
  rpm?: number | null;
  throttle?: number | null;
  brake?: boolean | null;
};

export default function DebugTelemetryPage() {
  const [selectedDriver, setSelectedDriver] = useState<{
    driverId: string;
    sessionId: string;
  } | null>(null);
  const [selectedLapNumber, setSelectedLapNumber] = useState<number | null>(
    null,
  );

  const {
    data: driversData,
    loading: driversLoading,
    error: driversError,
  } = useQuery<{ sessions: { driver_sessions: DebugDriverSession[] }[] }>(
    GET_DEBUG_SESSION_DRIVERS,
    {
      variables: {
        year: 2025,
        round: 22,
        session: Session_Name_Choices_Enum.Race,
      },
    },
  );

  const {
    data: lapsData,
    loading: lapsLoading,
    error: lapsError,
  } = useQuery<{ driver_sessions: { laps: DebugLap[] }[] }>(
    GET_DEBUG_DRIVER_LAPS,
    {
      variables: {
        driverId: selectedDriver?.driverId ?? '',
        sessionId: selectedDriver?.sessionId ?? '',
      },
      skip: !selectedDriver,
    },
  );

  const {
    data: telemetryData,
    loading: telemetryLoading,
    error: telemetryError,
  } = useQuery<{
    laps: { telemetries: DebugTelemetryPoint[] }[];
  }>(GET_DEBUG_LAP_TELEMETRY, {
    variables: {
      driverId: selectedDriver?.driverId ?? '',
      sessionId: selectedDriver?.sessionId ?? '',
      lapNumber: selectedLapNumber ?? 0,
    },
    skip: !selectedDriver || selectedLapNumber == null,
  });

  const session = driversData?.sessions?.[0];
  const drivers = session?.driver_sessions ?? [];
  const laps = lapsData?.driver_sessions?.[0]?.laps ?? [];
  const telemetryPoints = telemetryData?.laps?.[0]?.telemetries ?? [];

  return (
    <div className='space-y-4 p-4'>
      <div>
        <h1 className='text-xl font-semibold'>Debug Telemetry</h1>
        <p className='text-muted-foreground text-sm'>
          2025 – Round 22 (Las Vegas Grand Prix) – Race
        </p>
      </div>

      <div className='grid gap-4 lg:grid-cols-2'>
        <section className='space-y-2'>
          <h2 className='text-muted-foreground text-sm font-medium uppercase'>
            Drivers
          </h2>
          {driversLoading && (
            <p className='text-muted-foreground text-sm'>Loading drivers…</p>
          )}
          {driversError && (
            <p className='text-sm text-red-500'>
              Failed to load drivers: {driversError.message}
            </p>
          )}
          <div className='max-h-[60vh] space-y-1 overflow-auto rounded-md border p-2'>
            {drivers.map((ds) => (
              <button
                key={`${ds.driver_id ?? 'unknown'}:${ds.session_id ?? 'unknown'}`}
                type='button'
                onClick={() => {
                  const driverId = ds.driver_id;
                  const sessionId = ds.session_id;
                  if (!driverId || !sessionId) return;
                  setSelectedDriver({ driverId, sessionId });
                  setSelectedLapNumber(null);
                }}
                className={`hover:bg-accent flex w-full items-center justify-between rounded px-2 py-1 text-left text-sm ${
                  selectedDriver?.driverId === ds.driver_id &&
                  selectedDriver?.sessionId === ds.session_id
                    ? 'bg-accent'
                    : ''
                }`}
              >
                <span>
                  <span className='font-medium'>{ds.driver?.abbreviation}</span>{' '}
                  {ds.driver?.full_name}
                </span>
                <span className='text-muted-foreground text-xs'>
                  #{ds.driver?.number}
                </span>
              </button>
            ))}
            {drivers.length === 0 && !driversLoading && !driversError && (
              <p className='text-muted-foreground text-sm'>
                No drivers found for this session.
              </p>
            )}
          </div>
        </section>

        <section className='space-y-2'>
          <h2 className='text-muted-foreground text-sm font-medium uppercase'>
            Laps
          </h2>
          {!selectedDriver && (
            <p className='text-muted-foreground text-sm'>
              Select a driver to see their laps.
            </p>
          )}
          {lapsLoading && (
            <p className='text-muted-foreground text-sm'>Loading laps…</p>
          )}
          {lapsError && (
            <p className='text-sm text-red-500'>
              Failed to load laps: {lapsError.message}
            </p>
          )}
          <div className='max-h-[60vh] space-y-1 overflow-auto rounded-md border p-2'>
            {laps.map((lap) => (
              <button
                key={lap.lap_number ?? 'unknown'}
                type='button'
                onClick={() => {
                  if (lap.lap_number == null) return;
                  setSelectedLapNumber(lap.lap_number);
                }}
                className={`hover:bg-accent flex w-full items-center justify-between rounded px-2 py-1 text-left text-sm ${
                  selectedLapNumber === lap.lap_number ? 'bg-accent' : ''
                }`}
              >
                <span className='font-medium'>Lap {lap.lap_number}</span>
                <span className='text-muted-foreground text-xs'>
                  {lap.lap_time} ms
                </span>
              </button>
            ))}
            {laps.length === 0 &&
              selectedDriver &&
              !lapsLoading &&
              !lapsError && (
                <p className='text-muted-foreground text-sm'>
                  No laps found for this driver.
                </p>
              )}
          </div>
        </section>
      </div>

      <section className='space-y-2'>
        <h2 className='text-muted-foreground text-sm font-medium uppercase'>
          Telemetry (selected lap)
        </h2>
        {selectedLapNumber == null && (
          <p className='text-muted-foreground text-sm'>
            Select a lap to see telemetry points.
          </p>
        )}
        {telemetryLoading && (
          <p className='text-muted-foreground text-sm'>Loading telemetry…</p>
        )}
        {telemetryError && (
          <p className='text-sm text-red-500'>
            Failed to load telemetry: {telemetryError.message}
          </p>
        )}
        <div className='max-h-[60vh] overflow-auto rounded-md border p-2 text-xs'>
          {telemetryPoints.map((t) => (
            <div
              key={`${t.session_time ?? ''}:${t.time ?? ''}:${t.speed ?? ''}`}
              className='border-border grid grid-cols-6 gap-2 border-b py-1 last:border-b-0'
            >
              <span className='font-mono'>
                t={t.time?.toFixed?.(3) ?? t.time}
              </span>
              <span>speed = {t.speed}</span>
              <span>gear = {t.gear}</span>
              <span>rpm = {t.rpm}</span>
              <span>throttle = {t.throttle}</span>
              <span>
                brake = {t.brake == null ? 'n/a' : t.brake ? 'true' : 'false'}
              </span>
            </div>
          ))}
          {telemetryPoints.length === 0 &&
            selectedLapNumber != null &&
            !telemetryLoading &&
            !telemetryError && (
              <p className='text-muted-foreground text-sm'>
                No telemetry points found for this lap.
              </p>
            )}
        </div>
      </section>
    </div>
  );
}
