import { createFileRoute, Outlet } from '@tanstack/react-router';

import { Footer } from '@/components/Footer';
import { SidebarHoverProvider } from '@/components/hover-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { Nav } from '@/app/$year/-components/nav';
import { AppSidebar } from '@/app/$year/-components/sidebar';
import YearNotFound from '@/app/$year/-not-found';

export const Route = createFileRoute('/$year')({
  notFoundComponent: YearNotFound,
  head: ({ params }: { params: { year: number } }) => ({
    meta: [
      {
        title: `${params.year} Season - Slick Telemetry`,
      },
      {
        name: 'description',
        content: `See the schedule, standings and explore deeper insights to the ${params.year} F1 season.`,
      },
    ],
  }),
  component: YearLayout,
});

function YearLayout() {
  // TODO!: sidebar defaultOpen — replace next/headers cookies() with a server
  // function or client-side cookie read (see TANSTACK_MIGRATION_PLAN.md Phase 5.4)
  const defaultOpen = true;

  return (
    <>
      <SidebarProvider
        className='flex flex-col'
        defaultOpen={defaultOpen}
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 52)',
            '--header-height': 'calc(var(--spacing) * 16)',
          } as React.CSSProperties
        }
      >
        <SidebarHoverProvider>
          <Nav />
          <div className='flex flex-1'>
            <AppSidebar />
            <SidebarInset className='@container/sidebar'>
              <Outlet />
              <Footer />
            </SidebarInset>
          </div>
        </SidebarHoverProvider>
      </SidebarProvider>
    </>
  );
}
