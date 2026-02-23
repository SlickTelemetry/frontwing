import { useQuery } from '@apollo/client/react';
import { createFileRoute, notFound, useRouter } from '@tanstack/react-router';
import posthog from 'posthog-js';

import { eventLocationDecode, eventLocationEncode } from '@/lib/utils';

import { EventDetails } from '@/components/event-details';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { ResultsMarquee } from '@/components/results-marquee';

import { MapLoader } from './-components/map/loader';
import { MapContent } from './-components/map/map';
import { Schedule } from './-components/schedule';
import { TopThree } from './-components/top-three';

import { graphql } from '@/types';

const GET_SCHEDULE = graphql(`
  query GetMapSchedule($year: Int!) @cached {
    schedule(where: { year: { _eq: $year } }, order_by: { round_number: asc }) {
      event_name
      ...MapScheduleFragment
      ...MapScheduleLocation
      ...ScheduleEventDetails
      ...ScheduleSessions
    }
    events(where: { year: { _eq: $year } }) {
      name
      ...RaceResults
      ...TopThreeRaceResults
    }
  }
`);

export const Route = createFileRoute('/$year/map/')({
  validateSearch: (search: Record<string, unknown>) => ({
    event: typeof search.event === 'string' ? search.event : undefined,
  }),
  component: MapPage,
});

function MapPage() {
  const { year } = Route.useParams();
  const { event: eventParam } = Route.useSearch();
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_SCHEDULE, {
    variables: { year: parseInt(year) },
  });

  const selection =
    ((eventParam ? eventLocationDecode(eventParam) : null) ||
      data?.schedule[0]?.event_name) ??
    null;

  const handleNewSelected = (event: string) => {
    router.navigate({
      to: '/$year/map',
      params: { year },
      search: { event: eventLocationEncode(event) ?? '' },
      replace: true,
    });
  };

  if (loading)
    return (
      <MapPageLoader year={year}>
        <MapLoader loading />
      </MapPageLoader>
    );

  if (error) {
    posthog.capture('graphql_error', error);
  }

  if (error || !data || data?.schedule?.length === 0) {
    throw notFound({ routeId: '/$year' });
  }

  const activeScheduleEvent = data.schedule.find(
    (evt) => evt.event_name === selection,
  );
  const activeEvent = data.events?.find((e) => e.name === selection);

  return (
    <div className='flex gap-4 p-4 lg:px-6'>
      <div>
        <div className='py-2'>
          <Breadcrumbs />
        </div>

        {data.schedule && (
          <Schedule
            events={data.schedule}
            activeEvent={selection}
            selectEvent={handleNewSelected}
          />
        )}
      </div>

      <div className='h-fit flex-1 overflow-hidden rounded border'>
        <div className='flex justify-between'>
          <div className='relative flex flex-1 items-center justify-between gap-4 overflow-hidden px-4 py-2'>
            <div className='flex-1'>
              <EventDetails
                evt={activeScheduleEvent}
                maxRounds={data.schedule.length}
              />
            </div>
            <TopThree evt={activeEvent} />
          </div>
        </div>

        <MapContent
          events={data.schedule}
          selectedEvent={selection}
          onClickAction={handleNewSelected}
        />
        <ResultsMarquee evt={activeEvent} />
      </div>
    </div>
  );
}

function MapPageLoader({
  year,
  children,
}: {
  year: string;
  children?: React.ReactNode;
}) {
  return (
    <div className='flex gap-4 p-4 lg:px-6'>
      <div className='min-w-[250px]'>
        <h1 className='py-2 text-center text-xl'>{year} Schedule</h1>
        <div className='grid animate-pulse divide-y overflow-hidden rounded border'>
          {Array.from(Array(18)).map((_v, idx) => (
            <div
              key={`map-schedule-skeleton-${idx}`}
              className='bg-accent/50 h-7 w-full'
            />
          ))}
        </div>
      </div>
      <div className='flex-1 rounded border'>
        <div className='grid animate-pulse gap-1 px-4 py-2'>
          <div className='bg-accent/50 h-9 w-72 rounded' />
          <div className='bg-accent/50 h-7 w-36 rounded' />
          <div className='bg-accent/50 h-7 w-96 rounded' />
        </div>
        <div className='relative h-[666px] rounded border'>{children}</div>
      </div>
    </div>
  );
}
