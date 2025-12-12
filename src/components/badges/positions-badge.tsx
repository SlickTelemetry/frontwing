import { Crown, LucideIcon, Tally2, Tally3 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type PositionType = 'win' | 'p2' | 'p3';
type PositionProps = {
  icon: LucideIcon;
  color: string;
  label: string;
};

const positionConfig: Record<PositionType, PositionProps> = {
  win: {
    icon: Crown,
    color: 'text-yellow-500',
    label: 'Win',
  },
  p2: {
    icon: Tally2,
    color: 'text-gray-400',
    label: 'P2',
  },
  p3: {
    icon: Tally3,
    color: 'text-amber-600',
    label: 'P3',
  },
};

export function PositionBadge({
  count,
  type,
}: {
  count: number;
  type: PositionType;
}) {
  const { icon: Icon, color, label } = positionConfig[type];

  // TODO: Rework
  // Janky way to keep spacing the same
  if (!count)
    return (
      <Badge
        variant='outline'
        className='flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-medium opacity-0'
      >
        <Icon className={`size-3.5 ${color}`} />
        <span>{count}</span>
      </Badge>
    );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge
          variant='outline'
          className='flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-medium'
        >
          <Icon className={`size-3.5 ${color}`} />
          <span>{count}</span>
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          {count} {label}
          {count > 1 ? 's' : ''}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
