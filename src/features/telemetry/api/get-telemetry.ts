import { client } from '@/lib/client';

import { graphql } from '@/types';

const GetTelemetry = graphql(`
  query GetTelemetry {
    driver_sessions(
      where: {
        driver: { abbreviation: { _eq: "RUS" } }
        session: {
          date: { _regex: "2025" }
          event: { name: { _eq: "Las Vegas Grand Prix" } }
          name: { _eq: Race }
        }
      }
    ) {
      driver {
        full_name
      }
      telemetries(
        where: { driver_session: { laps: { lap_number: { _eq: 1 } } } }
        limit: 750
        offset: 4000
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

export async function getNextEvent() {
  return await client.query({
    query: GetTelemetry,
  });
}
