import { House } from 'lucide-react';
import Link from 'next/link';

import { SidebarHoverTrigger } from '@/components/hover-sidebar';
import {
  EventSelector,
  SeasonSelector,
  ServerStatus,
  SessionSelector,
} from '@/components/navigation';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';

export function Nav() {
  return (
    <header className='bg-background sticky top-0 z-20 flex h-(--header-height) shrink-0 items-center rounded-t-xl border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
      <NavigationMenu viewport={false}>
        <NavigationMenuList className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
          <NavigationMenuItem>
            <SidebarHoverTrigger />
          </NavigationMenuItem>
          <Separator
            orientation='vertical'
            className='mx-2 data-[orientation=vertical]:h-4'
          />
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href='/'>
                <Button
                  data-slot='navigation-home-button'
                  variant='ghost'
                  className='size-7'
                >
                  <House className='stroke-foreground' />
                  <span className='sr-only'>Return home</span>
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <Separator
            orientation='vertical'
            className='mx-2 data-[orientation=vertical]:h-4'
          />
          <NavigationMenuItem>
            <SeasonSelector />
          </NavigationMenuItem>
          <Separator
            orientation='vertical'
            className='mx-2 data-[orientation=vertical]:h-4'
          />
          <NavigationMenuItem>
            <EventSelector />
          </NavigationMenuItem>
          <Separator
            orientation='vertical'
            className='mx-2 data-[orientation=vertical]:h-4'
          />
          <NavigationMenuItem>
            <SessionSelector />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className='absolute right-4'>
        <ServerStatus />
      </div>
    </header>
  );
}
