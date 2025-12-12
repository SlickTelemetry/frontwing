'use client';
import { useQuery } from '@apollo/client/react';
import Link from 'next/link';
import { notFound, useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { GET_STANDINGS } from '@/lib/queries';
import { isAllEmptyArrays } from '@/lib/utils';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';

import { StandingsChart } from '@/app/[year]/standings/_components/chart';
import {
  compareCountback,
  countConstructorPositions,
  countDriverPositions,
} from '@/app/[year]/standings/_components/countback';
import { Legend } from '@/app/[year]/standings/_components/legend';
import { Table } from '@/app/[year]/standings/_components/table';

import type { GetStandingsQuery } from '@/types/graphql';

// Helper functions for data transformation
const resolveColor = (color?: string | null) =>
  color ? `#${color}` : 'var(--foreground)';

const getConstructorData = (
  constructor: NonNullable<GetStandingsQuery['constructors'][0]>,
  events: GetStandingsQuery['events'],
) => {
  const positionCounts = countConstructorPositions(
    constructor.name ?? '',
    events,
  );
  return {
    name: constructor?.name ?? 'Unknown',
    abbr: constructor?.name ?? 'Unknown',
    color: resolveColor(constructor?.color),
    totalPoints: constructor?.lastRoundPoints?.[0]?.points ?? 0,
    positionCounts,
  };
};

const getDriverData = (
  driver: NonNullable<GetStandingsQuery['drivers'][0]>,
  events: GetStandingsQuery['events'],
) => {
  const constructor = driver.latest_constructor?.[0]?.constructor;
  const positionCounts = countDriverPositions(
    driver.abbreviation ?? '',
    events,
  );
  return {
    abbr: driver.abbreviation ?? '',
    name: driver.full_name ?? '',
    totalPoints: driver.driver_standings?.at(-1)?.points ?? 0,
    team: constructor?.name ?? 'Unknown',
    color: resolveColor(constructor?.color),
    positionCounts,
  };
};

const StandingsContent = () => {
  const { year: season } = useParams<{ year: string }>();
  const searchParams = useSearchParams();
  const chartType = (searchParams.get('chart') || 'drivers') as
    | 'drivers'
    | 'constructors';

  const [hiddenItems, setHiddenItems] = useState<Record<string, boolean>>({});
  const { data: standings } = useQuery(GET_STANDINGS, {
    variables: { season: parseInt(season) },
  });

  if (!standings) return null;

  if (standings && isAllEmptyArrays(standings)) {
    return notFound();
  }

  const simpleConstructorData = standings.constructors
    .map((c) => getConstructorData(c, standings.events))
    .sort((a, b) => {
      // First sort by points (descending)
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      // If points are equal, use countback
      return compareCountback(a.positionCounts, b.positionCounts);
    });

  const simpleDriverData = standings.drivers
    .map((d) => getDriverData(d, standings.events))
    .sort((a, b) => {
      // First sort by points (descending)
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      // If points are equal, use countback
      return compareCountback(a.positionCounts, b.positionCounts);
    });

  // Group drivers by constructor for displaying in constructor standings
  const driversByConstructor = new Map<string, string[]>();
  simpleDriverData.forEach((driver) => {
    if (driver.team) {
      const existing = driversByConstructor.get(driver.team) || [];
      existing.push(driver.abbr);
      driversByConstructor.set(driver.team, existing);
    }
  });

  const toggleVisibility = (
    type: 'drivers' | 'constructors' | 'all' | 'none',
    ids?: string[],
  ) => {
    setHiddenItems((prev) => {
      const newState = { ...prev };
      if (type === 'all') {
        return {};
      }

      if (type === 'none') {
        ids = [
          ...simpleConstructorData.map((c) => c.abbr),
          ...simpleDriverData.map((c) => c.abbr),
        ];
      }

      ids?.forEach((id) => {
        if (type === 'none') {
          newState[id] = true;
          return;
        }

        // Get constructor from legendData driver.team or use provided id
        const constructor =
          simpleDriverData.find((d) => d.abbr === id)?.team ?? id;
        // Get Drivers for constructor/team
        const constructorDrivers = simpleDriverData.filter(
          (d) => d.team === constructor,
        );

        // Update given item
        newState[id] = !newState[id];

        // Check related items
        const allHidden = constructorDrivers.every((d) => newState[d.abbr]);

        if (type === 'constructors') {
          // Update all drivers
          constructorDrivers.forEach((d) => (newState[d.abbr] = newState[id]));
        }
        if (type === 'drivers') {
          // Update constructor
          newState[constructor] = allHidden;
        }
      });

      return newState;
    });
  };

  return (
    <div className='grid gap-4 p-4 lg:px-6 2xl:grid-cols-5'>
      <div className='col-span-full'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${season}`}>{season}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Standings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className='h-fit 2xl:order-2 2xl:col-span-3'>
        <div className='rounded border'>
          <div className='bg-secondary/25 rounded border-b'>
            <StandingsChart
              data={standings}
              type={chartType}
              hiddenItems={hiddenItems}
              toggleVisibility={toggleVisibility}
            />
          </div>
          <Legend
            standings={simpleDriverData}
            toggleVisibility={toggleVisibility}
            hiddenItems={hiddenItems}
          />
        </div>
      </div>
      <div className='w-full min-w-0 2xl:order-1 2xl:col-span-2'>
        <div className='bg-muted/50 mb-2 grid grid-cols-2 gap-2 rounded p-2'>
          {['drivers', 'constructors'].map((v) => (
            <Button
              key={v}
              variant={chartType === v ? 'secondary' : 'outline'}
              asChild
            >
              <Link
                scroll={false}
                href={`?chart=${v}`}
                className='capitalize hover:underline'
              >
                {v}
              </Link>
            </Button>
          ))}
        </div>
        <div className='@container min-w-0 overflow-hidden'>
          <Table
            items={
              chartType === 'drivers' ? simpleDriverData : simpleConstructorData
            }
            toggleItem={(items) => toggleVisibility(chartType, items)}
            hiddenItems={hiddenItems}
            driversByConstructor={
              chartType === 'constructors' ? driversByConstructor : undefined
            }
          />
        </div>
      </div>
    </div>
  );
};

const Standings = () => {
  return <StandingsContent />;
};

export default Standings;
