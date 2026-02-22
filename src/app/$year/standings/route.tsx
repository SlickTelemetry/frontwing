import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/$year/standings')({
  head: ({ params }: { params: { year: string } }) => ({
    meta: [
      {
        title: `${params.year} Standings - Slick Telemetry`,
      },
      {
        name: 'description',
        content: `Live standings of the ${params.year} F1 season`,
      },
    ],
  }),
  component: StandingsLayout,
});

function StandingsLayout() {
  return <Outlet />;
}
