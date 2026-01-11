import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';

export function ConstructorBadge({
  className,
  ...team
}: {
  color?: string | null;
  name?: string | null;
  className?: string;
}) {
  return (
    <Badge
      variant='outline'
      className={cn('inline w-33 text-center text-xs', className)}
      style={{
        borderColor: `#${team?.color}`,
      }}
    >
      {team?.name ?? 'Unknown'}
    </Badge>
  );
}
