import { useQuery } from '@apollo/client/react';
import {
  createFileRoute,
  Link,
  notFound,
  useRouter,
} from '@tanstack/react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import posthog from 'posthog-js';
import { useEffect } from 'react';

import { SUPPORTED_SEASONS } from '@/lib/constants';
import { GET_EVENT_DETAILS } from '@/lib/queries';
import {
  eventLocationDecode,
  eventLocationEncode,
  isAllEmptyArrays,
} from '@/lib/utils';

import { SprintBadge } from '@/components/badges/sprint-badge';
import { CircuitMap } from '@/components/circuit-map';
import { EventDetails } from '@/components/event-details';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { GET_NAV_EVENTS } from '@/components/navigation/event-selector';
import EventResultsContainer from '@/components/results/event-results-container';
import { ToggleLocalStorage } from '@/components/toggle';
import { Button } from '@/components/ui/button';

import { EventWinners } from '@/app/$year/$event/-components/event-winners';
import { FIADocs } from '@/app/$year/$event/-components/fia-docs';
import {
  SessionCardSkeletons,
  SessionCards,
} from '@/app/$year/$event/-components/session-card';

const adjustRightColumnHeight = () => {
  const mainCol = document.getElementById('event-col-left');
  const rightCol = document.getElementById('event-col-right');
  if (mainCol && rightCol && mainCol.offsetHeight > window.innerHeight) {
    rightCol.style.maxHeight = `${mainCol.offsetHeight}px`;
  }
};

export const Route = createFileRoute('/$year/$event/')({
  component: EventPage,
});

function EventPage() {
  const { year, event: eventLoc } = Route.useParams();
  const { loading, data, error } = useQuery(GET_EVENT_DETAILS, {
    variables: {
      year: parseInt(year, 10),
      event: eventLocationDecode(eventLoc),
    },
  });

  useEffect(() => {
    adjustRightColumnHeight();
  }, [data]);

  const eventName = data?.schedule[0]?.event_name;

  if (error) {
    posthog.capture('graphql_error', error);
  }

  if (!SUPPORTED_SEASONS.includes(parseInt(year, 10))) {
    throw notFound({ routeId: '/$year' });
  }

  if (error || (!loading && data && isAllEmptyArrays(data))) {
    throw notFound({ routeId: '/$year/$event' });
  }

  if (!data) return null;

  return (
    <div className='flex grid-cols-3 flex-col gap-x-8 gap-y-4 p-4 lg:grid lg:px-6'>
      <div className='col-span-full grid items-center justify-between gap-4 md:flex'>
        <Breadcrumbs />
        <PrevNextEventButtons eventName={eventName} />
      </div>
      <div id='event-col-left' className='col-span-2 grid h-fit gap-8'>
        <div className='grid gap-1'>
          <EventDetails loading={loading} evt={data?.schedule[0]} />
        </div>
        <div className='grid gap-2'>
          <div className='grid-cols-full'>
            <ToggleLocalStorage id='track-time' initial={false}>
              Track Time
            </ToggleLocalStorage>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            {loading ? (
              <SessionCardSkeletons />
            ) : (
              <SessionCards
                schedule={data?.schedule[0]}
                availableSessions={
                  data?.events[0]?.scheduleSessions.map(
                    (sess) => sess.name ?? '',
                  ) ?? []
                }
              />
            )}
          </div>
        </div>
        <EventResultsContainer
          loading={loading}
          sessions={data?.events ?? []}
        />
      </div>
      <div
        id='event-col-right'
        className='flex flex-1 flex-col gap-8 overflow-hidden'
      >
        <div>
          {loading && (
            <div className='bg-muted/50 h-43.75 w-full animate-pulse rounded'></div>
          )}
          <CircuitMap
            circuitData={data?.circuits[0]}
            className='aspect-auto max-h-100 w-full p-4'
          />

          <EventWinners
            location={data?.schedule[0]?.location}
            country={data?.schedule[0]?.country}
          />
        </div>
        <div className='flex flex-1 flex-col gap-2 overflow-hidden'>
          <FIADocs documents={data?.fia_documents} loading={loading} />
        </div>
      </div>
    </div>
  );
}

function PrevNextEventButtons({ eventName }: { eventName?: string | null }) {
  const { year } = Route.useParams();
  const router = useRouter();
  const { data } = useQuery(GET_NAV_EVENTS, {
    variables: {
      year: parseInt(year, 10),
    },
    skip: !eventName,
  });

  if (!data || !eventName) return null;

  const currEvtIdx = data?.schedule.findIndex(
    (evt) => eventName === evt?.event_name,
  );

  if (currEvtIdx < 0) return null;

  return (
    <div className='flex justify-between gap-4'>
      {currEvtIdx > 0 && data.schedule.at(currEvtIdx - 1) && (
        <Button variant='link' className='truncate' asChild>
          <Link
            to='/$year/$event'
            params={{
              year: year,
              event:
                eventLocationEncode(
                  data.schedule.at(currEvtIdx - 1)?.event_name ?? '',
                ) ?? '',
            }}
          >
            <ChevronLeft />
            {currEvtIdx} |{' '}
            {data.schedule
              .at(currEvtIdx - 1)
              ?.event_name?.replace('Grand Prix', 'GP')}
            <SprintBadge
              format={data.schedule.at(currEvtIdx - 1)?.event_format}
              style='short'
            />
          </Link>
        </Button>
      )}
      {data.schedule.at(currEvtIdx + 1) && (
        <Button variant='link' asChild>
          <Link
            to='/$year/$event'
            params={{
              year: year,
              event:
                eventLocationEncode(
                  data.schedule.at(currEvtIdx + 1)?.event_name ?? '',
                ) ?? '',
            }}
          >
            <div className='flex items-center gap-2'>
              <p className='max-w-40 truncate'>
                {currEvtIdx + 2} |{' '}
                {data.schedule
                  .at(currEvtIdx + 1)
                  ?.event_name?.replace('Grand Prix', 'GP')}
              </p>
              <SprintBadge
                format={data.schedule.at(currEvtIdx + 1)?.event_format}
                style='short'
              />
            </div>
            <ChevronRight />
          </Link>
        </Button>
      )}
    </div>
  );
}
