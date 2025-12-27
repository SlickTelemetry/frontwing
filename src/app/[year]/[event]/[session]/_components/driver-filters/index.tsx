'use client';

import clsx from 'clsx';
import { Circle } from 'lucide-react';

import { DriverBadges } from '@/components/badges/driver-badge';
import { Button } from '@/components/ui/button';

import { useSessionItems } from '@/app/[year]/[event]/[session]/_components/driver-filters/context';

import { GetSessionDetailsQuery } from '@/types/graphql';

export const DriverFilters = ({
  driverSessions,
}: {
  driverSessions?: GetSessionDetailsQuery['sessions'][0]['driver_sessions'];
}) => {
  const {
    hiddenItems,
    resetHidden,
    setAllHidden,
    toggleConstructor,
    toggleDrivers,
  } = useSessionItems();

  if (!driverSessions?.length) return;

  const constructorsWithDrivers = getConstructorsWithDrivers(
    driverSessions,
    hiddenItems,
  );

  return (
    <>
      <div className='flex w-full gap-4'>
        <Button
          size='sm'
          className='flex-1'
          variant='outline'
          onClick={() => resetHidden()}
        >
          Select All
        </Button>
        <Button
          size='sm'
          className='flex-1'
          variant='outline'
          onClick={() => setAllHidden()}
        >
          Clear All
        </Button>
      </div>
      {constructorsWithDrivers.map((constructor) => (
        <div
          key={constructor.name}
          role='button'
          tabIndex={0}
          className='focus-visible:border-ring focus-visible:ring-ring/50 flex cursor-pointer flex-col justify-between gap-1 rounded border p-2 py-1 outline-none focus-visible:ring-[3px]'
          style={{ borderColor: constructor.color }}
          onClick={() => toggleConstructor(constructor.name)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleConstructor(constructor.name);
            }
          }}
          aria-label={`Toggle ${constructor.name}`}
          aria-pressed={constructor.isHidden}
        >
          {/* Constructor Name Toggle */}
          <div
            className={clsx(
              'flex items-center gap-1',
              constructor.isHidden ? 'opacity-50' : 'opacity-100',
            )}
          >
            <Circle fill={constructor.color} stroke='none' className='size-3' />
            <p className='truncate'>{constructor.name}</p>
          </div>

          <DriverBadges
            drivers={constructor.drivers.map(
              (driver) => driver?.abbreviation ?? '',
            )}
            color={constructor.color as string}
            onDriverClick={(driver, e) => {
              e.stopPropagation();
              toggleDrivers([driver]);
            }}
            hiddenItems={hiddenItems}
            fullWidth
          />
        </div>
      ))}
    </>
  );
};

const getConstructorsWithDrivers = (
  sessions: GetSessionDetailsQuery['sessions'][number]['driver_sessions'],
  hiddenItems: string[],
) => {
  // Create a map to group drivers by constructor
  const constructorMap = new Map<
    string,
    {
      name: string;
      color: string;
      drivers: (GetSessionDetailsQuery['sessions'][number]['driver_sessions'][number]['driver'] & {
        isHidden: boolean;
      })[];
      isHidden: boolean;
    }
  >();

  sessions.forEach((session) => {
    const constructorName =
      session.constructorByConstructorId?.name ?? 'Unknown';
    const constructorColor = session.constructorByConstructorId?.color
      ? `#${session.constructorByConstructorId.color}`
      : 'var(--foreground)';

    // If the constructor doesn't exist in the map, initialize it
    if (!constructorMap.has(constructorName)) {
      constructorMap.set(constructorName, {
        name: constructorName,
        color: constructorColor,
        drivers: [],
        isHidden: hiddenItems.includes(constructorName),
      });
    }

    // Add the driver to the constructor's drivers list
    const driver = session.driver;
    if (driver) {
      constructorMap.get(constructorName)?.drivers.push({
        abbreviation: driver.abbreviation,
        isHidden: hiddenItems.includes(driver.abbreviation ?? ''),
      });
    }
  });

  // Convert the map to an array of constructors
  return Array.from(constructorMap.values());
};
