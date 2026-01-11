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
  className: string;
  label: string;
};

const positionConfig: Record<PositionType, PositionProps> = {
  win: {
    icon: Crown,
    className: 'text-yellow-500',
    label: 'Win',
  },
  p2: {
    icon: Tally2,
    className: 'text-gray-400',
    label: 'P2',
  },
  p3: {
    icon: Tally3,
    className: 'text-amber-600',
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
  if (!type || count === 0) return <div className='w-11'></div>;

  const { icon: Icon, className, label } = positionConfig[type];
  const tooltipText = `${count} ${label}${count !== 1 ? 's' : ''}`;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant='outline' className='w-11 gap-0.5'>
          <Icon className={className} />
          <span>{count}</span>
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  );
}
