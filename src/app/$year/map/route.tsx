import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/$year/map')({
  head: ({ params }: { params: { year: string } }) => ({
    meta: [
      {
        title: `${params.year} Map - Slick Telemetry`,
      },
      {
        name: 'description',
        content: `Explore world map of locations for the ${params.year} F1 season`,
      },
    ],
  }),
  component: MapLayout,
});

function MapLayout() {
  return <Outlet />;
}
