'use client';
import { useQuery } from '@apollo/client/react';
import { use } from 'react';

import { GET_EVENT_DETAILS } from '@/lib/queries';
import { eventLocationDecode } from '@/lib/utils';

import { EventDetails } from '@/components/event-details';
import Breadcrumbs from '@/components/navigation/breadcrumbs';

import { ChartViewController } from '@/app/[year]/[event]/[session]';

export default function SessionPage({
  params,
}: {
  params: Promise<{ year: string; event: string; session: string }>;
}) {
  const { year, event: eventLoc, session } = use(params);

  const { loading, data } = useQuery(GET_EVENT_DETAILS, {
    variables: {
      year: parseInt(year),
      event: eventLocationDecode(eventLoc),
    },
  });
  return (
    <div className='p-4 lg:p-6'>
      <Breadcrumbs />
      <EventDetails evt={data?.schedule[0]} session={session} />
      <ChartViewController loading={loading} data={data} />
    </div>
  );
}
