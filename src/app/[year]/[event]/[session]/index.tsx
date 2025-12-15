'use client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { JSX } from 'react';

import { COMPETITION_SESSIONS } from '@/lib/constants';

import { Loader } from '@/components/Loader';
import {
  CompetitionResults,
  PracticeResults,
  QualifyingResults,
} from '@/components/results/results-tables';
import { ServerPageError } from '@/components/ServerError';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';

import { DriverFilters } from '@/app/[year]/[event]/[session]/_components/driver-filters';

import LapTimeContainer from './_components/lapTimes';
import SectorTimes from './_components/sectorTimes';
import Stints from './_components/stints';

import { FragmentType, graphql, useFragment } from '@/types';
import {
  GetEventDetailsQuery,
  GetSessionDetailsQuery,
  Session_Name_Choices_Enum,
} from '@/types/graphql';

const SessionDetails = graphql(`
  fragment SessionDetails on sessions {
    name
    total_laps
    scheduled_start_time_utc
  }
`);

export const SessionHeader = ({
  loading,
  sessions,
}: {
  loading: boolean;
  sessions?: FragmentType<typeof SessionDetails>[];
}) => {
  const { session: sessionParam } = useParams<{ session?: string }>();
  const [session] = useFragment(SessionDetails, sessions ?? []);
  const name = session?.name ?? (sessionParam as Session_Name_Choices_Enum);

  if (loading) {
    return <Loader />;
  }
  if (!loading && !session) return <ServerPageError />;

  return (
    <div className='-col-end-1 w-full rounded border xl:col-span-2'>
      <h1 className='scroll-m-20 px-4 py-3 text-center text-4xl font-extrabold tracking-tight text-balance'>
        {name?.replace(/_/g, ' ')}
      </h1>
      <div className='bg-secondary text-secondary-foreground flex flex-wrap justify-center gap-x-8 px-4 py-2'>
        <p>
          {new Date(session?.scheduled_start_time_utc ?? '').toLocaleDateString(
            undefined,
            {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            },
          )}
        </p>
        {name && COMPETITION_SESSIONS.includes(name) && (
          <p className='font-semibold'>Laps: {session?.total_laps}</p>
        )}
      </div>
    </div>
  );
};

const ChartConfigs: Record<
  string,
  {
    title: string;
    description: string;
    component?: React.ReactNode | ((data: GetEventDetailsQuery) => JSX.Element);
  }
> = {
  grid: {
    title: 'Results',
    description: 'Table of drivers',
    // TODO: Loader goes here
    component: <></>,
  },
  laps: {
    title: 'Lap Times',
    description: 'Compare driver laps',
    component: <LapTimeContainer />,
  },
  stints: {
    title: 'Strategy',
    description: 'Tyres & Pit Stops',
    component: <Stints />,
  },
  sectors: {
    title: 'Fastest Laps',
    description: 'Best laps & sectors',
    component: <SectorTimes />,
  },
  // 'top speeds': {
  //   title: 'Top Speeds',
  //   description: 'Coming soon...',
  // },
  // postions: {
  //   title: 'Positions',
  //   description: 'Coming soon...',
  // },
};
type ChartKey = keyof typeof ChartConfigs;

export const ChartViewController = ({
  data,
  sessionType,
}: {
  data?: GetSessionDetailsQuery;
  sessionType: {
    isCompetition: boolean;
    isQualifying: boolean;
    isPractice: boolean;
  };
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chart = (searchParams.get('chart') || 'grid') as ChartKey;
  const chargeChart = (tab: 'grid' | 'sectors' | 'laps' | 'stints') => {
    const params = new URLSearchParams(searchParams);
    params.set('chart', tab);
    router.replace(`?${params.toString()}`);
  };

  // Make some sort of component w hook for the legend

  return (
    <>
      <div className='grid grid-cols-2 gap-4 py-4 md:grid-cols-4'>
        {Object.keys(ChartConfigs).map((tab) => (
          <Button
            key={tab}
            onClick={() =>
              chargeChart(tab as 'grid' | 'sectors' | 'laps' | 'stints')
            }
            className='inline h-full cursor-pointer text-left'
            variant={tab === chart ? 'default' : 'outline'}
            disabled={!ChartConfigs[tab].component}
          >
            <p className='font-semibold'>{ChartConfigs[tab].title}</p>
            <p className='font-light text-wrap'>
              {ChartConfigs[tab].description}
            </p>
          </Button>
        ))}
      </div>

      <div className='relative flex gap-8'>
        <div className='sticky top-20 grid h-fit w-1/4 max-w-[250px] gap-2'>
          <DriverFilters />
        </div>
        <div className='flex-1'>
          {/* TODO: Refactor for multiple charts that will have to use partial fragment data */}
          {data && ChartConfigs[chart] && chart === 'grid' ? (
            <Table>
              {sessionType.isCompetition && (
                <CompetitionResults session={data.sessions} />
              )}
              {sessionType.isQualifying && (
                <QualifyingResults session={data.sessions} />
              )}
              {sessionType.isPractice && (
                <PracticeResults session={data.sessions} />
              )}
            </Table>
          ) : (
            <>{ChartConfigs[chart]?.component}</>
          )}
        </div>
      </div>
    </>
  );
};
