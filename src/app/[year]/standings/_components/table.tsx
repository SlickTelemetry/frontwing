import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';

import { ConstructorBadge } from '@/components/badges/constructor-badge';
import { DriverBadges } from '@/components/badges/driver-badge';
import { PositionBadge } from '@/components/badges/positions-badge';
import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  countConstructorPositions,
  countDriverPositions,
} from '@/app/[year]/standings/_components/countback';
import { useHiddenItems } from '@/app/[year]/standings/_components/legend/context';

import { GetStandingsQuery } from '@/types/graphql';

const getConstructorData = (
  constructor: GetStandingsQuery['constructors'][number] & {
    isHidden: boolean;
  },
  events: GetStandingsQuery['events'],
) => {
  const positionCounts = countConstructorPositions(
    constructor.name ?? '',
    events,
  );
  return {
    name: constructor?.name ?? 'Unknown',
    team: constructor?.name ?? 'Unknown',
    abbr: constructor?.name ?? 'Unknown',
    color: constructor?.color ? `#${constructor.color}` : 'var(--foreground)',
    totalPoints: constructor?.lastRoundPoints?.[0]?.points ?? 0,
    positionCounts,
    isHidden: constructor.isHidden,
  };
};

const getDriverData = (
  driver: GetStandingsQuery['drivers'][number] & { isHidden: boolean },
  events: GetStandingsQuery['events'],
) => {
  const constructor = driver.latest_constructor?.[0]?.constructor;
  const positionCounts = countDriverPositions(
    driver.abbreviation ?? '',
    events,
  );
  return {
    abbr: driver.abbreviation ?? '',
    name: driver.full_name ?? '',
    totalPoints: driver.driver_standings?.at(-1)?.points ?? 0,
    team: constructor?.name ?? 'Unknown',
    color: constructor?.color ? `#${constructor.color}` : 'var(--foreground)',
    positionCounts,
    isHidden: driver.isHidden,
  };
};

const calculateGap = (currentPoints: number, previousPoints: number | null) => {
  if (previousPoints !== 0 && !previousPoints) {
    return '-';
  }
  const diff = previousPoints - currentPoints;
  return diff === 0 ? '0' : `-${diff}`;
};

export function Table({
  events,
  chartType,
}: {
  events: GetStandingsQuery['events'];
  chartType: 'drivers' | 'constructors';
}) {
  const { constructorDriversMap, toggleVisibility, data } = useHiddenItems();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartIndex, setDragStartIndex] = useState<number | null>(null);
  const [dragEndIndex, setDragEndIndex] = useState<number | null>(null);

  const isConstructorView = chartType === 'constructors';
  const tableItems = isConstructorView
    ? data.constructors.map((c) => getConstructorData(c, events))
    : data.drivers.map((d) => getDriverData(d, events));

  const handleMouseDown = (index: number) => {
    setIsDragging(true);
    setDragStartIndex(index);
    setDragEndIndex(index);
  };

  const handleMouseEnter = (index: number) => {
    if (isDragging && dragStartIndex !== null) {
      setDragEndIndex(index);
    }
  };

  const handleMouseUp = useCallback(() => {
    if (isDragging && dragStartIndex !== null && dragEndIndex !== null) {
      // Check if it's a single item click (start and end are the same)
      if (dragStartIndex === dragEndIndex) {
        // Single item click - just toggle that item
        const item = tableItems[dragStartIndex];
        if (item) {
          toggleVisibility(chartType, [item.abbr]);
        }
      } else {
        // Multi-item drag selection
        const startIndex = Math.min(dragStartIndex, dragEndIndex);
        const endIndex = Math.max(dragStartIndex, dragEndIndex);
        const itemsToToggle = tableItems
          .slice(startIndex, endIndex + 1)
          .map((item) => item.abbr);

        toggleVisibility(chartType, itemsToToggle);
      }

      setIsDragging(false);
      setDragStartIndex(null);
      setDragEndIndex(null);
    }
  }, [
    isDragging,
    dragStartIndex,
    dragEndIndex,
    tableItems,
    toggleVisibility,
    chartType,
  ]);

  // Handle mouse up events outside the component
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
    }
  }, [isDragging, handleMouseUp]);

  return (
    <TableComponent>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center'>Pos</TableHead>
          <TableHead>{isConstructorView ? 'Constructor' : 'Driver'}</TableHead>
          <TableHead>{isConstructorView ? 'Drivers' : 'Constructor'}</TableHead>
          <TableHead className='w-24 text-center'>Podiums</TableHead>
          <TableHead className='w-8 text-center'>Points</TableHead>
          <TableHead className='w-8 text-center'>Gap</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='[&_tr:last-child]:border-0 [&_tr:last-child]:border-b'>
        {tableItems.map((item, idx, allItems) => {
          const currentPoints = item.totalPoints;
          const previousPoints = allItems[idx - 1]?.totalPoints;
          const gap = calculateGap(currentPoints, previousPoints);
          const [wins = 0, p2s = 0, p3s = 0] = item.positionCounts;

          // Check if this item is in the drag selection range
          const isInDragRange =
            isDragging &&
            dragStartIndex !== null &&
            dragEndIndex !== null &&
            idx >= Math.min(dragStartIndex, dragEndIndex) &&
            idx <= Math.max(dragStartIndex, dragEndIndex);

          return (
            <TableRow
              key={item.name}
              onMouseDown={() => handleMouseDown(idx)}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseUp={handleMouseUp}
              className={clsx('cursor-pointer', {
                'opacity-50': item.isHidden,
                'dark:bg-accent/50 bg-blue-100': isInDragRange,
              })}
              aria-label={`Toggle ${item.name} from chart`}
              style={{ borderColor: item.color }}
            >
              <TableCell className='w-8 shrink-0 text-center'>
                {idx + 1}
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                {/* Constructor badge for driver view - hide first when space is limited */}
                {!isConstructorView && (
                  <div className='hidden min-w-[120px] shrink-0 @[600px]:flex'>
                    <ConstructorBadge
                      className='2xl:text-sm'
                      color={item.color.slice(1)} //remove #
                      name={item.team}
                    />
                  </div>
                )}
                {/* Driver badges for constructor view - hide first when space is limited */}
                {constructorDriversMap.has(item.name) && (
                  <div className='hidden shrink-0 gap-1 overflow-visible @[600px]:flex'>
                    <DriverBadges
                      drivers={constructorDriversMap.get(item.name) || []}
                      color={item.color}
                      className='min-w-12'
                    />
                  </div>
                )}
              </TableCell>
              <TableCell className='hidden shrink-0 items-center gap-1 @[500px]:flex'>
                <PositionBadge count={wins} type='win' />
                <PositionBadge count={p2s} type='p2' />
                <PositionBadge count={p3s} type='p3' />
              </TableCell>
              <TableCell className='min-w-14 shrink-0 text-center'>
                {item.totalPoints}
              </TableCell>
              <TableCell className='min-w-14 shrink-0 text-center'>
                {gap ?? '-'}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </TableComponent>
  );
}
