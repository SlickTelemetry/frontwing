import clsx from 'clsx';
import { MouseEvent } from 'react';

import { Badge } from '@/components/ui/badge';

const getBorderStyle = (idx: number) => {
  // Cycle through border styles: solid, dashed, dotted, double
  const borderStyles = [
    'border-solid',
    'border-dashed',
    'border-dotted',
    'border-double',
  ];
  return borderStyles[idx % 4];
};

interface DriverBadgesProps {
  drivers: string[];
  color: string;
  onClick?: ((d: string) => void) | null;
  className?: string;
  hiddenItems?: string[];
}

export function DriverBadges({
  className,
  drivers,
  color,
  hiddenItems,
  onClick,
}: DriverBadgesProps) {
  const handleClick = (e: MouseEvent<HTMLSpanElement>, driver: string) => {
    if (!onClick) return;

    e.stopPropagation();
    onClick(driver);
  };

  return drivers.map((driver, idx) => (
    <Badge
      key={driver}
      variant='outline'
      data-driver={driver}
      onClick={(e) => handleClick(e, driver)}
      className={clsx(
        className,
        getBorderStyle(idx),
        hiddenItems?.includes(driver) && 'opacity-50',
      )}
      style={{ borderColor: color }}
    >
      {driver}
    </Badge>
  ));
}
