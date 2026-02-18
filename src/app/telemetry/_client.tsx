'use client';

import { useQuery } from '@apollo/client/react';
import { Circle, Trash2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import {
  getDriversFromParams,
  serializeDrivers,
  toggleDriverLap,
} from '@/lib/telemetry-params';
import { eventLocationDecode, formatLapTime } from '@/lib/utils';

import { SprintBadge } from '@/components/badges/sprint-badge';
import { Button } from '@/components/ui/button';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';

import { graphql } from '@/types';
import {
  GetTelemetryDriverLapsQuery,
  GetTelemetryOptionDriversWithLapsQuery,
  GetTelemetryOptionsQuery,
  Session_Name_Choices_Enum,
} from '@/types/graphql';

type DriverProps = GetTelemetryOptionDriversWithLapsQuery['drivers'][number];

export function TelemetryClient() {
  const { data } = useQuery(
    graphql(`
      query GetTelemetryOptions {
        circuits(distinct_on: name) {
          name
        }
        seasons: events(distinct_on: year, order_by: { year: desc }) {
          year
        }
        events(order_by: { date: desc }) {
          year
          name
          round_number
          format
          sessions(order_by: { date: desc }) {
            name
            circuit {
              name
            }
          }
        }
      }
    `),
  );

  return (
    <div className='mx-auto grid w-200 gap-4 py-4'>
      <div className='flex items-center gap-4'>
        <p className='flex size-8 items-center justify-center rounded-full border'>
          2
        </p>
        <p className='text-lg'>Select your drivers</p>
      </div>
      <DriverSelectorGroup events={data?.events} />
    </div>
  );
}

const DriverSelectorGroup = ({
  events = [],
  activeSeason,
  activeEvent,
}: {
  events?: GetTelemetryOptionsQuery['events'];
  activeSeason?: number | null;
  activeEvent?: string | null;
}) => {
  const searchParams = useSearchParams();
  const circuit = eventLocationDecode(searchParams.get('circuit'));

  const [season, setSeason] = useState(activeSeason);
  const [event, setEvent] = useState(activeEvent);
  const [session, setSession] = useState<string | null>();
  const [driver, setDriver] = useState<DriverProps | null>();

  const activeDrivers = getDriversFromParams(searchParams);

  const { data } = useQuery(
    graphql(`
      query GetTelemetryOptionDriversWithLaps(
        $session: session_name_choices_enum = Race
        $circuit: String = "Silverstone"
        $season: Int = 2025
      ) {
        drivers(
          where: {
            driver_sessions: {
              session: {
                name: { _eq: $session }
                circuit: { name: { _eq: $circuit }, year: { _eq: $season } }
              }
            }
          }
          order_by: { full_name: asc }
        ) {
          abbreviation
          full_name
        }
      }
    `),
    {
      variables: {
        season,
        circuit,
        session: session as Session_Name_Choices_Enum,
      },
      skip: !session,
    },
  );

  const filteredSeasons = [...events]
    .filter((e) => e.sessions.some((s) => s.circuit?.name === circuit))
    .map((e) => e.year);

  const filteredEvents = [...events].filter(
    (e) =>
      e.sessions.some((s) => s.circuit?.name === circuit) && e.year === season,
  );

  const handleSeasonChange = (val: number | null) => {
    if (!val) return;
    setSeason(val);
    setEvent(null);
    setSession(null);
    setDriver(null);
  };

  const handleEventSelector = (val: string | null) => {
    if (!val) return;
    setEvent(val);
    setSession(null);
    setDriver(null);
  };

  const handleSessionSelector = (val: string | null) => {
    if (!val) return;
    setSession(val);
    setDriver(null);
  };

  const handleDriverSelector = (val: DriverProps | null) => {
    if (!val) return;
    setDriver(val);
  };

  return (
    <div className='grid gap-4 rounded border p-4'>
      <div className='flex flex-wrap gap-4'>
        <Combobox
          items={filteredSeasons}
          value={season}
          onValueChange={handleSeasonChange}
        >
          <ComboboxInput placeholder='Season' />
          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(season: string) => (
                <ComboboxItem key={season} value={season}>
                  {season}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>

        {filteredEvents.length > 1 && (
          <Combobox
            disabled={!events}
            items={filteredEvents}
            value={event}
            onValueChange={handleEventSelector}
          >
            <ComboboxInput placeholder='Event' />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(event) => (
                  <ComboboxItem key={event.name} value={event.name}>
                    <p className='w-4 font-bold'>{event.round_number}</p>
                    <p className='w-full'>{event.name}</p>
                    <SprintBadge format={event.format} style='short' />
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        )}

        <Combobox
          disabled={!season}
          items={filteredEvents.map(({ sessions }) => sessions)[0]}
          value={session}
          onValueChange={handleSessionSelector}
        >
          <ComboboxInput placeholder='Session' />
          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(session) => (
                <ComboboxItem
                  key={session.name}
                  value={eventLocationDecode(session.name)}
                >
                  {eventLocationDecode(session.name)}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>

        <Combobox
          disabled={!data?.drivers}
          items={data?.drivers}
          value={driver}
          itemToStringLabel={(d) => d?.full_name || ''}
          onValueChange={handleDriverSelector}
        >
          <ComboboxInput placeholder='Driver' />
          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(driver) => (
                <ComboboxItem key={driver.abbreviation} value={driver}>
                  {driver.full_name}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>

      {driver && (
        <DriverRow
          key={[driver, season, session, event].filter(Boolean).join('-')}
          driver={driver.abbreviation}
          season={season}
          session={session}
          event={event}
          circuit={circuit}
        />
      )}
      {activeDrivers.map((d) => {
        if (
          d.driver === driver &&
          d.season === season &&
          d.event === event &&
          d.session === session
        )
          return;

        return (
          <DriverRow
            key={[d.driver, d.season, d.session, d.event]
              .filter(Boolean)
              .join('-')}
            {...d}
            circuit={circuit}
          />
        );
      })}
    </div>
  );
};

const DriverRow = ({
  driver,
  circuit,
  event,
  season,
  session,
  laps = [],
}: {
  driver?: string | null;
  circuit?: string | null;
  event?: string | null;
  season?: number | null;
  session?: string | null;
  laps?: number[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data } = useQuery(
    graphql(`
      query GetTelemetryDriverLaps(
        $session: session_name_choices_enum!
        $circuit: String!
        $season: Int!
        $driver: String!
      ) {
        drivers(
          where: {
            abbreviation: { _eq: $driver }
            driver_sessions: {
              session: {
                name: { _eq: $session }
                circuit: { name: { _eq: $circuit }, year: { _eq: $season } }
              }
            }
          }
          order_by: { full_name: asc }
          limit: 1
        ) {
          abbreviation
          full_name
          driver_sessions(
            where: {
              session: {
                name: { _eq: $session }
                circuit: { name: { _eq: $circuit }, year: { _eq: $season } }
              }
            }
          ) {
            laps {
              lap_number
              lap_time
              compound
              fresh_tyre
            }
          }
        }
      }
    `),
    {
      variables: {
        driver: driver as string,
        season: season as number,
        circuit: circuit as string,
        session: session as Session_Name_Choices_Enum,
      },
      skip: !driver,
    },
  );
  const activeDriver = data?.drivers?.[0];

  const handleLapSelector = (lapNum: number) => {
    const updatedParams = toggleDriverLap(
      searchParams,
      driver as string,
      season as number,
      session as string,
      lapNum,
      event,
    );
    router.push(`?${updatedParams.toString()}`, { scroll: false });
  };

  const removeDriver = () => {
    const drivers = getDriversFromParams(searchParams);
    const updated = drivers.filter(
      (d) =>
        !(
          d.driver === driver &&
          d.season === season &&
          d.event === event &&
          d.session === session
        ),
    );
    const params = new URLSearchParams(searchParams);
    if (updated.length > 0) {
      params.set('f', serializeDrivers(updated));
    } else {
      params.delete('f');
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className='grid gap-1'>
      <div className='flex w-full justify-between gap-2'>
        {activeDriver && (
          <p>
            {[activeDriver.full_name, season, event, session]
              .filter(Boolean)
              .join(' | ')}
          </p>
        )}
        <div className='flex gap-2'>
          {laps?.length && (
            <Button onClick={removeDriver} size='icon-xs' variant='default'>
              <Trash2 />
            </Button>
          )}
          <Button
            onClick={() => {
              // console.log('i do nothing');
            }}
            size='sm'
            variant='secondary'
          >
            Slowest Lap
          </Button>
          <Button
            onClick={() => {
              // console.log('i do nothing');
            }}
            size='sm'
            variant='secondary'
          >
            Fastest Lap
          </Button>
        </div>
      </div>

      <div className='overflow-x-scroll pb-2'>
        <div className='flex gap-2'>
          {activeDriver?.driver_sessions?.[0].laps?.map(
            (lap) =>
              lap.lap_time && (
                <LapButton
                  handleLapSelector={handleLapSelector}
                  key={[driver, season, session, event, lap.lap_number]
                    .filter(Boolean)
                    .join('-')}
                  active={laps?.includes(lap.lap_number || 0)}
                  {...lap}
                />
              ),
          )}
        </div>
      </div>
    </div>
  );
};

const LapButton = ({
  handleLapSelector,
  active,
  ...lap
}: GetTelemetryDriverLapsQuery['drivers'][number]['driver_sessions'][number]['laps'][number] & {
  handleLapSelector: (lapNum: number) => void;
  active?: boolean;
}) => {
  if (!lap.lap_time) return;
  const fillVar = `var(--${lap.compound?.toLowerCase()}-${lap.fresh_tyre ? 'new' : 'old'})`;

  const handleClick = () => {
    handleLapSelector(lap.lap_number as number);
  };

  return (
    <Button
      onClick={handleClick}
      variant={active ? 'default' : 'secondary'}
      key={lap.lap_number}
    >
      <Circle fill={fillVar} />
      <p>
        {lap.lap_number} | {formatLapTime(lap.lap_time)}
      </p>
    </Button>
  );
};
