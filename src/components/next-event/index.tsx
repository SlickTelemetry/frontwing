'use client';
import { useQuery } from '@apollo/client/react';
import Link from 'next/link';

import { eventLocationEncode, getTodayMidnightUTC } from '@/lib/utils';

import { SprintBadge } from '@/components/badges/sprint-badge';
import { CircuitMap } from '@/components/circuit-map';
import { Countdown } from '@/components/countdown';
import { NextEventSkeleton } from '@/components/next-event/skeleton';

import { graphql } from '@/types';
import { Event_Format_Choices_Enum } from '@/types/graphql';

const GET_NEXT_EVENT = graphql(`
  query GetNextEvent($today: String!) {
    schedule(
      where: { session5_date_utc: { _gte: $today } }
      order_by: { event_date: asc }
      limit: 1
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

const GET_NEXT_EVENT_CIRCUIT = graphql(`
  query GetNextEventCircuit(
    $location: String!
    $country: String!
    $year: Int!
  ) {
    circuits(
      where: {
        _and: {
          location: { _eq: $location }
          country: { _eq: $country }
          year: { _eq: $year }
        }
      }
      limit: 1
    ) {
      ...CircuitDetails
    }
  }
`);

const scheduleSessionKeys = [
  'session1_date_utc',
  'session2_date_utc',
  'session3_date_utc',
  'session4_date_utc',
  'session5_date_utc',
] as const;

export default function NextEvent() {
  const midnight = getTodayMidnightUTC();

  const { loading, data, error } = useQuery(GET_NEXT_EVENT, {
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
    new Date(lastSession) >= new Date(midnight);

  // Fetch circuit data in parallel if we have a valid event
  const { data: circuitData } = useQuery(GET_NEXT_EVENT_CIRCUIT, {
    variables: {
      location: nextEvent?.location || '',
      country: nextEvent?.country || '',
      year: nextEvent?.year ? nextEvent.year - 1 : new Date().getFullYear() - 1,
    },
    skip: !isValidEvent || !nextEvent?.location || !nextEvent?.country,
  });

  if (loading) return <NextEventSkeleton />;
  if (!isValidEvent) return null;

  return (
    <>
      <div className='flex flex-col items-center justify-between rounded-lg xl:flex-row'>
        <div>
          {/* Subtitle */}
          <div className='flex justify-between gap-4'>
            <p className='font-light uppercase'>Next Event</p>
            {nextEvent.event_format && (
              <SprintBadge
                format={nextEvent.event_format as Event_Format_Choices_Enum}
              />
            )}
          </div>

          {/* Title */}
          <h2 className='text-4xl font-semibold'>
            <Link
              className='line-clamp-1 text-inherit hover:underline'
              href={`/${nextEvent.year}/${eventLocationEncode(nextEvent?.event_name)}`}
              data-cy='next-event-name'
            >
              {[
                nextEvent.round_number,
                nextEvent.event_name?.replace('Grand Prix', 'GP'),
              ]
                .filter(Boolean)
                .join('. ')}
            </Link>
          </h2>

          {/* Location */}
          <p className='line-clamp-1'>
            {nextEvent.location}, {nextEvent.country}
          </p>
        </div>

        {/* Coundown */}
        {lastSession && (
          <div className='xl:mx-4 xl:w-1/3'>
            <hr className='border-foreground mt-2 mb-4 xl:hidden' />
            <Countdown targetDate={lastSession} data-cy='countdown-timer' />
          </div>
        )}
      </div>

      <div className='pt-4 text-center'>
        {nextEvent.location && nextEvent.country && (
          <CircuitMap
            className='aspect-auto w-full lg:max-h-70'
            circuitData={circuitData?.circuits[0]}
          />
        )}
        <p className='text-xs italic'>*Circuit generated from last season</p>
      </div>
    </>
  );
}
