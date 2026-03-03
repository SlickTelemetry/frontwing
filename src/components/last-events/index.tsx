'use client';
import { useQuery } from '@apollo/client/react';
import Link from 'next/link';

import { eventLocationEncode, getTodayMidnightUTC } from '@/lib/utils';

import { NextEventSkeleton } from '@/components/next-event/skeleton';
import { Button } from '@/components/ui/button';

import { graphql } from '@/types';

const GET_LAST_EVENT = graphql(`
  query GetLastEvent($today: String!) {
    schedule(
      where: { session5_date_utc: { _lte: $today } }
      order_by: { event_date: desc }
      limit: 5
    ) {
      year
      event_name
      round_number
      location
      country
      event_format
      session1_date_utc
      session2_date_utc
      session3_date_utc
      session4_date_utc
      session5_date_utc
    }
  }
`);

const scheduleSessionKeys = [
  'session5_date_utc',
  'session4_date_utc',
  'session3_date_utc',
  'session2_date_utc',
  'session1_date_utc',
] as const;

export default function LastEvents() {
  const midnight = getTodayMidnightUTC();

  const { loading, data, error } = useQuery(GET_LAST_EVENT, {
    variables: { today: midnight },
  });

  const nextEvent = data?.schedule?.[0];
  const lastSession = scheduleSessionKeys
    .map((key) => nextEvent?.[key])
    .find(Boolean);

  const isValidEvent =
    !error &&
    nextEvent &&
    lastSession &&
    new Date(lastSession) <= new Date(midnight);

  if (loading) return <NextEventSkeleton />;
  if (!isValidEvent) return null;

  return (
    <>
      {/* <NextEvent /> */}
      <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-1'>
        {[...data.schedule].map((event) => (
          <div
            className='flex w-full items-center justify-between gap-2 rounded border px-4 py-2'
            key={`${event.year}-${event.round_number}`}
          >
            <div>
              <h2 className='text-lg'>
                <Link
                  className='line-clamp-1 text-inherit hover:underline'
                  href={`/${event.year}/${eventLocationEncode(event?.event_name)}`}
                  data-cy='next-event-name'
                >
                  {[event.round_number, event.event_name]
                    .filter(Boolean)
                    .join('. ')}
                </Link>
              </h2>

              {/* Location */}
              <p className='line-clamp-1 text-sm'>
                {event.location}, {event.country}
              </p>
            </div>
            <div className='flex gap-2'>
              <Button>
                <Link
                  href={`/${event.year}/${eventLocationEncode(event.event_name)}/race`}
                >
                  Results
                </Link>
              </Button>
              <Button variant='outline'>
                <Link
                  href={`/${event.year}/${eventLocationEncode(event.event_name)}/race/telmetry`}
                >
                  Telemetry
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
