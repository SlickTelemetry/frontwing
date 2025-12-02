'use client';
import { useQuery } from '@apollo/client/react';
import { use } from 'react';

import { GET_SESSION_DETAILS } from '@/lib/queries';
import { eventLocationDecode, sessionDecode } from '@/lib/utils';

import { EventDetails } from '@/components/event-details';
import Breadcrumbs from '@/components/navigation/breadcrumbs';

import {
  ChartViewController,
  SessionHeader,
} from '@/app/[year]/[event]/[session]';

import { Session_Name_Choices_Enum } from '@/types/graphql';

export default function SessionPage({
  params,
}: {
  params: Promise<{ year: string; event: string; session: string }>;
}) {
  const { year, event: eventLoc, session } = use(params);

  const { loading, data } = useQuery(GET_SESSION_DETAILS, {
    variables: {
      year: parseInt(year),
      event: eventLocationDecode(eventLoc),
      session: sessionDecode(session) as Session_Name_Choices_Enum,
    },
  });

  return (
    <div className='p-4 lg:p-6'>
      <Breadcrumbs />
      <div className='grid items-center gap-x-4 gap-y-4 md:grid-cols-2 xl:grid-cols-4'>
        <div>
          <EventDetails session loading={loading} evt={data?.schedule[0]} />
        </div>
        <SessionHeader loading={loading} sessions={data?.sessions} />
      </div>
      <ChartViewController loading={loading} data={data} />
    </div>
  );
}
