'use client';

import { useQuery } from '@apollo/client/react';
import { useParams } from 'next/navigation';

import { eventLocationDecode, eventLocationEncode } from '@/lib/utils';
import useUrlUpdater from '@/hooks/use-url-updater';

import { SprintBadge } from '@/components/badges/sprint-badge';
import {
  BaseSelector,
  SelectorDisabled,
  SelectorSkeleton,
} from '@/components/navigation/selector';

import { graphql } from '@/types';

export const GET_NAV_EVENTS = graphql(`
  query GetNavEvents($year: Int!) @cached {
    schedule(order_by: { round_number: asc }, where: { year: { _eq: $year } }) {
      round_number
      event_name
      event_format
    }
  }
`);

export function EventSelector() {
  const updateUrl = useUrlUpdater();

  const { year, event } = useParams<{ year: string; event?: string }>();
  const { data, loading, error } = useQuery(GET_NAV_EVENTS, {
    variables: { year: parseInt(year) },
    skip: !year,
  });

  if (loading) return <SelectorSkeleton width='min-w-48' />;
  if (error || !data?.schedule?.length)
    return <SelectorDisabled placeholder='Event' width='min-w-48' />;

  const items =
    data.schedule.map(({ round_number, event_name, event_format }) => ({
      label: (
        <>
          <p className='w-full'>
            {round_number} | {event_name}
          </p>
          <SprintBadge format={event_format} style='short' />
        </>
      ),
      value: event_name!,
    })) || [];

  return (
    <BaseSelector
      value={eventLocationDecode(event)}
      placeholder='Event'
      items={items}
      onChange={(val) => updateUrl('event', eventLocationEncode(val) as string)}
      width='min-w-48'
    />
  );
}
