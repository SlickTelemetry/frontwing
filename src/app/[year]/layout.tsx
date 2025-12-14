import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { Footer } from '@/components/Footer';
import { SidebarHoverProvider } from '@/components/hover-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { Nav } from '@/app/[year]/_components/nav';
import { AppSidebar } from '@/app/[year]/_components/sidebar';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> {
  const year = (await params).year;
  return {
    title: `${year} Season - Slick Telemetry`,
    description: `See the schedule, standings and explore deeper insights to the ${year} F1 season.`,
  };
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

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
              {children}
              <Footer />
            </SidebarInset>
          </div>
        </SidebarHoverProvider>
      </SidebarProvider>
    </>
  );
}
