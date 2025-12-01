import { TableBody, TableCell, TableHead } from '@/components/ui/table';

import { DriverRow, FastestLapCell, HeaderRow } from './driver-table-row';

import { FragmentType, graphql, useFragment } from '@/types';

const EventPracticeResults = graphql(`
  fragment EventPracticeResults on sessions {
    driver_sessions(order_by: { laps_aggregate: { min: { lap_time: asc } } }) {
      driver {
        abbreviation
        full_name
        number
        headshot_url
      }
      constructorByConstructorId {
        color
        name
      }
      fastest_lap: laps(limit: 1, order_by: { lap_time: asc }) {
        lap_time
        lap_number
      }
      laps_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`);

export function PracticeResults(props: {
  session: FragmentType<typeof EventPracticeResults>[];
}) {
  const [session] = useFragment(EventPracticeResults, props.session);
  return (
    <>
      <HeaderRow>
        <TableHead>Fastest&nbsp;Lap</TableHead>
        <TableHead className='w-12 text-center'>Laps</TableHead>
      </HeaderRow>
      <TableBody>
        {session.driver_sessions.map((s, idx) => {
          return (
            <DriverRow key={s.driver?.full_name} s={s} idx={idx}>
              <FastestLapCell fastest_lap={s.fastest_lap} />
              <TableCell className='text-center'>
                {s.laps_aggregate.aggregate?.count ?? '--'}
              </TableCell>
            </DriverRow>
          );
        })}
      </TableBody>
    </>
  );
}
