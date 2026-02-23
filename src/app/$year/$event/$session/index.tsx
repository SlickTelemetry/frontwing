import { useQuery } from '@apollo/client/react';
import { createFileRoute, notFound } from '@tanstack/react-router';
import posthog from 'posthog-js';

import {
  COMPETITION_SESSIONS,
  PRACTICE_SESSIONS,
  QUALIFYING_SESSIONS,
} from '@/lib/constants';
import { GET_SESSION_DETAILS } from '@/lib/queries';
import {
  eventLocationDecode,
  sessionDecode,
  sortFastestLaps,
  sortResults,
} from '@/lib/utils';

import { EventDetails } from '@/components/event-details';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';

import {
  ChartViewController,
  SessionHeader,
} from '@/app/$year/$event/$session/-components';
import { SessionItemProvider } from '@/app/$year/$event/$session/-components/driver-filters/context';

import {
  GetSessionDetailsQuery,
  Session_Name_Choices_Enum,
} from '@/types/graphql';

export const Route = createFileRoute('/$year/$event/$session/')({
  component: SessionPage,
});

function SessionPage() {
  const { year, event: eventLoc, session } = Route.useParams();
  const sessionName = sessionDecode(session) as Session_Name_Choices_Enum;

  const isCompetition = COMPETITION_SESSIONS.includes(sessionName);
  const isQualifying = QUALIFYING_SESSIONS.includes(sessionName);
  const isPractice = PRACTICE_SESSIONS.includes(sessionName);

  const { loading, data, error } = useQuery(GET_SESSION_DETAILS, {
    variables: {
      year: parseInt(year),
      event: eventLocationDecode(eventLoc),
      session: sessionName,
      isCompetition,
      isQualifying,
      isPractice,
    },
    notifyOnNetworkStatusChange: false,
  });

  if (error) {
    posthog.capture('graphql_error', error);
  }

  if (error || (!loading && !data)) throw notFound();

  const driverSessions = data?.sessions[0]?.driver_sessions || [];

  let sortedSessions = driverSessions;
  if (data) {
    if (isQualifying || isCompetition) {
      sortedSessions = sortResults(
        driverSessions,
      ) as GetSessionDetailsQuery['sessions'][number]['driver_sessions'];
    }
    if (isPractice) {
      sortedSessions = sortFastestLaps(
        driverSessions,
      ) as GetSessionDetailsQuery['sessions'][number]['driver_sessions'];
    }
  }
  const initialHiddenDrivers = sortedSessions
    .slice(5)
    .map((ds) => ds.driver?.abbreviation || '');

  return (
    <SessionItemProvider
      sessions={driverSessions}
      initialHiddenDrivers={initialHiddenDrivers}
    >
      <div className='p-4 lg:p-6'>
        <Breadcrumbs />
        <div className='grid items-center gap-x-4 gap-y-4 lg:grid-cols-2 xl:grid-cols-4'>
          <div className='xl:col-span-2'>
            <EventDetails session loading={loading} evt={data?.schedule[0]} />
          </div>
          <SessionHeader loading={loading} sessions={data?.sessions} />
        </div>

        <ChartViewController
          data={data}
          sortedSessions={sortedSessions}
          sessionType={{ isCompetition, isQualifying, isPractice }}
        />
      </div>
    </SessionItemProvider>
  );
}
