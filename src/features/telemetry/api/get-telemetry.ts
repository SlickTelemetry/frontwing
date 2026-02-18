import { client } from '@/lib/client';

import { graphql } from '@/types';
import { Session_Name_Choices_Enum } from '@/types/graphql';

const GetTelemetry = graphql(`
  query GetTelemetry(
    $year: String!
    $event: String!
    $session: session_name_choices_enum!
    $lap: Int!
  ) {
    driver_sessions(
      where: {
        driver: { abbreviation: { _eq: "RUS" } }
        session: {
          date: { _regex: $year }
          event: { name: { _eq: $event } }
          name: { _eq: $session }
        }
      }
    ) {
      driver {
        full_name
      }
      telemetries(
        where: { lap: { lap_number: { _eq: $lap } } }
        order_by: { session_time: asc }
      ) {
        drs
        gear
        rpm
        speed
        throttle
        brake
        session_time
        time
      }
    }
  }
`);

export async function getTelemetry({
  year,
  event,
  session,
  lap,
}: {
  year: string;
  event: string;
  session: Session_Name_Choices_Enum;
  lap: number;
}) {
  if (!year || !event || !session || !lap) return { data: null, error: null };

  return await client.query({
    query: GetTelemetry,
    variables: {
      year,
      event,
      session,
      lap,
    },
  });
}
