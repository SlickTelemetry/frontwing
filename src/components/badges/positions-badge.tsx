import { Crown, LucideIcon, Tally2, Tally3 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type PositionType = 'win' | 'p2' | 'p3';

const positionConfig: Record<
  PositionType,
  {
    icon: LucideIcon;
    color: string;
    label: string;
  }
> = {
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

function PositionBadge({ count, type }: { count: number; type: PositionType }) {
  const { icon: Icon, color, label } = positionConfig[type];

  if (count === 0) {
    return (
      <Badge
        variant='outline'
        className='flex min-w-10 items-center gap-1 px-1.5 py-0.5 text-xs font-medium opacity-0'
      >
        <Icon className='size-3.5' />
        <span>{count}</span>
      </Badge>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge
          variant='outline'
          className='flex min-w-10 items-center justify-center gap-1 px-1.5 py-0.5 text-xs font-medium'
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

export function PositionsBadge({
  positionCounts,
}: {
  positionCounts?: number[];
}) {
  if (!positionCounts) return null;

  const [wins = 0, p2s = 0, p3s = 0] = positionCounts;

  if (wins === 0 && p2s === 0 && p3s === 0) return null;

  return (
    <div className='hidden shrink-0 items-center gap-1 @[500px]:flex'>
      <PositionBadge count={wins} type='win' />
      <PositionBadge count={p2s} type='p2' />
      <PositionBadge count={p3s} type='p3' />
    </div>
  );
}
