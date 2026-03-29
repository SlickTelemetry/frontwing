'use client';
import { useQuery } from '@apollo/client/react';
import Link from 'next/link';

import {
  eventLocationEncode,
  getScheduleLastSessionUtc,
  getScheduleNextEventQuerySinceISO,
  pickNextScheduleEvent,
} from '@/lib/utils';

import { SprintBadge } from '@/components/badges/sprint-badge';
import { CircuitMap } from '@/components/circuit-map';
import { Countdown } from '@/components/countdown';
import { NextEventSkeleton } from '@/components/next-event/skeleton';

import { graphql } from '@/types';
import { Event_Format_Choices_Enum } from '@/types/graphql';

const GET_NEXT_EVENT = graphql(`
  query GetNextEvent($since: String!) {
    schedule(
      where: { session5_date_utc: { _gte: $since } }
      order_by: { event_date: asc }
      limit: 25
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

export default function NextEvent() {
  const since = getScheduleNextEventQuerySinceISO();

  const { loading, data, error } = useQuery(GET_NEXT_EVENT, {
    variables: { since },
  });

  const rows = data?.schedule ?? [];
  const nextEvent = pickNextScheduleEvent(rows);
  const lastSession = nextEvent
    ? getScheduleLastSessionUtc(nextEvent)
    : undefined;

  const isValidEvent = !error && nextEvent && lastSession;

  // Fetch circuit data in parallel if we have a valid event
  const { data: circuitData } = useQuery(GET_NEXT_EVENT_CIRCUIT, {
    variables: {
      location: nextEvent?.location || '',
      country: nextEvent?.country || '',
      year:
        typeof nextEvent?.year === 'number'
          ? nextEvent.year - 1
          : new Date().getFullYear() - 1,
    },
    skip: !isValidEvent || !nextEvent?.location || !nextEvent?.country,
  });

  if (loading) return <NextEventSkeleton />;
  if (!isValidEvent) return null;

  return (
    <div className='flex w-full items-center justify-center gap-4 px-4 lg:grid-cols-2'>
      <div className='flex w-fit flex-col rounded-lg py-4'>
        {/* Subtitle */}
        <div className='flex justify-between gap-4'>
          <p className='text-sm font-light uppercase'>Next Race</p>
          {nextEvent.event_format && (
            <SprintBadge
              format={nextEvent.event_format as Event_Format_Choices_Enum}
            />
          )}
        </div>

        {/* Title */}
        <h2 className='text-2xl'>
          <Link
            className='line-clamp-1 text-inherit hover:underline'
            href={`/${nextEvent.year}/${eventLocationEncode(nextEvent?.event_name)}`}
            data-cy='next-event-name'
          >
            {[nextEvent.round_number, nextEvent.event_name]
              .filter(Boolean)
              .join('. ')}
          </Link>
        </h2>

        {/* Location */}
        <p className='line-clamp-1 text-sm'>
          {nextEvent.location}, {nextEvent.country}
        </p>

        {/* Coundown */}
        {lastSession && (
          <>
            <hr className='border-foreground mt-2 mb-4' />
            <Countdown targetDate={lastSession} data-cy='countdown-timer' />
          </>
        )}
      </div>

      {nextEvent.location && nextEvent.country && (
        <CircuitMap circuitData={circuitData?.circuits[0]} />
      )}
    </div>
  );
}
