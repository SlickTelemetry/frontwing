import { formatLapTime } from '@/lib/utils';

import { TableBody, TableCell, TableHead } from '@/components/ui/table';

import { DriverRow, HeaderRow } from './driver-table-row';

import { FragmentType, graphql, useFragment } from '@/types';

const EventQualifyingResults = graphql(`
  fragment EventQualifyingResults on sessions {
    driver_sessions(
      order_by: { results_aggregate: { min: { finishing_position: asc } } }
    ) {
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
      results {
        finishing_position
        q1_time
        q2_time
        q3_time
      }
    }
  }
`);

export function QualifyingResults(props: {
  session: FragmentType<typeof EventQualifyingResults>[];
}) {
  const [session] = useFragment(EventQualifyingResults, props.session);
  return (
    <>
      <HeaderRow>
        <TableHead>Q1</TableHead>
        <TableHead>Q2</TableHead>
        <TableHead>Q3</TableHead>
      </HeaderRow>
      <TableBody>
        {session.driver_sessions.map((s, idx) => {
          return (
            <DriverRow key={s.driver?.full_name} s={s} idx={idx}>
              <TableCell>
                {formatLapTime(s.results[0]?.q1_time) || '--------'}
              </TableCell>
              <TableCell>
                {formatLapTime(s.results[0]?.q2_time) || '--------'}
              </TableCell>
              <TableCell>
                {formatLapTime(s.results[0]?.q3_time) || '--------'}
              </TableCell>
            </DriverRow>
          );
        })}
      </TableBody>
    </>
  );
}
