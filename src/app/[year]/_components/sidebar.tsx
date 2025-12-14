'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import * as React from 'react';

import { HoverSidebar } from '@/components/hover-sidebar';
import {
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

type SidebarEndpoint = {
  title: string;
  url: string;
  items?: SidebarEndpoint[];
};

const sidebarEndpoints: SidebarEndpoint[] = [
  {
    title: 'Season',
    url: '/$year',
    items: [
      {
        title: 'Map',
        url: '/$year/map',
      },
      {
        title: 'Standings',
        url: '/$year/standings',
      },
    ],
  },
  {
    title: 'Event',
    url: '/$year/$event',
  },
  {
    title: 'Session',
    url: '/$year/$event/$session',
    items: [
      {
        title: 'Fastest Lap',
        url: '/$year/$event/$session?chart=grid',
      },
      {
        title: 'Lap Times',
        url: '/$year/$event/$session?chart=laps',
      },
      {
        title: 'Sector Times',
        url: '/$year/$event/$session?chart=sectors',
      },
      {
        title: 'Strategy',
        url: '/$year/$event/$session?chart=stints',
      },
    ],
  },
];
const formatLink = (url: string, params: DashParams): string | undefined => {
  if (
    (!params.session && url.includes('$session')) ||
    (!params.event && url.includes('$event'))
  ) {
    return;
  }
  return url
    .replace('$year', params.year)
    .replace('$event', params?.event || '')
    .replace('$session', params?.session || 'Race');
};

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof HoverSidebar>) {
  const params = useParams<DashParams>();
  return (
    <HoverSidebar
      className='top-(--header-height) h-[calc(100svh-var(--header-height))]!'
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link
                href='/'
                data-cy='home-logo-link'
                className='bg-sidebar-accent'
              >
                <div className='flex aspect-square size-8 items-center justify-center'>
                  <Image
                    src='/slick-telemetry.png'
                    width={24}
                    height={24}
                    alt='Slick Telemetry Logo'
                  />{' '}
                </div>
                <div className='flex flex-col gap-0.5 leading-none'>
                  <h1 className='font-extrabold'>Slick Telemetry</h1>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className='gap-2'>
            {sidebarEndpoints.map((item) => (
              <SidebarItem key={item.title} item={item} params={params} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </HoverSidebar>
  );
}

function SidebarItem({
  item,
  params,
}: {
  item: SidebarEndpoint;
  params: DashParams;
}) {
  const pathname = usePathname();
  const url = formatLink(item.url, params);
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild isActive={pathname === url}>
        {!url ? (
          <span className='text-muted-foreground cursor-not-allowed font-medium opacity-50'>
            {item.title}
          </span>
        ) : (
          <Link href={url} className='font-medium'>
            {item.title}
          </Link>
        )}
      </SidebarMenuButton>
      {item.items?.length ? (
        <SidebarMenuSub>
          {item.items.map((item) => (
            <SidebarSubItem key={item.title} item={item} params={params} />
          ))}
        </SidebarMenuSub>
      ) : null}
    </SidebarMenuItem>
  );
}

function SidebarSubItem({
  item,
  params,
}: {
  item: SidebarEndpoint;
  params: DashParams;
}) {
  const pathname = usePathname();
  const url = formatLink(item.url, params);
  return (
    <SidebarMenuSubItem key={item.title}>
      <SidebarMenuSubButton asChild isActive={pathname === url}>
        {!url ? (
          <span className='text-muted-foreground cursor-not-allowed opacity-50'>
            {item.title}
          </span>
        ) : (
          <Link href={url}>{item.title}</Link>
        )}
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
