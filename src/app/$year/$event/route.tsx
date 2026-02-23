import { createFileRoute, Outlet, useParams } from '@tanstack/react-router';

import { SUPPORTED_SEASONS } from '@/lib/constants';
import { eventLocationDecode } from '@/lib/utils';

import NotFoundError from '@/components/errors/not-found-error';
import { PossibleEvents } from '@/components/event-details';

export const Route = createFileRoute('/$year/$event')({
  notFoundComponent: EventNotFound,
  head: ({ params }: { params: { year: string; event: string } }) => {
    const eventName = eventLocationDecode(params.event).replace('Grand Prix', 'GP');
    return {
      meta: [
        {
          title: `${params.year} ${eventName} - Slick Telemetry`,
        },
        {
          name: 'description',
          content: `See the results for ${eventLocationDecode(params.event)} in the ${params.year} F1 season`,
        },
      ],
    };
  },
  component: EventLayout,
});

function EventLayout() {
  return <Outlet />;
}

function EventNotFound() {
  const params = useParams({ strict: false }) as { year?: string };
  const year = params?.year;
  const validYear = year && SUPPORTED_SEASONS.includes(parseInt(year, 10));
  const linkYear = validYear ? year : String(SUPPORTED_SEASONS[0]);
  return (
    <NotFoundError
      title='No Event Found'
      link={{
        href: `/${linkYear}`,
        title: `Back to ${linkYear} Season`,
      }}
    >
      <PossibleEvents />
    </NotFoundError>
  );
}
