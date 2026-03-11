import { useNavigate } from '@tanstack/react-router';
import { Activity } from 'react';

import { COMPETITION_SESSIONS } from '@/lib/constants';

import { ServerPageError } from '@/components/errors/ServerError';
import { Loader } from '@/components/Loader';
import {
  CompetitionResults,
  PracticeResults,
  QualifyingResults,
} from '@/components/results/results-tables';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table } from '@/components/ui/table';

import { DriverFilters } from '@/app/$year/$event/$session/-components/driver-filters';
import { FastestLapContainer } from '@/app/$year/$event/$session/-components/fastest-lap';
import { LapTimeContainer } from '@/app/$year/$event/$session/-components/lap-times';
import Stints from '@/app/$year/$event/$session/-components/stints';
import { Route } from '@/app/$year/$event/$session/route';

import { FragmentType, graphql, useFragment } from '@/types';
import {
  GetSessionDetailsQuery,
  Session_Name_Choices_Enum,
} from '@/types/graphql';

const SessionDetails = graphql(`
  fragment SessionDetails on sessions {
    name
    total_laps
    scheduled_start_time
    scheduled_start_time_utc
  }
`);

type SessionType = {
  isCompetition: boolean;
  isQualifying: boolean;
  isPractice: boolean;
};

const ChartConfigs: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  grid: {
    title: 'Results',
    description: 'Table of drivers',
  },
  laps: {
    title: 'Lap Times',
    description: 'Compare driver laps',
  },
  stints: {
    title: 'Strategy',
    description: 'Tyres & Pit Stops',
  },
  sectors: {
    title: 'Fastest Laps',
    description: 'Best laps & sectors',
  },
};

export const SessionHeader = ({
  loading,
  sessions,
}: {
  loading: boolean;
  sessions?: FragmentType<typeof SessionDetails>[];
}) => {
  const { session: sessionParam } = Route.useParams();
  const [session] = useFragment(SessionDetails, sessions ?? []);
  const name = session?.name ?? (sessionParam as Session_Name_Choices_Enum);

  if (loading) {
    return <Loader />;
  }
  if (!loading && !session) return <ServerPageError />;

  return (
    <div className='-col-end-1 w-full rounded border p-4 xl:col-span-2'>
      <div className='flex w-full items-end justify-between'>
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight text-balance'>
          {name?.replace(/_/g, ' ')}
        </h1>
        {name && COMPETITION_SESSIONS.includes(name) && (
          <p className='text-xl font-medium'>{session?.total_laps} Laps</p>
        )}
      </div>
      <Separator className='my-2 xl:my-4' />
      <div className='grid-cols-2 xl:grid'>
        <p>
          Track:{' '}
          {new Date(
            session?.scheduled_start_time?.slice(0, -6) ?? '',
          ).toLocaleTimeString(undefined, {
            hour: 'numeric',
            minute: 'numeric',
          })}{' '}
          {new Date(
            session?.scheduled_start_time?.slice(0, -6) ?? '',
          ).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>

        <p>
          Local:{' '}
          {new Date(session?.scheduled_start_time_utc ?? '').toLocaleTimeString(
            undefined,
            {
              hour: 'numeric',
              minute: 'numeric',
            },
          )}{' '}
          {new Date(session?.scheduled_start_time_utc ?? '').toLocaleDateString(
            undefined,
            {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            },
          )}
        </p>
      </div>
    </div>
  );
};

export const ChartViewController = ({
  data,
  sortedSessions,
  sessionType,
}: {
  data?: GetSessionDetailsQuery;
  sortedSessions: GetSessionDetailsQuery['sessions'][number]['driver_sessions'];
  sessionType: SessionType;
}) => {
  const navigate = useNavigate();
  const { chart: activeChart = 'grid' } = Route.useSearch();

  const chargeChart = (tab: 'grid' | 'sectors' | 'laps' | 'stints') => {
    navigate({
      to: '.',
      search: (prev) => ({ ...prev, chart: tab }),
      replace: true,
    });
  };

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
            variant={tab === activeChart ? 'default' : 'outline'}
          >
            <p className='font-semibold'>{ChartConfigs[tab].title}</p>
            <p className='font-light text-wrap'>
              {ChartConfigs[tab].description}
            </p>
          </Button>
        ))}
      </div>

      <div className='relative flex gap-8'>
        <div className='sticky top-20 grid h-fit w-1/4 max-w-62.5 gap-2'>
          <DriverFilters driverSessions={sortedSessions} />
        </div>
        <div className='flex-1'>
          <Activity mode={activeChart === 'grid' ? 'visible' : 'hidden'}>
            <Table>
              {data && sessionType.isCompetition && (
                <CompetitionResults session={data.sessions} />
              )}
              {data && sessionType.isQualifying && (
                <QualifyingResults session={data.sessions} />
              )}
              {data && sessionType.isPractice && (
                <PracticeResults session={data.sessions} />
              )}
            </Table>
          </Activity>
          <Activity mode={activeChart === 'laps' ? 'visible' : 'hidden'}>
            <LapTimeContainer />
          </Activity>
          <Activity mode={activeChart === 'stints' ? 'visible' : 'hidden'}>
            <Stints sessionType={sessionType} />
          </Activity>
          <Activity mode={activeChart === 'sectors' ? 'visible' : 'hidden'}>
            <FastestLapContainer />
          </Activity>
        </div>
      </div>
    </>
  );
};
