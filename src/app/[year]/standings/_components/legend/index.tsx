'use client';

import clsx from 'clsx';
import { Circle } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';

import { DriverBadges } from '@/components/badges/driver-badge';

import { useHiddenItems } from '@/app/[year]/standings/_components/legend/context';

export const Legend = () => {
  const { year } = useParams<{ year: string }>();
  const is2026 = 2026 <= parseInt(year);

  return (
    <div
      className={clsx(
        'grid grid-cols-2 gap-2 p-4',
        // Dynamically set to 6 cols for 2026!
        is2026 ? 'lg:grid-cols-6' : 'lg:grid-cols-5',
      )}
    >
      <DriverFilters />
    </div>
  );
};

export const DriverFilters = () => {
  const showDrivers = useSearchParams().get('chart') !== 'constructors';
  const { data, toggleVisibility, constructorDriversMap } = useHiddenItems();

  const handleDriverClick = (driver: string) => {
    toggleVisibility('drivers', [driver]);
  };

  return constructorDriversMap
    .keys()
    .toArray()
    .map((team) => {
      const constructor = data.constructors.find((c) => c.name === team);
      const color = constructor?.color
        ? `#${constructor?.color}`
        : 'var(--foreground)';

      const drivers = constructorDriversMap.get(team) ?? [];
      return (
        <div
          key={team}
          role='button'
          tabIndex={0}
          className='focus-visible:border-ring focus-visible:ring-ring/50 flex cursor-pointer flex-col justify-start gap-1 rounded border p-2 py-1 outline-none focus-visible:ring-[3px]'
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
          <div className='flex w-full flex-wrap gap-2'>
            <DriverBadges
              className='min-w-12'
              drivers={drivers}
              color={color}
              onClick={showDrivers ? handleDriverClick : null}
              hiddenItems={data.drivers
                .filter((d) => (showDrivers ? d.isHidden : true))
                .map((d) => d.abbreviation ?? '')}
            />
          </div>
        </div>
      );
    });
};
