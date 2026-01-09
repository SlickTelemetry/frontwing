'use client';
import { useQuery } from '@apollo/client/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { use, useEffect } from 'react';

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
import { ServerPageError } from '@/components/ServerError';
import { ToggleLocalStorage } from '@/components/toggle';
import { Button } from '@/components/ui/button';

import {
  EventWinners,
  FIADocs,
  SessionCards,
  SessionCardSkeletons,
} from '@/app/[year]/[event]/_components';

const adjustRightColumnHeight = () => {
  const mainCol = document.getElementById('event-col-left');
  const rightCol = document.getElementById('event-col-right');
  if (mainCol && rightCol && mainCol.offsetHeight > window.innerHeight) {
    rightCol.style.maxHeight = `${mainCol.offsetHeight}px`;
  }
};

const EventPage = ({
  params,
}: {
  params: Promise<{ year: string; event: string }>;
}) => {
  const { year, event: eventLoc } = use(params);
  const { loading, data, error } = useQuery(GET_EVENT_DETAILS, {
    variables: {
      year: parseInt(year),
      event: eventLocationDecode(eventLoc),
    },
  });

  useEffect(() => {
    adjustRightColumnHeight();
  }, [data]);

  const eventName = data?.schedule[0]?.event_name;

  if (error) return <ServerPageError msg='Failed to load event details.' />;

  if (!loading && data && isAllEmptyArrays(data)) {
    notFound();
  }

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
                availableSessionCount={
                  data?.events[0]?.sessions_aggregate.aggregate?.count ?? 0
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
          <CircuitMap circuitData={data?.circuits[0]} className='w-full py-0' />

          <EventWinners
            drivers={data?.drivers}
            loading={loading}
            name={eventLoc}
            location={data?.schedule[0]?.location}
          />
        </div>
        <div className='flex flex-1 flex-col gap-2 overflow-hidden'>
          <FIADocs documents={data?.fia_documents} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default EventPage;

const PrevNextEventButtons = ({ eventName }: { eventName?: string | null }) => {
  const { year } = useParams<{ year: string }>();
  const router = useRouter();
  const { data } = useQuery(GET_NAV_EVENTS, {
    variables: {
      year: parseInt(year),
    },
    skip: !eventName,
  });

  if (!data || !eventName) return;
  const currEvtIdx = data?.schedule.findIndex(
    (evt) => eventName === evt?.event_name,
  );

  if (currEvtIdx < 0) return;

  return (
    <div className='flex justify-between gap-4'>
      {currEvtIdx > 0 && data.schedule.at(currEvtIdx - 1) && (
        <Button
          variant='link'
          className='truncate'
          onClick={() =>
            router.push(
              `/${year}/${eventLocationEncode(data.schedule.at(currEvtIdx - 1)?.event_name)}`,
            )
          }
        >
          <ChevronLeft />
          {/* <p> */}
          {currEvtIdx} |{' '}
          {data.schedule
            .at(currEvtIdx - 1)
            ?.event_name?.replace('Grand Prix', 'GP')}
          {/* </p> */}
          <SprintBadge
            format={data.schedule.at(currEvtIdx - 1)?.event_format}
            style='short'
          />
        </Button>
      )}
      {data.schedule.at(currEvtIdx + 1) && (
        <Button
          variant='link'
          onClick={() =>
            router.push(
              `/${year}/${eventLocationEncode(data.schedule.at(currEvtIdx + 1)?.event_name)}`,
            )
          }
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
        </Button>
      )}
    </div>
  );
};
