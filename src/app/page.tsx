import { cookies } from 'next/headers';

import { SUPPORTED_SEASONS } from '@/lib/constants';

import { SidebarHoverProvider } from '@/components/hover-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { AppSidebar } from '@/app/[year]/_components/sidebar';
import SeasonPage from '@/app/[year]/page';
import ScheduleComponent from '@/feature/scrolling-schedule';

export default async function Home() {
  const defaultYear = SUPPORTED_SEASONS[0];

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <>
      <ScheduleComponent />

      <SidebarProvider
        className='relative flex flex-col'
        defaultOpen={defaultOpen}
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 52)',
            '--header-height': 'calc(var(--spacing) * 16)',
          } as React.CSSProperties
        }
      >
        <SidebarHoverProvider>
          {/* <Nav /> */}
          <div className='flex gap-4 p-4'>
            <AppSidebar variant='floating' className='sticky h-fit p-0' />
            <SidebarInset>
              <SeasonPage
                params={Promise.resolve({ year: defaultYear.toString() })}
              />
            </SidebarInset>
          </div>
        </SidebarHoverProvider>
      </SidebarProvider>
    </>
  );
}
