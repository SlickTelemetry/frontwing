'use client';
import { useQuery } from '@apollo/client/react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { JSX } from 'react';

import { GET_SESSION } from '@/lib/queries';
import { eventLocationDecode, sessionDecode } from '@/lib/utils';

import { Loader } from '@/components/Loader';
import EventResultsContainer from '@/components/results/event-results-container';
import { ServerPageError } from '@/components/ServerError';
import { Button } from '@/components/ui/button';

import LapTimeContainer from './lapTimes';
import SectorTimes from './sectorTimes';
import Stints from './stints';

import {
  GetEventDetailsQuery,
  Session_Name_Choices_Enum,
  SessionQuery,
  SessionQueryVariables,
} from '@/types/graphql';

export const SessionHeader = () => {
  const { year, event: eventParams, session: sessionParam } = useParams();

  const { data, loading, error } = useQuery<
    SessionQuery,
    SessionQueryVariables
  >(GET_SESSION, {
    variables: {
      year: parseInt(year as string),
      event: eventLocationDecode(eventParams as string),
      session: sessionDecode(
        sessionParam as string,
      ) as Session_Name_Choices_Enum,
    },
  });

  if (loading) {
    return <Loader />;
  }
  if (error || !data?.sessions.length) return <ServerPageError />;

  const { event, name, total_laps, scheduled_start_time_utc } =
    data.sessions[0];

  return (
    <div>
      <h1 className='text-4xl'>{event?.name}</h1>
      <h2 className='text-2xl'>{name?.replace(/_/g, ' ')}</h2>
      <span className='italic'>
        {(name === Session_Name_Choices_Enum.Race ||
          name === Session_Name_Choices_Enum.Sprint) && (
          <>
            {total_laps} Laps
            <br />
          </>
        )}
        {new Date(scheduled_start_time_utc as string).toLocaleString(
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
      </span>
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
    component: <>Placeholder</>,
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
  'top speeds': {
    title: 'Top Speeds',
    description: 'Coming soon...',
  },
  postions: {
    title: 'Positions',
    description: 'Coming soon...',
  },
};
type ChartKey = keyof typeof ChartConfigs;

export const ChartViewController = ({
  loading,
  data,
}: {
  data?: GetEventDetailsQuery;
  loading: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chart = (searchParams.get('chart') || 'grid') as ChartKey;

  const chargeChart = (tab: 'grid' | 'sectors' | 'laps' | 'stints') => {
    const params = new URLSearchParams(searchParams);
    params.set('chart', tab);
    router.replace(`?${params.toString()}`);
  };

  return (
    <>
      <div className='grid grid-cols-3 gap-4 py-4 md:grid-cols-6'>
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

      {/* TODO: Refactor for multiple charts that will have to use partial fragment data */}
      {ChartConfigs[chart] && chart === 'grid' ? (
        <EventResultsContainer
          loading={loading}
          sessions={data?.events ?? []}
        />
      ) : (
        ChartConfigs[chart].component
      )}
    </>
  );
};
