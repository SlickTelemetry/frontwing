'use client';
import { useQuery } from '@apollo/client/react';
import { notFound } from 'next/navigation';
import { use } from 'react';

import { SUPPORTED_SEASONS } from '@/lib/constants';
import { isAllEmptyArrays } from '@/lib/utils';

import Breadcrumbs from '@/components/navigation/breadcrumbs';
import NextEvent from '@/components/next-event';
import { ServerPageError } from '@/components/ServerError';

import {
  SeasonQuickLinks,
  SeasonQuickLinksSkeleton,
} from '@/app/[year]/_components/quick-links';
import { Schedule } from '@/app/[year]/_components/schedule';
import TopThreeStandings from '@/app/[year]/_components/standings';

import { graphql } from '@/types';

const GET_SEASON_PAGE = graphql(`
  query GetSeasonPage($year: Int!, $limit: Int = 3) @cached {
    drivers(
      where: { driver_standings: { season: { _eq: $year } } }
      order_by: { driver_standings_aggregate: { max: { points: desc } } }
      limit: $limit
    ) {
      ...DriverStandings
    }
    constructors(
      where: { constructor_standings: { season: { _eq: $year } } }
      order_by: { constructor_standings_aggregate: { max: { points: desc } } }
      limit: $limit
    ) {
      ...ConstructorStandings
    }
    schedule(where: { year: { _eq: $year } }) {
      ...SeasonSchedule
    }
    circuits(where: { year: { _eq: $year } }) {
      ...SeasonCircuits
    }
  }
`);

export default function SeasonPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = use(params);
  const { data, loading, error } = useQuery(GET_SEASON_PAGE, {
    variables: { year: parseInt(year) },
  });

  if (error) return <ServerPageError msg='Failed to load season data.' />;

  if (!loading && data && isAllEmptyArrays(data)) {
    notFound();
  }

  const latestYear = parseInt(year) === SUPPORTED_SEASONS[0];
  return (
    <div className='p-4 lg:p-6'>
      <div className='grid gap-4 md:grid-cols-3 2xl:grid-cols-4'>
        <div className='col-span-full'>
          <Breadcrumbs />
        </div>
        <div className='flex flex-col gap-4 md:col-span-2'>
          <div className='flex h-full min-h-48 justify-center overflow-hidden rounded border'>
            {latestYear && <NextEvent />}
            {!latestYear && (
              <div
                className='flex flex-1 bg-cover bg-center bg-no-repeat'
                style={{ backgroundImage: `url(/mclaren-mp4.jpg)` }}
              ></div>
            )}
          </div>
          {loading ? <SeasonQuickLinksSkeleton /> : <SeasonQuickLinks />}
        </div>
        <TopThreeStandings
          loading={loading}
          drivers={data?.drivers}
          constructors={data?.constructors}
        />
      </div>

      <div className='pt-6'>
        <Schedule
          loading={loading}
          schedule={data?.schedule}
          circuits={data?.circuits}
        />
      </div>
    </div>
  );
}
