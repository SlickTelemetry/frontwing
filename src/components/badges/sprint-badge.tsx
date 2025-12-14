import clsx from 'clsx';

import { isSprintFormat } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';

import { Event_Format_Choices_Enum } from '@/types/graphql';

/**
 * Generates HTML string for short sprint badge (for use in HTML strings/tooltips)
 * Uses shadcn Badge component styling - matches the React Badge component with variant='outline'
 * @param className - Optional additional CSS classes
 */
export const getSprintBadgeHtml = (className = ''): string => {
  return `<span class='inline-flex items-center justify-center rounded-md border h-4 w-4 border-yellow-400 text-[0.65rem] font-medium whitespace-nowrap shrink-0 p-0 text-foreground ${className}'>S</span>`;
};

export const SprintBadge = ({
  format,
  style = 'long',
}: {
  format?: Event_Format_Choices_Enum | null;
  style?: 'short' | 'long';
}) => {
  const short = style === 'short';

  if (!isSprintFormat(format)) return null;
  return (
    <Badge
      data-cy={`sprint-badge-${style}`}
      variant='outline'
      className={clsx('border-yellow-400', short && 'px-1 leading-none')}
    >
      {short ? 'S' : 'Sprint'}
    </Badge>
  );
};
export { isSprintFormat };
