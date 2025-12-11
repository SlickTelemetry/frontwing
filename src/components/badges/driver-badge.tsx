import clsx from 'clsx';

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

export function DriverBadges({
  className,
  drivers,
  color,
  hiddenItems,
  onClick,
}: React.ComponentProps<'span'> & {
  drivers: string[];
  color: string;
  hiddenItems?: Record<string, boolean>;
}) {
  return drivers.map((driver, idx) => (
    <Badge
      key={driver}
      variant='outline'
      onClick={(e) => onClick && onClick(e)}
      className={clsx(
        className,
        getBorderStyle(idx),
        hiddenItems?.[driver] && 'opacity-50',
      )}
      style={{ borderColor: color }}
    >
      {driver}
    </Badge>
  ));
}
