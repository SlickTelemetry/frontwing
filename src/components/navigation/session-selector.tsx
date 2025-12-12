'use client';

import { useQuery } from '@apollo/client/react';
import { useParams } from 'next/navigation';

import { eventLocationDecode, eventLocationEncode } from '@/lib/utils';
import useUrlUpdater from '@/hooks/use-url-updater';

import {
  BaseSelector,
  SelectorDisabled,
  SelectorSkeleton,
} from '@/components/navigation/selector';

import { graphql } from '@/types';

export const GET_NAV_SESSIONS = graphql(`
  query GetNavSessions($year: Int!, $event: String!) @cached {
    events(
      distinct_on: name
      where: { year: { _eq: $year }, name: { _eq: $event } }
      limit: 1
    ) {
      sessions {
        name
      }
    }
  }
`);

export function SessionSelector() {
  const {
    year,
    event: eventLoc,
    session,
  } = useParams<{
    year: string;
    event?: string;
    session?: string;
  }>();
  const updateUrl = useUrlUpdater();

  const { data, loading, error } = useQuery(GET_NAV_SESSIONS, {
    variables: {
      year: parseInt(year),
      event: eventLocationDecode(eventLoc)!,
    },
    skip: !year || !eventLoc,
  });

  if (loading) return <SelectorSkeleton width='w-32' />;
  if (error || !data?.events?.[0])
    return <SelectorDisabled placeholder='Session' width='w-32' />;

  const event = data.events[0];

  const items = event.sessions
    ?.filter((s) => !!s.name)
    .map(({ name }) => ({
      value: eventLocationEncode(name) as string,
      label: (name ?? '').replace('_', ' '),
    }));

  return (
    <BaseSelector
      value={session}
      placeholder='Session'
      items={items}
      width='w-32'
      onChange={(val) => updateUrl('session', val)}
    />
  );
}
