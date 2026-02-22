import { useRouter } from '@tanstack/react-router';

import { SESSION_KEYS } from '@/lib/constants';
import { eventLocationEncode } from '@/lib/utils';

import { FragmentType, graphql, useFragment } from '@/types';

const ScheduleSessionsFragment = graphql(`
  fragment ScheduleSessions on schedule {
    year
    event_name
    session1
    session2
    session3
    session4
    session5
    session1_date_utc
    session2_date_utc
    session3_date_utc
    session4_date_utc
    session5_date_utc
  }
`);

type EventSessionProps = {
  evt?: FragmentType<typeof ScheduleSessionsFragment>;
};

export function EventSessions(props: EventSessionProps) {
  const evt = useFragment(ScheduleSessionsFragment, props?.evt);
  const router = useRouter();
  if (!evt) return null;
  return (
    <div className='bg-muted flex flex-col justify-evenly px-3 py-2 md:hidden lg:flex'>
      {SESSION_KEYS.map((session) => (
        <div
          className='hover:bg-accent flex cursor-pointer items-center justify-between gap-4 rounded px-1'
          key={evt[session]}
          onClick={() => {
            router.navigate(
              `/${evt.year}/${eventLocationEncode(evt.event_name)}/${eventLocationEncode(evt[session])}`,
            );
          }}
          aria-label={`${evt[session]} of ${evt.year} ${evt.event_name}`}
        >
          <p>{evt[session]?.replace(/_/g, ' ')}</p>
          <p className='text-accent-foreground text-sm'>
            {new Date(evt[`${session}_date_utc`] as string).toLocaleDateString(
              undefined,
              {
                year: '2-digit',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              },
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
