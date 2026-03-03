'use client';
import clsx from 'clsx';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useLocalStorage } from '@/hooks/use-storage';

import { ConstructorBadge } from '@/components/badges/constructor-badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

import { FragmentType, graphql, useFragment } from '@/types';

type StandingsListProps<T> = {
  type: ViewType;
  active?: boolean;
  items: T[];
  loading?: boolean;
  getName: (item: T) => string;
  getTeam?: (item: T) => string;
  getColor?: (item: T) => string | undefined;
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

export default function TopThreeStandings(props: {
  loading?: boolean;
  drivers?: FragmentType<typeof DriverStandings>[];
  constructors?: FragmentType<typeof ConstructorStandings>[];
}) {
  const { year } = useParams();
  const [view, setView] = useLocalStorage('season-standings', 'drivers');

  const drivers = useFragment(DriverStandings, props.drivers) || [];
  const sortedDrivers = [...drivers].sort(
    (a, b) =>
      (a.driver_standings[0]?.position || 0) -
      (b.driver_standings[0]?.position || 0),
  );

  const constructors =
    useFragment(ConstructorStandings, props.constructors) || [];

  const sortedConstructors = [...constructors].sort(
    (a, b) =>
      (a.constructor_standings[0]?.position || 0) -
      (b.constructor_standings[0].position || 0),
  );

  if (!props?.loading && !constructors?.length && !drivers?.length) return null;

  return (
    <div className='flex h-fit flex-col gap-2 rounded'>
      <Link
        href={`${year}/standings?chart=${view}`}
        className='flex w-full items-center gap-2 text-2xl font-bold hover:underline'
      >
        Standings
        <ArrowUpRight />
      </Link>

      <div className='grid grid-cols-2 gap-2 rounded'>
        {(['drivers', 'constructors'] as ViewType[]).map((v) => (
          <Button
            key={v}
            variant={view === v ? 'default' : 'outline'}
            onClick={() => setView(v)}
            className='block truncate capitalize'
          >
            {v}
          </Button>
        ))}
      </div>

      <div className='grid flex-1 gap-2'>
        {props.loading && <StandingSkeleton />}
        <StandingsList
          type='drivers'
          active={view === 'drivers' && sortedDrivers.length > 0}
          items={sortedDrivers}
          getName={(d) => d.full_name!}
          getTeam={(d) => d.latest_constructor[0]?.constructor?.name ?? ''}
          getColor={(d) =>
            d.latest_constructor[0]?.constructor?.color ?? undefined
          }
          getStandings={(d) => d.driver_standings}
        />
        <StandingsList
          type='constructors'
          active={view === 'constructors' && sortedConstructors.length > 0}
          items={sortedConstructors}
          getName={(c) => c.name!}
          getColor={(c) => c.color ?? undefined}
          getTeam={(c) => c.name!}
          getStandings={(c) => c.constructor_standings}
        />
      </div>
    </div>
  );
}

// *** Takes functions as props to get values dynamically
function StandingsList<T>({
  type = 'drivers',
  active = false,
  items,
  getName,
  getTeam,
  getStandings,
  getColor,
}: StandingsListProps<T>) {
  return (
    <Table
      className={clsx({
        hidden: !active,
        block: active,
      })}
    >
      <TableBody>
        {/* <div className='bg-muted divide-background flex h-fit flex-col divide-y overflow-hidden rounded'> */}
        {items.map((item, idx) => {
          const standings = getStandings(item);
          const [last] = standings;

          return (
            <StandingRow
              key={getName(item)}
              position={last.position || idx + 1}
              name={type === 'drivers' ? getName(item) : undefined}
              team={getTeam?.(item) ?? ''}
              color={getColor?.(item)}
              points={last.points as number}
              prevPoints={
                idx > 0
                  ? (getStandings(items[idx - 1])[0].points ?? undefined)
                  : undefined
              }
            />
          );
        })}
        {/* </div> */}
      </TableBody>
    </Table>
  );
}

function StandingRow({
  position,
  name,
  team,
  color,
  points,
  prevPoints,
}: {
  position: number;
  name?: string;
  team?: string;
  color?: string;
  points: number;
  prevPoints?: number;
}) {
  return (
    <TableRow>
      <TableCell>
        <p className='w-8 text-center text-xl'>{position}</p>
      </TableCell>
      <TableCell className='w-full'>
        {name && <h4 className='line-clamp-1'>{name}</h4>}
        {team && <ConstructorBadge color={color} name={team} />}
      </TableCell>
      <TableCell className='text-center'>{points}</TableCell>
      <TableCell className='text-center'>
        {prevPoints !== undefined ? points - prevPoints : 'Gap'}
      </TableCell>
    </TableRow>
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
