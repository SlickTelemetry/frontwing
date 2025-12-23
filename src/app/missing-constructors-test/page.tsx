'use client';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const GET_DRIVERS_WITH_CONSTRUCTORS = gql(`
  query GetDriversWithConstructors {
    drivers(where: { year: { _gte: 2018 } }, order_by: { full_name: asc }) {
      full_name
      number
      country_code
      year
      driver_sessions(order_by: { session: { event: { year: desc }, name: asc } }) {
        constructorByConstructorId {
          name
        }
        session {
          name
          date
          event {
            year
            round_number
            name
            location
            country
          }
        }
      }
    }
  }
`);

interface DriverSessionGroup {
  season: number;
  sessions: SessionGroup[];
}

interface SessionGroup {
  sessionName: string;
  eventName: string;
  eventRound: number;
  eventYear: number;
  date: string | null;
  drivers: DriverSessionRecord[];
}

interface DriverSessionRecord {
  driverName: string;
  driverNumber: number | null;
  countryCode: string | null;
}

export default function MissingConstructorsTestPage() {
  const [selectedSession, setSelectedSession] = useState<SessionGroup | null>(
    null,
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, loading, error } = useQuery<any>(GET_DRIVERS_WITH_CONSTRUCTORS);

  if (loading) {
    return (
      <div className='container mx-auto p-8'>
        <h1 className='mb-8 text-4xl font-extrabold'>
          Loading drivers with missing constructors...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto p-8'>
        <h1 className='mb-8 text-4xl font-extrabold'>Error loading data</h1>
        <p className='text-red-500'>{error.message}</p>
      </div>
    );
  }

  // Group data by season -> event -> session -> drivers
  const seasonMap = new Map<number, DriverSessionGroup>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (data?.drivers || []).forEach((driver: any) => {
    const driverName = driver.full_name || 'Unknown';
    const driverNumber = driver.number || null;
    const countryCode = driver.country_code || null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (driver.driver_sessions || []).forEach((ds: any) => {
      // only consider sessions that have an event/year
      const season = ds.session?.event?.year;
      const sessionName = ds.session?.name;
      const eventName = ds.session?.event?.name;
      const eventRound = ds.session?.event?.round_number;
      const date = ds.session?.date;

      // constructor present => skip (we're looking for missing constructors in code)
      const hasConstructor = !!ds.constructorByConstructorId?.name;
      if (hasConstructor) return;

      if (!season || !sessionName || !eventName || eventRound === null) return;

      if (!seasonMap.has(season)) {
        seasonMap.set(season, {
          season,
          sessions: [],
        });
      }

      const seasonGroup = seasonMap.get(season)!;
      let sessionGroup = seasonGroup.sessions.find(
        (s) =>
          s.sessionName === sessionName &&
          s.eventName === eventName &&
          s.eventRound === eventRound,
      );

      if (!sessionGroup) {
        sessionGroup = {
          sessionName,
          eventName,
          eventRound,
          eventYear: season,
          date: date || null,
          drivers: [],
        };
        seasonGroup.sessions.push(sessionGroup);
      }

      sessionGroup.drivers.push({
        driverName,
        driverNumber,
        countryCode,
      });
    });
  });

  const sortedSeasons = Array.from(seasonMap.values())
    .sort((a, b) => b.season - a.season)
    .map((group) => ({
      ...group,
      sessions: group.sessions.sort(
        (a, b) =>
          b.eventRound - a.eventRound ||
          a.sessionName.localeCompare(b.sessionName),
      ),
    }));

  const totalCount = Array.from(seasonMap.values()).reduce(
    (sum, g) => sum + g.sessions.reduce((s2, ss) => s2 + ss.drivers.length, 0),
    0,
  );

  return (
    <>
      <div className='bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 border-b backdrop-blur'>
        <div className='container mx-auto px-8 py-4'>
          <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
            <div>
              <h1 className='text-4xl font-extrabold'>
                Missing Constructors Test
              </h1>
              <p className='text-muted-foreground mt-2'>
                Showing {totalCount} driver session entries with null/missing
                constructors
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto p-8'>
        {sortedSeasons.length === 0 ? (
          <div className='bg-card rounded-lg border p-8 text-center'>
            <p className='text-muted-foreground text-lg'>
              No drivers with missing constructors found. Great job! 🎉
            </p>
          </div>
        ) : (
          <Tabs
            defaultValue={sortedSeasons[0]?.season.toString()}
            className='w-full'
          >
            <TabsList className='mb-6 grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
              {sortedSeasons.map((group) => (
                <TabsTrigger key={group.season} value={group.season.toString()}>
                  {group.season}
                  <Badge variant='secondary' className='ml-2'>
                    {group.sessions.reduce(
                      (sum, s) => sum + s.drivers.length,
                      0,
                    )}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            {sortedSeasons.map((group) => (
              <TabsContent key={group.season} value={group.season.toString()}>
                <div className='space-y-6'>
                  {group.sessions.map((session, idx) => (
                    <div
                      key={`${group.season}-${session.eventRound}-${session.sessionName}-${idx}`}
                      className='bg-card rounded-lg border p-6'
                    >
                      <div className='mb-4 flex items-start justify-between'>
                        <div>
                          <h3 className='text-xl font-bold'>
                            {session.eventRound}. {session.eventName}
                          </h3>
                          <p className='text-muted-foreground text-sm'>
                            {session.sessionName}
                            {session.date && (
                              <>
                                {' '}
                                • {new Date(session.date).toLocaleDateString()}
                              </>
                            )}
                          </p>
                        </div>
                        <Badge variant='outline'>
                          {session.drivers.length} drivers
                        </Badge>
                      </div>

                      <div className='grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                        {session.drivers.map((driver, idx) => (
                          <button
                            key={`driver-${idx}`}
                            onClick={() => setSelectedSession(session)}
                            className='bg-background hover:bg-muted/50 rounded-md border p-3 text-left transition-colors'
                          >
                            <div className='flex items-baseline gap-2'>
                              {driver.driverNumber !== null && (
                                <span className='text-muted-foreground font-mono text-xs'>
                                  #{driver.driverNumber}
                                </span>
                              )}
                              <p className='font-semibold'>
                                {driver.driverName}
                              </p>
                            </div>
                            {driver.countryCode && (
                              <p className='text-muted-foreground text-xs uppercase'>
                                {driver.countryCode}
                              </p>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>

      <Dialog
        open={selectedSession !== null}
        onOpenChange={(open) => !open && setSelectedSession(null)}
      >
        <DialogContent className='max-w-2xl'>
          {selectedSession && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selectedSession.eventRound}. {selectedSession.eventName}
                </DialogTitle>
                <DialogDescription>
                  {selectedSession.sessionName} • {selectedSession.eventYear}
                  {selectedSession.date && (
                    <>
                      {' '}
                      • {new Date(selectedSession.date).toLocaleDateString()}
                    </>
                  )}
                </DialogDescription>
              </DialogHeader>

              <div className='max-h-96 space-y-3 overflow-y-auto'>
                {selectedSession.drivers.map((driver, idx) => (
                  <div
                    key={`session-driver-${idx}`}
                    className='bg-muted/30 rounded-md border p-4'
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-baseline gap-3'>
                        {driver.driverNumber !== null && (
                          <span className='text-muted-foreground font-mono text-sm'>
                            #{driver.driverNumber}
                          </span>
                        )}
                        <p className='font-semibold'>{driver.driverName}</p>
                      </div>
                      <div className='flex gap-2'>
                        {driver.countryCode && (
                          <Badge variant='secondary'>
                            {driver.countryCode}
                          </Badge>
                        )}
                        <Badge variant='destructive'>No Constructor</Badge>
                      </div>
                    </div>
                    <p className='text-muted-foreground mt-2 text-xs'>
                      Driver: {driver.driverName}
                      {driver.driverNumber && ` • #${driver.driverNumber}`}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
