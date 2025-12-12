import clsx from 'clsx';
import { Circle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { ConstructorBadge } from '@/components/badges/constructor-badge';
import { DriverBadges } from '@/components/badges/driver-badge';
import { PositionBadge } from '@/components/badges/positions-badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// TODO duplicate from legend
type Driver = {
  name: string;
  abbr: string;
  team?: string;
  color: string;
  totalPoints: number;
  positionCounts?: number[];
};

const calculateGap = (currentPoints: number, previousPoints: number | null) => {
  if (previousPoints !== 0 && !previousPoints) {
    return 'Gap';
  }
  const diff = previousPoints - currentPoints;
  return diff === 0 ? '0' : `-${diff}`;
};

export function StandingsTable({
  items,
  toggleItem,
  hiddenItems,
  driversByConstructor,
}: {
  items: Driver[];
  toggleItem: (items: string[]) => void;
  hiddenItems: Record<string, boolean>;
  driversByConstructor?: Map<string, string[]>;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartIndex, setDragStartIndex] = useState<number | null>(null);
  const [dragEndIndex, setDragEndIndex] = useState<number | null>(null);
  const isConstructorView = !!driversByConstructor;

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
        const item = items[dragStartIndex];
        if (item) {
          toggleItem([item.abbr]);
        }
      } else {
        // Multi-item drag selection
        const startIndex = Math.min(dragStartIndex, dragEndIndex);
        const endIndex = Math.max(dragStartIndex, dragEndIndex);
        const itemsToToggle = items
          .slice(startIndex, endIndex + 1)
          .map((item) => item.abbr);

        toggleItem(itemsToToggle);
      }

      setIsDragging(false);
      setDragStartIndex(null);
      setDragEndIndex(null);
    }
  }, [isDragging, dragStartIndex, dragEndIndex, items, toggleItem]);

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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Pos</TableHead>
          <TableHead>{isConstructorView ? 'Constructor' : 'Driver'}</TableHead>
          <TableHead>{isConstructorView ? 'Drivers' : 'Constructor'}</TableHead>
          <TableHead className='w-24 text-center'>Podiums</TableHead>
          <TableHead className='text-center'>Points</TableHead>
          <TableHead className='text-center'>Gap</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, idx, allItems) => {
          const currentPoints = item.totalPoints;
          const previousPoints = allItems[idx - 1]?.totalPoints;
          const gap = calculateGap(currentPoints, previousPoints);

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
              className={clsx(
                'bg-background min-w-0 cursor-pointer select-none',
                {
                  'opacity-50': hiddenItems[item.abbr],
                  'dark:bg-accent/50 bg-blue-200': isInDragRange,
                },
              )}
              aria-label={`Toggle ${item.name} from chart`}
              // style={{ borderColor: item.color }}
            >
              <TableCell className='w-8 shrink-0 text-center'>
                {idx + 1}
              </TableCell>
              <TableCell>
                <div className='flex gap-2'>
                  <Circle
                    fill={item.color}
                    stroke='none'
                    className='size-4 shrink-0'
                  />
                  <p className='min-w-[120px] flex-1 truncate'>{item.name}</p>
                </div>
              </TableCell>

              <TableCell>
                {/* Driver badges for constructor view - hide first when space is limited */}
                {driversByConstructor &&
                  driversByConstructor.has(item.name) && (
                    <div className='hidden shrink-0 gap-2 overflow-visible @[600px]:flex'>
                      <DriverBadges
                        drivers={driversByConstructor.get(item.name) || []}
                        color={item.color}
                        className='min-w-12'
                      />
                    </div>
                  )}
                {/* Constructor badge for driver view - hide first when space is limited */}
                {item.team && !isConstructorView && (
                  <div className='hidden min-w-[120px] shrink-0 @[600px]:flex'>
                    <ConstructorBadge
                      className='2xl:text-sm'
                      color={item.color.slice(1)} //remove #
                      name={item.team}
                    />
                  </div>
                )}
              </TableCell>
              <TableCell>
                <div className='flex gap-2'>
                  {/* Position icons and counts - hide after badges are hidden */}
                  <PositionBadge
                    type='win'
                    count={item.positionCounts?.[0] ?? 0}
                  />
                  <PositionBadge
                    type='p2'
                    count={item.positionCounts?.[1] ?? 0}
                  />
                  <PositionBadge
                    type='p3'
                    count={item.positionCounts?.[2] ?? 0}
                  />
                </div>
              </TableCell>
              <TableCell className='min-w-14 shrink-0 text-center'>
                {item.totalPoints}
              </TableCell>
              <TableCell className='min-w-14 shrink-0 text-center'>
                {gap ?? 'Gap'}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
