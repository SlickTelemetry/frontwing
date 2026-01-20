'use client';

import { useQuery } from '@apollo/client/react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React from 'react';

import { eventLocationEncode, getTodayMidnightUTC } from '@/lib/utils';

import { SprintBadge } from '@/components/badges/sprint-badge';

import { graphql } from '@/types';

const GetUpcomingEvents = graphql(`
  query GetUpcomingEvents($date: String!) @cached {
    schedule(
      where: { event_date: { _gte: $date } }
      order_by: { round_number: asc }
    ) {
      event_format
      event_name
      round_number
      location
      country
      session1_date_utc
      session5_date_utc
      year
    }
  }
`);

const ScheduleComponent: React.FC = () => {
  const router = useRouter();
  const { data } = useQuery(GetUpcomingEvents, {
    variables: { date: getTodayMidnightUTC() },
  });

  return (
    <div className='scrollbar scrollbar-thumb-accent/50 scrollbar-track-muted flex w-full items-center justify-start gap-4 overflow-x-scroll border border-b p-4'>
      {data?.schedule.map((event) => {
        const firstDate = new Date(
          event.session1_date_utc as string,
        ).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        });

        const lastDate = new Date(
          event.session5_date_utc as string,
        ).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        });

        const border = !['conventional', 'testing'].includes(
          event.event_format || '',
        )
          ? 'border-yellow-400'
          : 'border-foreground';

        return (
          <div
            key={'id-' + event?.event_name + event?.year} // Use event.id for unique key
            className={clsx(
              'w-40 shrink-0 cursor-pointer rounded border',
              border,
            )}
            tabIndex={0}
            aria-label={`View details for ${event.event_name}`}
            onClick={() =>
              router.push(
                `/${event.year}/${eventLocationEncode(event.event_name)}`,
              )
            }
          >
            <p
              className={clsx(
                'truncate border-b px-2 py-1 text-sm leading-snug',
                border,
              )}
            >
              {firstDate} - {lastDate}
            </p>
            <div className='grid gap-1 p-2'>
              <div className='flex items-center gap-2 overflow-hidden'>
                <h3 className='truncate align-bottom text-lg leading-tight font-bold'>
                  {event.event_name?.replace('Grand Prix', 'GP')}
                </h3>
                <SprintBadge style='short' format={event.event_format} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleComponent;
