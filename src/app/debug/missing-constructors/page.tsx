'use client';

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

import { graphql } from '@/types';

const GET_DRIVERS_WITH_CONSTRUCTORS = graphql(`
  query GetDriversWithConstructors @cached {
    drivers(where: { year: { _gte: 2018 } }, order_by: { full_name: asc }) {
      full_name
      number
      country_code
      year
      driver_sessions(
        order_by: { session: { event: { year: desc }, name: asc } }
      ) {
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

  // track which seasons are expanded in the sidebar
  const [expandedSeasons, setExpandedSeasons] = useState<
    Record<number, boolean>
  >({});

  const toggleSeason = (season: number) =>
    setExpandedSeasons((prev) => ({ ...prev, [season]: !prev[season] }));

  // track which session types are expanded in the sidebar
  const [expandedSessionTypes, setExpandedSessionTypes] = useState<
    Record<string, boolean>
  >({});

  const toggleSessionType = (type: string) =>
    setExpandedSessionTypes((prev) => ({ ...prev, [type]: !prev[type] }));

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
      const sessionName = ds.session?.name.replace('_', ' ');
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

  // Calculate stats by session type
  const sessionTypeStats = new Map<string, number>();
  const sessionTypeByYear = new Map<string, Map<number, number>>();
  const sessionTypePerSeason = new Map<number, Map<string, number>>();

  sortedSeasons.forEach((season) => {
    season.sessions.forEach((session) => {
      const count = session.drivers.length;
      const sessionType = session.sessionName;

      // Total count for session type
      sessionTypeStats.set(
        sessionType,
        (sessionTypeStats.get(sessionType) || 0) + count,
      );

      // Count by year for this session type
      if (!sessionTypeByYear.has(sessionType)) {
        sessionTypeByYear.set(sessionType, new Map());
      }
      const yearMap = sessionTypeByYear.get(sessionType)!;
      yearMap.set(season.season, (yearMap.get(season.season) || 0) + count);

      // Count by session type for this specific season
      if (!sessionTypePerSeason.has(season.season)) {
        sessionTypePerSeason.set(season.season, new Map());
      }
      const perSeasonMap = sessionTypePerSeason.get(season.season)!;
      perSeasonMap.set(
        sessionType,
        (perSeasonMap.get(sessionType) || 0) + count,
      );
    });
  });

  const sortedSessionTypes = Array.from(sessionTypeStats.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([type, count]) => ({ type, count }));

  const generateSeasonJson = (season: DriverSessionGroup) => {
    const yearData: Record<
      string,
      Record<string, Record<string, Array<Record<string, string>>>>
    > = {
      [season.season.toString()]: {},
    };

    season.sessions.forEach((session) => {
      const roundKey = session.eventRound.toString();
      if (!yearData[season.season.toString()][roundKey]) {
        yearData[season.season.toString()][roundKey] = {};
      }

      yearData[season.season.toString()][roundKey][session.sessionName] =
        session.drivers.map((driver) => ({
          driver_number: driver.driverNumber?.toString() || '',
          driver_full_name: driver.driverName,
          constructor_ergast_id: '',
        }));
    });

    return JSON.stringify(yearData, null, 2);
  };

  const copyJsonToClipboard = (season: DriverSessionGroup) => {
    const json = generateSeasonJson(season);
    navigator.clipboard.writeText(json).then(() => {
      alert(`JSON for ${season.season} copied to clipboard!`);
    });
  };

  return (
    <>
      <div className='bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 border-b backdrop-blur'>
        <div className='container mx-auto px-4 py-2 sm:px-8 sm:py-4'>
          <div className='flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-4'>
            <div>
              <h1 className='text-2xl font-extrabold sm:text-4xl'>
                Missing Constructors Test
              </h1>
              <p className='text-muted-foreground mt-1 text-xs sm:mt-2 sm:text-sm'>
                Showing {totalCount} driver session entries with null/missing
                constructors
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto p-8'>
        <div className='grid gap-8 lg:grid-cols-4'>
          {/* Main content */}
          <div className='lg:col-span-3'>
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
                <div className='bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-20 z-40 -mx-8 mb-12 px-8 py-3 backdrop-blur'>
                  <TabsList className='grid h-auto w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                    {sortedSeasons.map((group) => (
                      <TabsTrigger
                        key={group.season}
                        value={group.season.toString()}
                      >
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
                </div>

                {sortedSeasons.map((group) => (
                  <TabsContent
                    key={group.season}
                    value={group.season.toString()}
                  >
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
                                    •{' '}
                                    {new Date(
                                      session.date,
                                    ).toLocaleDateString()}
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

          {/* Stats Sidebar */}
          {sortedSeasons.length > 0 && (
            <div className='lg:col-span-1'>
              <div className='sticky top-24 h-[calc(100vh-200px)] overflow-y-auto'>
                <div className='bg-card rounded-lg border p-6'>
                  <h2 className='mb-4 text-lg font-bold'>Quick Stats</h2>
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between'>
                      <span className='text-muted-foreground text-sm'>
                        Total Missing
                      </span>
                      <span className='text-lg font-bold'>{totalCount}</span>
                    </div>
                    <div className='border-t pt-3' />
                    <div className='flex items-center justify-between'>
                      <span className='text-muted-foreground text-sm'>
                        Seasons Affected
                      </span>
                      <span className='text-lg font-bold'>
                        {sortedSeasons.length}
                      </span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-muted-foreground text-sm'>
                        Total Events
                      </span>
                      <span className='text-lg font-bold'>
                        {sortedSeasons.reduce(
                          (sum, s) => sum + s.sessions.length,
                          0,
                        )}
                      </span>
                    </div>
                    <div className='border-t pt-3' />
                    <div>
                      <span className='text-muted-foreground text-xs font-semibold'>
                        BY SESSION TYPE
                      </span>
                      <div className='mt-2 space-y-1'>
                        {sortedSessionTypes.map(({ type, count }) => (
                          <div
                            key={type}
                            className='flex items-center justify-between text-sm'
                          >
                            <span className='text-muted-foreground'>
                              {type}
                            </span>
                            <span className='font-semibold'>{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className='border-t pt-3' />
                    <div>
                      <span className='text-muted-foreground text-xs font-semibold'>
                        BY SEASON
                      </span>
                      <div className='mt-2 space-y-1'>
                        {sortedSeasons.map((season) => {
                          const perSeason = sessionTypePerSeason.get(
                            season.season,
                          );
                          const seasonTotal = season.sessions.reduce(
                            (sum, s) => sum + s.drivers.length,
                            0,
                          );

                          return (
                            <div key={season.season} className='pb-2'>
                              <div className='flex items-center justify-between text-sm'>
                                <button
                                  type='button'
                                  onClick={() => toggleSeason(season.season)}
                                  className='flex items-center gap-2'
                                  aria-expanded={
                                    !!expandedSeasons[season.season]
                                  }
                                >
                                  <span className='text-muted-foreground'>
                                    {expandedSeasons[season.season] ? '▾' : '▸'}
                                  </span>
                                  <span className='text-muted-foreground'>
                                    {season.season}
                                  </span>
                                </button>
                                <div className='flex items-center gap-2'>
                                  <span className='font-semibold'>
                                    {seasonTotal}
                                  </span>
                                  <button
                                    type='button'
                                    onClick={() => copyJsonToClipboard(season)}
                                    className='hover:bg-secondary rounded px-2 py-1 text-xs font-medium text-white'
                                    title='Copy JSON for this season'
                                  >
                                    JSON
                                  </button>
                                </div>
                              </div>

                              {expandedSeasons[season.season] &&
                                perSeason &&
                                perSeason.size > 0 && (
                                  <div className='mt-1 ml-3 space-y-0.5 text-xs'>
                                    {Array.from(perSeason.entries())
                                      .sort((a, b) => b[1] - a[1])
                                      .map(([type, count]) => (
                                        <div
                                          key={`${season.season}-${type}`}
                                          className='text-muted-foreground flex justify-between'
                                        >
                                          <span>{type}</span>
                                          <span className='font-medium'>
                                            {count}
                                          </span>
                                        </div>
                                      ))}
                                  </div>
                                )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className='border-t pt-3' />
                    <div>
                      <span className='text-muted-foreground text-xs font-semibold'>
                        SESSION TYPE BY YEAR
                      </span>
                      <div className='mt-2 space-y-2'>
                        {sortedSessionTypes.map(({ type, count }) => {
                          const yearMap = sessionTypeByYear.get(type);
                          if (!yearMap || yearMap.size === 0) return null;

                          const sortedYears = Array.from(
                            yearMap.entries(),
                          ).sort((a, b) => b[0] - a[0]);

                          return (
                            <div key={type} className='text-xs'>
                              <div className='flex items-center justify-between'>
                                <button
                                  type='button'
                                  onClick={() => toggleSessionType(type)}
                                  className='flex items-center gap-2'
                                  aria-expanded={!!expandedSessionTypes[type]}
                                >
                                  <span className='text-muted-foreground'>
                                    {expandedSessionTypes[type] ? '▾' : '▸'}
                                  </span>
                                  <span className='font-semibold'>{type}</span>
                                </button>
                                <span className='text-muted-foreground text-sm font-medium'>
                                  {count}
                                </span>
                              </div>

                              {expandedSessionTypes[type] && (
                                <div className='mt-1 ml-3 space-y-0.5'>
                                  {sortedYears.map(([year, ycount]) => (
                                    <div
                                      key={`${type}-${year}`}
                                      className='text-muted-foreground flex justify-between text-xs'
                                    >
                                      <span>{year}</span>
                                      <span className='font-medium'>
                                        {ycount}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
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
