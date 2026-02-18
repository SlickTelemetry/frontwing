'use client';

import Link from 'next/link';

import { SUPPORTED_SEASONS } from '@/lib/constants';

import { ServerStatus } from '@/components/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export const LandingNav = () => {
  return (
    <div className='relative container flex h-12 items-center justify-center self-start md:h-20'>
      <Nav />

      <div className='absolute right-4'>
        <ServerStatus />
        <ThemeToggle />
      </div>
    </div>
  );
};

function Nav() {
  const year = SUPPORTED_SEASONS[0];
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger data-cy='season-selector'>
            Seasons
          </NavigationMenuTrigger>
          {/* Season dropdown */}
          <NavigationMenuContent>
            {SUPPORTED_SEASONS.map((year) => (
              <NavigationMenuLink asChild key={year}>
                <Link href={'/' + year} className='hover:underline'>
                  <p>{year}</p>
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <Link href={`/${year}/standings`} data-cy='nav-link-standings'>
              Standings
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={`/${year}/map`} data-cy='nav-link-map'>
              Map
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
