'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { SUPPORTED_SEASONS } from '@/lib/constants';

import { ServerStatus } from '@/components/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export const LandingNav = () => {
  return (
    <div className='relative flex h-12 w-full items-center self-start px-4 md:h-20 lg:px-6'>
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
    <NavigationMenu className='hidden sm:block'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <Link href='/' data-cy='nav-link-home' className='flex-row gap-2'>
              <Image
                src='/slick-telemetry.png'
                width={24}
                height={24}
                alt='Slick Telemetry Logo'
              />
              <h1 className='scroll-m-20 text-center text-xl font-extrabold tracking-tight text-balance uppercase'>
                Slick Telemetry
              </h1>
            </Link>
          </NavigationMenuLink>
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
