import { useQuery } from '@apollo/client/react';
import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import posthog from 'posthog-js';

import { SUPPORTED_SEASONS } from '@/lib/constants';
import { GET_STANDINGS } from '@/lib/queries';
import { isAllEmptyArrays } from '@/lib/utils';

import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { Button } from '@/components/ui/button';

import { StandingsChart } from '@/app/$year/standings/-components/chart/chart';
import { Legend } from '@/app/$year/standings/-components/legend';
import { HiddenItemProvider } from '@/app/$year/standings/-components/legend/context';
import { Table } from '@/app/$year/standings/-components/table';

export const Route = createFileRoute('/$year/standings/')({
  validateSearch: (search: Record<string, unknown>) => ({
    chart:
      search.chart === 'constructors'
        ? ('constructors' as const)
        : ('drivers' as const),
  }),
  component: StandingsPage,
});

function StandingsPage() {
  const { year } = Route.useParams();
  const { chart: chartType } = Route.useSearch();

  const { data: standings, error } = useQuery(GET_STANDINGS, {
    variables: { season: parseInt(year, 10) },
  });

  if (error) {
    posthog.capture('graphql_error', error);
  }

  if (!standings) return null;

  // Year not supported → 404 (use $year's notFound to keep layout/theme)
  if (!SUPPORTED_SEASONS.includes(parseInt(year, 10))) {
    throw notFound({ routeId: '/$year' });
  }

  // Supported year but no data yet (e.g. 2026) → empty state
  if (isAllEmptyArrays(standings)) {
    return (
      <div className='flex flex-1 flex-col gap-4 p-4 lg:px-6'>
        <Breadcrumbs />
        <div className='flex flex-1 flex-col items-center justify-center gap-4 rounded border border-dashed p-12'>
          <p className='text-muted-foreground text-center text-lg'>
            No standings data for {year} yet. Check back later when the season
            gets underway.
          </p>
          <div className='flex flex-wrap justify-center gap-2'>
            <Button variant='outline' asChild>
              <Link to='/$year' params={{ year: parseInt(year, 10) }}>
                Back to {year} season
              </Link>
            </Button>
            {SUPPORTED_SEASONS.includes(parseInt(year, 10) - 1) && (
              <Button variant='outline' asChild>
                <Link
                  to='/$year/standings'
                  params={{ year: String(parseInt(year, 10) - 1) }}
                  search={{ chart: chartType }}
                >
                  {parseInt(year, 10) - 1} standings
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    );
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
            {(['drivers', 'constructors'] as const).map((v) => (
              <Button
                key={v}
                variant={chartType === v ? 'secondary' : 'outline'}
                asChild
              >
                <Link
                  to='/$year/standings'
                  params={{ year }}
                  search={{ chart: v }}
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
}
