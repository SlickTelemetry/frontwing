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
  drivers,
  color,
  onDriverClick,
  hiddenItems,
  fullWidth,
  ...props
}: React.ComponentProps<'span'> & {
  drivers: string[];
  color: string;
  onDriverClick?: (driver: string, e: React.MouseEvent) => void;
  hiddenItems?: string[];
  fullWidth?: boolean;
}) {
  if (!drivers || drivers.length === 0) return null;

  return (
    <div
      className={clsx(props.className, 'flex gap-x-2', fullWidth && 'w-full')}
    >
      {drivers.map((driver, idx) => (
        <Badge
          key={driver}
          variant='outline'
          onClick={onDriverClick ? (e) => onDriverClick(driver, e) : undefined}
          className={[
            getBorderStyle(idx),
            fullWidth ? 'flex-1' : 'min-w-12',
            onDriverClick && 'cursor-pointer select-none',
            hiddenItems?.includes(driver) ? 'opacity-50' : 'opacity-100',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{ borderColor: color }}
        >
          {driver}
        </Badge>
      ))}
    </div>
  );
}
