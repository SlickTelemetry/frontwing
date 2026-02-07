'use client';

import { useQuery } from '@apollo/client/react';
import { useMemo } from 'react';

import { GET_DEBUG_ALL_EVENTS_RACE_LAPS } from '@/lib/queries';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type RaceSession = {
  name?: string | null;
  total_laps?: number | null;
};

type EventRow = {
  year?: number | null;
  name?: string | null;
  round_number?: number | null;
  race_sessions: RaceSession[];
};

export default function DebugEventsLapsPage() {
  const { data, loading, error } = useQuery<{ events: EventRow[] }>(
    GET_DEBUG_ALL_EVENTS_RACE_LAPS,
  );

  const events = useMemo(() => data?.events ?? [], [data?.events]);

  const years = useMemo(() => {
    const set = new Set(
      events.map((e) => e.year).filter((y): y is number => y != null),
    );
    return Array.from(set).sort((a, b) => b - a);
  }, [events]);

  const eventsByYear = useMemo(() => {
    const map = new Map<number, EventRow[]>();
    for (const event of events) {
      const y = event.year;
      if (y == null) continue;
      if (!map.has(y)) map.set(y, []);
      map.get(y)!.push(event);
    }
    map.forEach((row) => {
      row.sort(
        (a: EventRow, b: EventRow) =>
          (a.round_number ?? 0) - (b.round_number ?? 0),
      );
    });
    return map;
  }, [events]);

  return (
    <div className='space-y-4 p-4'>
      <div>
        <h1 className='text-xl font-semibold'>All events – race laps</h1>
        <p className='text-muted-foreground text-sm'>
          Every event for all years, with total laps for the race session only
          (session #5). No sprint or qualifying.
        </p>
      </div>

      {loading && (
        <p className='text-muted-foreground text-sm'>Loading events…</p>
      )}
      {error && (
        <p className='text-sm text-red-500'>Failed to load: {error.message}</p>
      )}

      {!loading && !error && years.length > 0 && (
        <Tabs defaultValue={String(years[0])} className='w-full'>
          <TabsList className='mb-2 flex-wrap gap-1'>
            {years.map((year) => (
              <TabsTrigger key={year} value={String(year)}>
                {year}
              </TabsTrigger>
            ))}
          </TabsList>
          {years.map((year) => {
            const yearEvents = eventsByYear.get(year) ?? [];
            return (
              <TabsContent key={year} value={String(year)}>
                <div className='overflow-auto rounded-md border'>
                  <table className='w-full min-w-[320px] text-sm'>
                    <thead>
                      <tr className='bg-muted/50 border-b'>
                        <th className='px-3 py-2 text-left font-medium'>
                          Round
                        </th>
                        <th className='px-3 py-2 text-left font-medium'>
                          Event
                        </th>
                        <th className='px-3 py-2 text-right font-medium'>
                          Race laps
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {yearEvents.map((event) => {
                        const raceSession = event.race_sessions?.[0];
                        const totalLaps = raceSession?.total_laps;
                        return (
                          <tr
                            key={`${event.year}-${event.round_number}-${event.name}`}
                            className='border-b last:border-b-0'
                          >
                            <td className='px-3 py-2 font-mono'>
                              {event.round_number}
                            </td>
                            <td className='px-3 py-2'>{event.name}</td>
                            <td className='px-3 py-2 text-right font-mono'>
                              {totalLaps != null ? totalLaps : '–'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      )}

      {!loading && !error && events.length === 0 && (
        <p className='text-muted-foreground text-sm'>No events found.</p>
      )}
    </div>
  );
}
