import clsx from 'clsx';
import { Link } from '@tanstack/react-router';

import { eventLocationEncode, isFutureDate } from '@/lib/utils';
import { useReadLocalStorage } from '@/hooks/use-storage';

import { SprintBadge } from '@/components/badges/sprint-badge';

import { FragmentType, graphql, useFragment } from '@/types';

const Event_ScheduleFragment = graphql(`
  fragment Event_ScheduleFragment on schedule {
    event_name
    round_number
    event_date
    event_format
    year
    location
    country
    session1
    session1_date
    session2
    session2_date
    session3
    session3_date
    session4
    session4_date
    session5
    session5_date
  }
`);

type ScheduleEventItemProps = {
  event: FragmentType<typeof Event_ScheduleFragment>;
  next: boolean;
  children?: React.ReactNode;
};

export function ScheduleEventItem({
  next,
  children: circuitMap,
  ...props
}: ScheduleEventItemProps) {
  const event = useFragment(Event_ScheduleFragment, props.event);
  const trackTime = useReadLocalStorage('track-time');
  const details = useReadLocalStorage('show-sessions');
  const futureEvent = isFutureDate(event.event_date);
  const numberClass = clsx({
    'bg-secondary': !futureEvent,
    'bg-foreground/90 text-background': futureEvent && next,
    'bg-accent text-accent-foreground': futureEvent && !next,
  });

  const formatDate = (date?: string | null, withTime = false) => {
    if (!date) return;
    return trackTime
      ? new Date(date.slice(0, -6)).toLocaleString(undefined, {
          month: 'short',
          day: 'numeric',
          ...(withTime && {
            hour: '2-digit',
            minute: '2-digit',
            // hourCycle: 'h24',
          }),
        })
      : new Date(date).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          ...(withTime && {
            hour: '2-digit',
            minute: '2-digit',
            // hourCycle: 'h24',
            // timeZoneName: 'short',
          }),
        });
  };
  const sessions = [
    { name: event.session1, date: event.session1_date },
    { name: event.session2, date: event.session2_date },
    { name: event.session3, date: event.session3_date },
    { name: event.session4, date: event.session4_date },
    { name: event.session5, date: event.session5_date },
  ];

  return (
    <li className='flex flex-col overflow-hidden rounded border'>
      <Link
        to='/$year/$event'
        params={{
          year: event.year,
          event: eventLocationEncode(event.event_name),
        }}
        className='group hover:bg-muted flex flex-1 items-center gap-2 pr-4'
        aria-label={`Round ${event.round_number}: ${event.event_name} in ${event.location}, ${event.country} from ${formatDate(event.session1_date!)} to ${formatDate(event.event_date!)}`}
      >
        <div
          className={clsx(
            'border-background flex h-full w-[50px] items-center justify-center border-r text-2xl',
            numberClass,
          )}
        >
          {event.round_number}
        </div>
        <div className='flex-1 py-2'>
          <div className='flex items-center gap-2'>
            <p className='text-sm'>
              {formatDate(event.session1_date)} -
              {formatDate(event.session5_date)}
            </p>
            <SprintBadge format={event.event_format} />
          </div>
          <p className='line-clamp-1 font-semibold group-hover:underline'>
            {event.event_name}
          </p>
          <p className='line-clamp-1 text-sm'>
            {event.location}, {event.country}
          </p>
        </div>
        {circuitMap}
      </Link>

      {details && (
        <div className='border-t px-3 py-2'>
          {sessions.map((s, idx) => (
            <div
              key={idx}
              className={clsx(
                'flex justify-between gap-2 py-1',
                idx > 0 && 'border-t',
              )}
            >
              <p className='flex-1 capitalize'>{s.name?.replace('_', ' ')}</p>
              <p>{formatDate(s.date, true)}</p>
            </div>
          ))}
        </div>
      )}
    </li>
  );
}
