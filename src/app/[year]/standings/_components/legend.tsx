import clsx from 'clsx';
import { Circle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import { DriverBadges } from '@/components/badges/driver-badge';

type Driver = {
  abbr: string;
  team: string;
  color: string;
  totalPoints: number;
};

type GroupedByConstructor = {
  team: string;
  color: string;
  drivers: string[];
  totalPoints: number;
};

function groupDriversByConstructor(drivers: Driver[]): GroupedByConstructor[] {
  const grouped = drivers.reduce<Map<string, GroupedByConstructor>>(
    (acc, { team, color, abbr, totalPoints }) => {
      const group = acc.get(team) ?? {
        team,
        color,
        drivers: [],
        totalPoints: 0,
      };
      group.drivers.push(abbr);
      group.totalPoints += totalPoints;
      acc.set(team, group);
      return acc;
    },
    new Map(),
  );

  return grouped
    .values()
    .toArray()
    .sort((a, b) => b.totalPoints - a.totalPoints);
}

export const Legend = ({
  standings,
  toggleVisibility,
  hiddenItems,
}: {
  standings: Driver[];
  toggleVisibility: (
    type: 'drivers' | 'constructors' | 'all' | 'none',
    id?: string[],
  ) => void;
  hiddenItems: Record<string, boolean>;
}) => {
  const showDrivers = useSearchParams().get('chart') !== 'constructors';
  const constructorsWithDrivers = groupDriversByConstructor(standings);

  return (
    <div className='grid grid-cols-2 gap-2 p-4 lg:grid-cols-5'>
      {constructorsWithDrivers.map(({ team, drivers, color }) => (
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
          aria-pressed={!hiddenItems[team]}
        >
          {/* **Constructor Name Toggle** */}
          <div
            className={clsx(
              'flex items-center gap-1',
              hiddenItems[team] && 'opacity-50',
            )}
          >
            <Circle fill={color} stroke='none' className='size-3' />
            <p className='truncate'>{team}</p>
          </div>

          <div className='flex w-full gap-x-2'>
            <DriverBadges
              drivers={drivers}
              hiddenItems={hiddenItems}
              color={color}
              className={clsx(
                'flex-1 cursor-pointer select-none',
                !showDrivers && 'opacity-50',
              )}
              onClick={(e) => {
                if (!showDrivers) return;
                // Prevent Constructor from being clicked
                e.stopPropagation();
                toggleVisibility('drivers', [
                  (e.target as HTMLSpanElement).innerHTML,
                ]);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
