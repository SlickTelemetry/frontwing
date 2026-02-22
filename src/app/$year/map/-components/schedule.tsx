import clsx from 'clsx';

import { FragmentType, graphql, useFragment } from '@/types';

const MapScheduleFragment = graphql(`
  fragment MapScheduleFragment on schedule {
    event_name
    round_number
    event_date
    year
  }
`);

export const Schedule = ({
  selectEvent,
  activeEvent,
  ...props
}: {
  events?: FragmentType<typeof MapScheduleFragment>[];
  activeEvent: string | null;
  selectEvent: (event: string) => void;
}) => {
  const events = useFragment(MapScheduleFragment, props?.events);

  if (!events || events.length === 0) return null;
  const now = new Date();

  return (
    <div className='hidden h-fit min-w-[250px] lg:@5xl/sidebar:block'>
      <div className='grid divide-y overflow-hidden rounded border'>
        {events?.map((e) => {
          const name = e.event_name ?? '';
          // custom color logic so colors don't overwrite map markers
          const date = e.event_date ? new Date(e.event_date) : now;
          return (
            <div
              key={name}
              className={clsx(
                'hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center gap-2 px-2 py-0.5',
                now < date && 'text-accent',
                activeEvent === name && 'bg-accent/50 text-accent-foreground',
              )}
              onClick={() => selectEvent(name)}
            >
              <div className='flex h-4 w-4 items-center justify-center text-sm'>
                {e.round_number}
              </div>
              <p className='line-clamp-1'>{name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
