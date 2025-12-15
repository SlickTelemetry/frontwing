'use client';

import clsx from 'clsx';
import { Circle } from 'lucide-react';

import { DriverBadges } from '@/components/badges/driver-badge';
import { Button } from '@/components/ui/button';

import { useSessionItems } from '@/app/[year]/[event]/[session]/_components/driver-filters/context';

export const DriverFilters = ({
  showDrivers = true,
}: {
  showDrivers?: boolean;
}) => {
  const { data, toggleVisibility, constructorDriversMap } = useSessionItems();
  return (
    <>
      <div className='flex w-full gap-4'>
        <Button
          size='sm'
          className='flex-1'
          variant='outline'
          onClick={() => toggleVisibility('all')}
        >
          Select All
        </Button>
        <Button
          size='sm'
          className='flex-1'
          variant='outline'
          onClick={() => toggleVisibility('none')}
        >
          Clear All
        </Button>
      </div>
      {constructorDriversMap
        .keys()
        .toArray()
        .map((team) => {
          const constructor = data.constructors.find((c) => c.name === team);
          const color = constructor?.color;

          const drivers = constructorDriversMap.get(team) ?? [];
          return (
            <div
              key={team}
              role='button'
              tabIndex={0}
              className='focus-visible:border-ring focus-visible:ring-ring/50 flex cursor-pointer flex-col justify-between gap-1 rounded border p-2 py-1 outline-none focus-visible:ring-[3px]'
              style={{ borderColor: color }}
              onClick={() => toggleVisibility('constructors', [team])}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleVisibility('constructors', [team]);
                }
              }}
              aria-label={`Toggle ${team}`}
              aria-pressed={
                data.constructors.find((c) => c.name === team)?.isHidden
              }
            >
              {/* **Constructor Name Toggle** */}
              <div
                className={clsx(
                  'flex items-center gap-1',

                  data.constructors.find((c) => c.name === team)?.isHidden
                    ? 'opacity-50'
                    : 'opacity-100',
                )}
              >
                <Circle fill={color} stroke='none' className='size-3' />
                <p className='truncate'>{team}</p>
              </div>

              <DriverBadges
                drivers={drivers}
                color={color as string}
                onDriverClick={(driver, e) => {
                  e.stopPropagation();
                  toggleVisibility('drivers', [driver]);
                }}
                hiddenItems={data.drivers
                  .filter((d) => (showDrivers ? d.isHidden : true))
                  .map((d) => d.abbreviation ?? '')}
                fullWidth
              />
            </div>
          );
        })}
    </>
  );
};
