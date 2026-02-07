'use client';
import { useQuery } from '@apollo/client/react';
import Link from 'next/link';
import { notFound, useParams, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';

import { GET_STANDINGS } from '@/lib/queries';
import { isAllEmptyArrays } from '@/lib/utils';

import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { Button } from '@/components/ui/button';

import { StandingsChart } from '@/app/[year]/standings/_components/chart';
import { Legend } from '@/app/[year]/standings/_components/legend';
import { HiddenItemProvider } from '@/app/[year]/standings/_components/legend/context';
import { Table } from '@/app/[year]/standings/_components/table';

const StandingsContent = () => {
  const { year: season } = useParams<{ year: string }>();
  const searchParams = useSearchParams();
  const chartType = (searchParams.get('chart') || 'drivers') as
    | 'drivers'
    | 'constructors';

  const { data: standings, error } = useQuery(GET_STANDINGS, {
    variables: { season: parseInt(season) },
  });

  if (error) {
    posthog.capture('graphql_error', error);
  }

  if (!standings) return null;

  if (standings && isAllEmptyArrays(standings)) {
    return notFound();
  }

  return (
    <HiddenItemProvider standings={standings}>
      <div className='grid gap-4 p-4 lg:px-6 2xl:grid-cols-5'>
        <div className='col-span-full'>
          <Breadcrumbs />
        </div>
        <div className='h-fit 2xl:order-2 2xl:col-span-3'>
          <div className='rounded border'>
            <div className='bg-secondary/25 rounded border-b'>
              <StandingsChart events={standings.events} type={chartType} />
            </div>
            <Legend />
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
            <Table events={standings.events} chartType={chartType} />
          </div>
        </div>
      </div>
    </HiddenItemProvider>
  );
};

const Standings = () => {
  return <StandingsContent />;
};

export default Standings;
