import { Link, useParams } from '@tanstack/react-router';
import clsx from 'clsx';
import { ArrowUpRight } from 'lucide-react';

import { useLocalStorage } from '@/hooks/use-storage';

import { Button } from '@/components/ui/button';

import { FragmentType, graphql, useFragment } from '@/types';

type StandingsListProps<T> = {
  active?: boolean;
  items: T[];
  loading?: boolean;
  getName: (item: T) => string;
  getTeam?: (item: T) => string;
  getStandings: (
    item: T,
  ) => { points?: number | null; position?: number | null }[];
};

export const DriverStandings = graphql(`
  fragment DriverStandings on drivers {
    abbreviation
    full_name
    latest_constructor: driver_sessions(
      limit: 1
      order_by: { session: { date: desc } }
    ) {
      constructor: constructorByConstructorId {
        name
        color
      }
    }
    driver_standings(
      where: { season: { _eq: $year } }
      order_by: { round: desc }
      limit: 1
    ) {
      round
      points
      position
    }
  }
`);

export const ConstructorStandings = graphql(`
  fragment ConstructorStandings on constructors {
    name
    color
    constructor_standings(
      where: { season: { _eq: $year } }
      order_by: { round: desc }
      limit: 1
    ) {
      round
      points
      position
    }
  }
`);

const getLast = <T,>(arr: T[]): T => arr[arr.length - 1];
const sortByLastPoints = <T,>(items: T[], getPoints: (item: T) => number) =>
  [...items].sort((a, b) => getPoints(b) - getPoints(a));

export default function TopThreeStandings(props: {
  loading?: boolean;
  drivers?: FragmentType<typeof DriverStandings>[];
  constructors?: FragmentType<typeof ConstructorStandings>[];
}) {
  const { year } = useParams({ strict: false });
  const [view, setView] = useLocalStorage('season-standings', 'drivers');

  const drivers = useFragment(DriverStandings, props.drivers);
  const sortedDrivers = sortByLastPoints(drivers ?? [], (d) =>
    d ? (getLast(d.driver_standings).points as number) : 0,
  );

  const constructors = useFragment(ConstructorStandings, props.constructors);
  const sortedConstructors = sortByLastPoints(constructors ?? [], (c) =>
    c ? (getLast(c.constructor_standings).points as number) : 0,
  );

  if (!props?.loading && !constructors?.length && !drivers?.length) return null;

  return (
    <div className='flex h-full min-h-[296px] flex-col gap-2 rounded border p-4 2xl:col-span-2'>
      <Link
        to={`/${year ?? ''}/standings` as '/'}
        search={{ chart: view } as Record<string, unknown>}
        className='flex w-full items-center justify-between text-xl font-bold hover:underline'
      >
        Standings
        <ArrowUpRight />
      </Link>

      <div className='grid grid-cols-2 gap-2 rounded'>
        {(['drivers', 'constructors'] as ViewType[]).map((v) => (
          <Button
            key={v}
            variant={view === v ? 'secondary' : 'outline'}
            onClick={() => setView(v)}
            className='block truncate capitalize'
          >
            {v}
          </Button>
        ))}
      </div>

      <div className='grid flex-1 gap-2 2xl:grid-cols-2'>
        {props.loading && <StandingSkeleton />}
        <StandingsList
          active={view === 'drivers' && sortedDrivers.length > 0}
          items={sortedDrivers}
          getName={(d) => d.full_name!}
          getTeam={(d) => d.latest_constructor[0]?.constructor?.name ?? ''}
          getStandings={(d) => d.driver_standings}
        />
        <StandingsList
          active={view === 'constructors' && sortedConstructors.length > 0}
          items={sortedConstructors}
          getName={(c) => c.name!}
          getStandings={(c) => c.constructor_standings}
        />
      </div>
    </div>
  );
}

// *** Takes functions as props to get values dynamically
function StandingsList<T>({
  active = false,
  items,
  getName,
  getTeam,
  getStandings,
}: StandingsListProps<T>) {
  return (
    <div
      className={clsx('2xl:flex', {
        hidden: !active,
        flex: active,
      })}
    >
      <div className='bg-muted divide-background flex flex-1 flex-col divide-y overflow-hidden rounded'>
        {items.map((item, idx) => {
          const standings = getStandings(item);
          const last = getLast(standings);

          return (
            <StandingRow
              key={getName(item)}
              position={last.position || idx + 1}
              name={getName(item)}
              team={getTeam?.(item) ?? ''}
              points={last.points as number}
              prevPoints={
                idx > 0
                  ? (getLast(getStandings(items[idx - 1])).points ?? undefined)
                  : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
}

function StandingRow({
  position,
  name,
  team,
  points,
  prevPoints,
}: {
  name: string;
  position: number;
  points: number;
  team?: string;
  prevPoints?: number;
}) {
  return (
    <div className='flex flex-1 items-center gap-4 px-4 py-1'>
      <p className='text-xl'>{position}</p>
      <div className='flex-1'>
        <h4 className='line-clamp-1 font-semibold'>{name}</h4>
        {team && <p className='line-clamp-1 text-sm'>{team}</p>}
      </div>
      <p>{points}</p>
      <p className='hidden lg:block'>
        {prevPoints !== undefined ? points - prevPoints : 'Gap'}
      </p>
    </div>
  );
}

function StandingSkeleton() {
  return (
    <div className='bg-muted divide-background flex flex-1 flex-col divide-y overflow-hidden rounded'>
      {Array.from(Array(3)).map((_k, i) => (
        <StandingRowSkeleton key={`standing-row-loader-${i}`} />
      ))}
    </div>
  );
}

function StandingRowSkeleton() {
  return (
    <div className='flex flex-1 animate-pulse items-center gap-4 px-4 py-1'>
      <p className='bg-background h-6 w-4 rounded' />
      <div className='h-fit flex-1'>
        <h4 className='bg-background h-6 w-full rounded' />
        <p className='bg-background mt-1 h-4 w-full rounded' />
      </div>
      <p className='bg-background h-6 w-8 rounded' />
      <p className='bg-background hidden h-6 w-8 rounded lg:block' />
    </div>
  );
}
