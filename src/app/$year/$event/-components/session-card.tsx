import clsx from 'clsx';
import { ArrowUpRight } from 'lucide-react';
import { Link, useParams } from '@tanstack/react-router';

import { SESSION_KEYS } from '@/lib/constants';
import { eventLocationEncode } from '@/lib/utils';
import { useReadLocalStorage } from '@/hooks/use-storage';

import { FragmentType, graphql, useFragment } from '@/types';

const EventSessionCards = graphql(`
  fragment EventSessionCards on schedule {
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

export function SessionCards({
  availableSessions,
  ...props
}: {
  availableSessions: string[];
  schedule?: FragmentType<typeof EventSessionCards>;
}) {
  const params = useParams({ strict: false }) as { year?: string; event?: string };
  const event = params.event ?? '';
  const year = params.year ?? '';
  const schedule = useFragment(EventSessionCards, props?.schedule);
  const trackTime = useReadLocalStorage('track-time');

  return SESSION_KEYS.map((sessId) => {
    const name = schedule?.[sessId] ?? '';
    const date = schedule?.[`${sessId}_date`] ?? '';

    const availableData = availableSessions.includes(name);
    const sessionEncoded = eventLocationEncode(name);

    const children = (
      <>
        <div className='text-left'>
          <p className='text-sm lg:text-base'>
            {date &&
              (trackTime
                ? new Date(date.slice(0, -6)).toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : new Date(date).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  }))}
          </p>
          <h3 className='truncate text-3xl tracking-tight group-hover:underline'>
            {name ? name.replace('_', ' ') : 'Session cancelled'}
          </h3>
        </div>
        {availableData && <ArrowUpRight className='size-6' />}
      </>
    );

    const commonProps = {
      id: `${name}-session`,
      className: clsx(
        ' flex h-full w-full items-start justify-between gap-1 rounded border px-4 py-2 transition-shadow last:col-span-full',
        availableData && 'group cursor-pointer hover:shadow hover:bg-muted/50',
      ),
      'aria-label': name?.replace('_', ' '),
      tabIndex: 0,
    };

    if (availableData && sessionEncoded) {
      return (
        <Link
          key={sessId}
          to='/$year/$event/$session'
          params={{
            year: parseInt(year, 10) || new Date().getFullYear(),
            event,
            session: sessionEncoded,
          }}
          {...commonProps}
        >
          {children}
        </Link>
      );
    }

    return (
      <div key={sessId} {...commonProps}>
        {children}
      </div>
    );
  });
}

export function SessionCardSkeletons() {
  return Array.from({ length: 5 }).map((_, i) => (
    <div
      key={i}
      className='bg-muted animate-pulse rounded border px-4 py-2 last:col-span-full'
    >
      <div className='mb-2 flex justify-between'>
        <div className='bg-accent/50 h-4 w-24 rounded' />
      </div>
      <div className='bg-accent/50 h-7 w-32 rounded' />
    </div>
  ));
}
