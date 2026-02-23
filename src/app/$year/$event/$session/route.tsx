import { createFileRoute, Outlet, useParams } from '@tanstack/react-router';

import { SUPPORTED_SEASONS } from '@/lib/constants';
import { eventLocationDecode, sessionDecode } from '@/lib/utils';

import NotFoundError from '@/components/errors/not-found-error';

export const Route = createFileRoute('/$year/$event/$session')({
  validateSearch: (search: Record<string, unknown>) => ({
    chart: ['grid', 'laps', 'stints', 'sectors'].includes(
      search.chart as string,
    )
      ? (search.chart as 'grid' | 'laps' | 'stints' | 'sectors')
      : 'grid',
    drivers: typeof search.drivers === 'string' ? search.drivers : undefined,
  }),
  notFoundComponent: SessionNotFound,
  head: ({
    params,
  }: {
    params: { year: string; event: string; session: string };
  }) => {
    const sessionLabel = sessionDecode(params.session).replace('_', ' ');
    const eventLabel = eventLocationDecode(params.event).replace(
      'Grand Prix',
      'GP',
    );
    return {
      meta: [
        {
          title: `${sessionLabel} - ${params.year} ${eventLabel} - Slick Telemetry`,
        },
        {
          name: 'description',
          content: `See the F1 results for ${sessionLabel} of the ${params.year} ${eventLocationDecode(params.event)}`,
        },
      ],
    };
  },
  component: SessionLayout,
});

function SessionLayout() {
  return <Outlet />;
}

function SessionNotFound() {
  const params = useParams({ strict: false }) as { year?: string };
  const year = params?.year;
  const validYear = year && SUPPORTED_SEASONS.includes(parseInt(year, 10));
  const linkYear = validYear ? year : String(SUPPORTED_SEASONS[0]);
  return (
    <NotFoundError
      title='No Session Found'
      link={{
        href: `/${linkYear}`,
        title: `Back to ${linkYear} Season`,
      }}
    />
  );
}
