import { useQuery } from '@apollo/client/react';

import { ConstructorBadge } from '@/components/badges/constructor-badge';

import { graphql } from '@/types';
import { GetEventWinnersQuery } from '@/types/graphql';

const EventWinnersQuery = graphql(`
  query GetEventWinners($location: String!, $country: String!) @cached {
    results(
      where: {
        classified_position: { _eq: "1" }
        driver_session: {
          session: {
            circuit: {
              location: { _eq: $location }
              country: { _eq: $country }
            }
          }
        }
      }
      order_by: { driver_session: { driver: { year: desc } } }
    ) {
      driver_session {
        driver {
          full_name
          year
        }
        constructor: constructorByConstructorId {
          name
          color
        }
      }
    }
  }
`);

type EventWinnersProps = {
  location?: string | null;
  country?: string | null;
};

export function EventWinners({ location, country }: EventWinnersProps) {
  const { data, loading, error } = useQuery(EventWinnersQuery, {
    variables: {
      location: location ?? '',
      country: country ?? '',
    },
    skip: !location || !country,
  });

  const noWinners = error || (data?.results?.length === 0 && !loading);

  return (
    <div>
      <h2 className='scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight'>
        Winners in {location?.replace('-', '\u2011')}
      </h2>
      <ul className='grid divide-y'>
        {loading && <EventWinnerSkeleton />}

        {data?.results &&
          data?.results?.map(({ driver_session: ds }) => (
            <EventWinner
              key={`${ds?.driver?.year}_${ds?.driver?.full_name}`}
              {...ds}
            />
          ))}

        {noWinners && (
          <li className='py-4 text-center text-sm text-gray-500'>
            No winners data available.
          </li>
        )}
      </ul>
    </div>
  );
}

function EventWinner({
  ...props
}: GetEventWinnersQuery['results'][number]['driver_session']) {
  const team = props?.constructor;
  const driver = props?.driver;

  return (
    <li className='flex items-center gap-2 py-1 last:pb-0'>
      <p className='w-10'>{driver?.year}</p>
      <p className='line-clamp-1 font-medium'>{driver?.full_name}</p>
      {team?.name && (
        <ConstructorBadge
          className='ml-auto'
          color={team?.color}
          name={team.name}
        />
      )}
    </li>
  );
}

function EventWinnerSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <li key={i} className='flex items-center gap-2 py-1 last:pb-0'>
          <div className='h-5 w-10 animate-pulse rounded bg-gray-300 dark:bg-gray-700' />
          <div className='h-5 w-full animate-pulse rounded bg-gray-300 dark:bg-gray-700' />
          <div className='ml-auto h-6 w-24 animate-pulse rounded bg-gray-300 dark:bg-gray-700' />
        </li>
      ))}
    </>
  );
}
