import { FINISHING_CLASSIFICATIONS } from '@/lib/constants';
import { formatLapTime } from '@/lib/utils';

import { TableBody, TableCell, TableHead } from '@/components/ui/table';

import { DriverRow, FastestLapCell, HeaderRow } from './driver-table-row';

import { FragmentType, graphql, useFragment } from '@/types';

const EventCompetitionResultsFragment = graphql(`
  fragment EventCompetitionResults on sessions {
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
        classified_position
        grid_position
        total_race_time
        laps
        points
      }
      fastest_lap: laps(limit: 1, order_by: { lap_time: asc }) {
        lap_time
        lap_number
      }
    }
  }
`);

export function CompetitionResults({
  ...props
}: {
  session: FragmentType<typeof EventCompetitionResultsFragment>[];
}) {
  const [session] = useFragment(EventCompetitionResultsFragment, props.session);
  const totalLaps = session.driver_sessions[0]?.results[0].laps;

  return (
    <>
      <HeaderRow>
        <TableHead>Time</TableHead>
        <TableHead>Fastest&nbsp;Lap</TableHead>
        <TableHead className='w-12 text-center'>Points</TableHead>
      </HeaderRow>
      <TableBody>
        {session.driver_sessions.map((s, idx) => {
          const classifiedPos = s.results[0]?.classified_position ?? '';
          const raceTime = s.results[0]?.total_race_time;
          return (
            <DriverRow key={s.driver?.full_name} s={s} idx={idx}>
              <TableCell>
                {classifiedPos in FINISHING_CLASSIFICATIONS ? (
                  FINISHING_CLASSIFICATIONS[
                    classifiedPos as FinishingClassificationCode
                  ]
                ) : (
                  <>
                    {idx !== 0 && '+'}
                    {raceTime
                      ? formatLapTime(raceTime)
                      : `${(totalLaps ?? 0) - (s.results[0]?.laps ?? 0)} Lap`}
                  </>
                )}
              </TableCell>
              <FastestLapCell fastest_lap={s.fastest_lap} />
              <TableCell className='text-center'>
                {s.results[0]?.points ?? '0'}
              </TableCell>
            </DriverRow>
          );
        })}
      </TableBody>
    </>
  );
}
