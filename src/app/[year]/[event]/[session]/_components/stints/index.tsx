'use client';
import { useQuery } from '@apollo/client/react';
import { useParams } from 'next/navigation';
import React from 'react';

import { GET_SESSION_STINTS } from '@/lib/queries';
import {
  eventLocationDecode,
  sessionDecode,
  sortFastestLaps,
  sortResults,
} from '@/lib/utils';

import { Loader } from '@/components/Loader';
import { ServerPageError } from '@/components/ServerError';

import { StintsChart } from '@/app/[year]/[event]/[session]/_components/stints/chart';

import {
  GetSessionStintsQuery,
  Session_Name_Choices_Enum,
} from '@/types/graphql';

const Stints = ({
  sessionType,
}: {
  sessionType: {
    isCompetition: boolean;
    isQualifying: boolean;
    isPractice: boolean;
  };
}) => {
  const { year, event, session } = useParams();

  const {
    data: sessionData,
    loading,
    error,
  } = useQuery(GET_SESSION_STINTS, {
    variables: {
      year: parseInt(year as string),
      event: eventLocationDecode(event as string),
      session: sessionDecode(session as string) as Session_Name_Choices_Enum,
    },
  });

  if (error || (!sessionData && !loading)) return <ServerPageError />;

  let driverSessions = sessionData?.sessions[0]?.driver_sessions || [];
  const qualifyingSessions: {
    [key: string]: GetSessionStintsQuery['sessions'][number]['driver_sessions'];
  } = {};

  // Sorting logic based on session type
  if (sessionType.isCompetition) {
    driverSessions = sortResults(driverSessions);
  } else if (sessionType.isPractice) {
    driverSessions = sortFastestLaps(driverSessions);
  }

  if (sessionType.isQualifying) {
    const rcms = sessionData?.sessions[0].race_control_messages ?? [];
    const qualifyingStages = ['q1', 'q2', 'q3'];

    qualifyingStages.forEach((stage, index) => {
      const startTime = rcms[index - 1]?.time as string;
      const endTime = rcms[index]?.time as string;

      qualifyingSessions[stage] = sortResults(
        driverSessions,
        `${stage as 'q1' | 'q2' | 'q3'}_time`,
      ).map((ds) => ({
        ...ds,
        laps: ds.laps.filter((lap) => {
          const lapTime = lap.lap_start_date as string;
          return (
            (!startTime || lapTime > startTime) &&
            (!endTime || lapTime < endTime)
          );
        }),
      }));
    });
  }

  return (
    <div className='grid gap-4'>
      {!sessionType.isQualifying && (
        <ChartContainer title='Tyre Analysis' loading={loading}>
          {/* Need to reverse for descending order */}
          <StintsChart driverSessions={driverSessions.reverse()} />
        </ChartContainer>
      )}
      {sessionType.isQualifying && (
        <>
          <ChartContainer title='Q3 Tyre Analysis' loading={loading}>
            {/* Need to reverse for descending order */}
            <StintsChart driverSessions={qualifyingSessions.q3.reverse()} />
          </ChartContainer>
          <ChartContainer title='Q2 Tyre Analysis' loading={loading}>
            {/* Need to reverse for descending order */}
            <StintsChart driverSessions={qualifyingSessions.q2.reverse()} />
          </ChartContainer>
          <ChartContainer title='Q1 Tyre Analysis' loading={loading}>
            {/* Need to reverse for descending order */}
            <StintsChart driverSessions={qualifyingSessions.q1.reverse()} />
          </ChartContainer>
        </>
      )}
    </div>
  );
};

const ChartContainer = ({
  title,
  children,
  loading,
}: {
  title: string;
  children: React.ReactNode;
  loading: boolean;
}) => {
  return (
    <div className='border-foreground flex h-125 flex-col rounded border p-4 lg:h-[80dvh]'>
      <div className='z-10 flex w-full flex-wrap items-center gap-4 pb-4'>
        <h2 className='mr-auto flex-1 scroll-m-20 text-2xl font-semibold tracking-tight'>
          {title}
        </h2>
      </div>
      {loading && <Loader />}
      {!loading && children}
    </div>
  );
};

export default Stints;
