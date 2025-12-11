import clsx from 'clsx';
import { Circle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { ConstructorBadge } from '@/components/badges/constructor-badge';
import { DriverBadges } from '@/components/badges/driver-badge';
import { PositionsBadge } from '@/components/badges/positions-badge';

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

export function Table({
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

  return items.map((item, idx, allItems) => {
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

    const isConstructorView = !!driversByConstructor;

    return (
      <div
        key={item.name}
        onMouseDown={() => handleMouseDown(idx)}
        onMouseEnter={() => handleMouseEnter(idx)}
        onMouseUp={handleMouseUp}
        className={clsx(
          'bg-background flex min-w-0 cursor-pointer flex-nowrap items-center divide-x rounded border py-1 select-none',
          {
            'opacity-50': hiddenItems[item.abbr],
            'dark:bg-accent/50 bg-blue-100': isInDragRange,
          },
        )}
        aria-label={`Toggle ${item.name} from chart`}
        // style={{ borderColor: item.color }}
      >
        <p className='w-8 shrink-0 text-center'>{idx + 1}</p>
        <div className='flex min-w-0 flex-1 items-center gap-2 px-2'>
          <Circle fill={item.color} stroke='none' className='size-4 shrink-0' />
          <div className='flex min-w-0 flex-1 items-center gap-2 overflow-hidden'>
            <p className='min-w-[120px] flex-1 truncate'>{item.name}</p>
            {/* Position icons and counts - hide after badges are hidden */}
            <PositionsBadge positionCounts={item.positionCounts} />
            {/* Driver badges for constructor view - hide first when space is limited */}
            {driversByConstructor && driversByConstructor.has(item.name) && (
              <div className='hidden shrink-0 gap-x-2 overflow-visible @[600px]:flex'>
                <DriverBadges
                  drivers={driversByConstructor.get(item.name) ?? []}
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
          </div>
        </div>
        <p className='min-w-14 shrink-0 text-center'>{item.totalPoints}</p>
        <p className='min-w-14 shrink-0 text-center'>{gap ?? 'Gap'}</p>
      </div>
    );
  });
}
