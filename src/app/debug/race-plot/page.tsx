'use client';

import { useQuery } from '@apollo/client/react';
import { useMemo, useState } from 'react';

import {
  GET_DEBUG_ALL_EVENTS_RACE_LAPS,
  GET_SESSION_LAP_TIMES,
} from '@/lib/queries';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { DeltaToWinnerECharts, GetSessionLapTimesQuery } from './charts';

type EventRow = {
  year?: number | null;
  name?: string | null;
  round_number?: number | null;
  race_sessions: { name?: string | null; total_laps?: number | null }[];
};

export default function DebugRacePlotPage() {
  const { data: eventsData, loading: eventsLoading } = useQuery<{
    events: EventRow[];
  }>(GET_DEBUG_ALL_EVENTS_RACE_LAPS);

  const [year, setYear] = useState<number | null>(null);
  const [eventName, setEventName] = useState<string | null>(null);

  const years = useMemo(() => {
    const set = new Set(
      (eventsData?.events ?? [])
        .map((e) => e.year)
        .filter((y): y is number => y != null),
    );
    return Array.from(set).sort((a, b) => b - a);
  }, [eventsData?.events]);

  const eventsByYear = useMemo(() => {
    const map = new Map<number, EventRow[]>();
    for (const e of eventsData?.events ?? []) {
      const y = e.year;
      if (y == null) continue;
      if (!map.has(y)) map.set(y, []);
      map.get(y)!.push(e);
    }
    map.forEach((list) =>
      list.sort((a, b) => (a.round_number ?? 0) - (b.round_number ?? 0)),
    );
    return map;
  }, [eventsData?.events]);

  const selectedYear = year ?? years[0] ?? null;
  const selectedEventName = eventName ?? null;
  const eventsForYear =
    selectedYear != null ? (eventsByYear.get(selectedYear) ?? []) : [];

  const { data: raceData, loading: raceLoading } =
    useQuery<GetSessionLapTimesQuery>(GET_SESSION_LAP_TIMES, {
      variables: {
        year: selectedYear ?? 0,
        event: selectedEventName ?? '',
        session: 'Race',
      },
      skip: selectedYear == null || !selectedEventName,
    });

  return (
    <div className='container mx-auto space-y-4 p-4'>
      <div>
        <h1 className='text-xl font-semibold'>Race plot (debug)</h1>
        <p className='text-muted-foreground text-sm'>
          Select year and event to show the race gap plot for the{' '}
          <strong>Race</strong> session only.
        </p>
      </div>

      <div className='flex flex-wrap items-end gap-4'>
        <div className='space-y-2'>
          <Label>Year</Label>
          <Select
            value={selectedYear != null ? String(selectedYear) : ''}
            onValueChange={(v) => {
              setYear(v ? Number(v) : null);
              setEventName(null);
            }}
            disabled={eventsLoading}
          >
            <SelectTrigger className='w-28'>
              <SelectValue placeholder='Year' />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label>Event</Label>
          <Select
            value={selectedEventName ?? ''}
            onValueChange={(v) => setEventName(v || null)}
            disabled={eventsLoading || eventsForYear.length === 0}
          >
            <SelectTrigger className='w-48'>
              <SelectValue placeholder='Event' />
            </SelectTrigger>
            <SelectContent>
              {eventsForYear.map((ev) => (
                <SelectItem
                  key={`${ev.year}-${ev.round_number}-${ev.name}`}
                  value={ev.name ?? ''}
                >
                  {ev.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {raceLoading && selectedYear != null && selectedEventName && (
        <p className='text-muted-foreground text-sm'>Loading race data…</p>
      )}

      {selectedYear != null && selectedEventName && (
        <div className='space-y-8'>
          <DeltaToWinnerECharts data={raceData} loading={raceLoading} />
        </div>
      )}

      {!raceLoading &&
        selectedYear != null &&
        selectedEventName &&
        (!raceData?.sessions || raceData.sessions.length === 0) && (
          <div className='text-muted-foreground flex h-48 items-center justify-center rounded border border-dashed'>
            No race session data for this event.
          </div>
        )}
    </div>
  );
}
