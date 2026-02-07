import { useQuery } from '@apollo/client/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { SUPPORTED_SEASONS } from '@/lib/constants';
import { eventLocationDecode, eventLocationEncode } from '@/lib/utils';

import { SprintBadge } from '@/components/badges/sprint-badge';
import { Separator } from '@/components/ui/separator';

import { FragmentType, graphql, useFragment } from '@/types';

const ScheduleEventDetailFragment = graphql(`
  fragment ScheduleEventDetails on schedule {
    year
    event_name
    event_date
    round_number
    location
    country
    event_format
  }
`);

type EventDetailsProps = {
  evt?: FragmentType<typeof ScheduleEventDetailFragment>;
  session?: boolean;
  maxRounds?: number;
  loading?: boolean;
};
export function EventDetails({
  maxRounds,
  session = false,
  loading = false,
  ...props
}: EventDetailsProps) {
  const evt = useFragment(ScheduleEventDetailFragment, props?.evt);
  if (loading) return <EventDetailsSkeleton />;
  if (!evt) return null;
  return (
    <>
      {/* Event Title */}

      {session ? (
        <h2 className='line-clamp-1 scroll-m-20 text-5xl leading-[1.1] font-medium tracking-tight text-balance'>
          {evt.event_name}
        </h2>
      ) : (
        <h1 className='pointer-cursor line-clamp-1 scroll-m-20 text-5xl leading-[1.1] font-medium tracking-tight text-balance'>
          <Link
            className='hover:underline focus:underline'
            href={`/${evt.year}/${eventLocationEncode(evt.event_name)}`}
          >
            {evt.event_name}
          </Link>
        </h1>
      )}

      {/* Attributes */}
      <p className='text-lg'>
        {evt.location}, {evt.country}
      </p>
      <div className='flex items-center text-sm md:text-base'>
        <p>
          {new Date((evt.event_date as string).slice(0, -6)).toLocaleDateString(
            undefined,
            {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            },
          )}
        </p>

        <Separator
          orientation='vertical'
          className='mx-2 data-[orientation=vertical]:h-4'
        />
        <p>
          Round {evt.round_number}
          {maxRounds && maxRounds >= 1 ? `/${maxRounds}` : ''}
        </p>
        {evt.event_format !== 'conventional' && (
          <Separator
            orientation='vertical'
            className='mx-2 data-[orientation=vertical]:h-4'
          />
        )}
        <SprintBadge format={evt.event_format} />
      </div>
    </>
  );
}

function EventDetailsSkeleton() {
  return (
    <div className='grid animate-pulse gap-1 py-2'>
      <div className='bg-accent/50 h-9 w-72 rounded'></div>
      <div className='bg-accent/50 h-7 w-36 rounded'></div>
      <div className='bg-accent/50 h-7 w-96 rounded'></div>
    </div>
  );
}

export function PossibleEvents() {
  const { year, event } = useParams<{ year: string; event?: string }>();
  const supportedYear = SUPPORTED_SEASONS.includes(parseInt(year));
  const { data } = useQuery(
    graphql(`
      query GetSeasonEventNames($year: Int!, $event: String!) @cached {
        schedule(
          where: {
            year: { _eq: $year }
            _or: [
              { event_name: { _regex: $event } }
              { country: { _regex: $event } }
              { location: { _regex: $event } }
            ]
          }
        ) {
          event_name
        }
      }
    `),
    {
      variables: {
        year: parseInt(year),
        event: eventLocationDecode(event as string),
      },
      skip: !supportedYear || !event,
    },
  );

  if (!supportedYear || !data || data.schedule.length <= 0) return null;
  return (
    <div className='mt-2 border-t pt-2'>
      <p className='text-xl font-bold'>Did you mean...</p>
      <ul className='list-inside list-disc py-2'>
        {data.schedule.map(({ event_name }) => (
          <li key={event_name}>
            <Link
              className='hover:underline'
              href={`/${year || '2025'}/${eventLocationEncode(event_name)}`}
            >
              {event_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
