'use client';
import { useQuery } from '@apollo/client/react';
import Link from 'next/link';
import { use } from 'react';

import { GET_EVENT_DETAILS } from '@/lib/queries';
import {
  eventLocationDecode,
  eventLocationEncode,
  sessionDecode,
} from '@/lib/utils';

import { EventDetails } from '@/components/event-details';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { ChartViewController } from '@/app/[year]/[event]/[session]';

export default function SessionPage({
  params,
}: {
  params: Promise<{ year: string; event: string; session: string }>;
}) {
  const { year, event: eventLoc, session } = use(params);

  const { data } = useQuery(GET_EVENT_DETAILS, {
    variables: {
      year: parseInt(year),
      event: eventLocationDecode(eventLoc),
    },
  });
  const eventName = data?.schedule[0]?.event_name;
  return (
    <div className='p-4 lg:p-6'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${year}`}>{year}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${year}/${eventLocationEncode(eventName)}`}>
                {eventName}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {sessionDecode(session).replace('_', ' ')}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <EventDetails evt={data?.schedule[0]} session={session} />
      <ChartViewController />
    </div>
  );
}
