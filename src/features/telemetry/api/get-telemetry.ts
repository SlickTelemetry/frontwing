'use client';

import { graphql } from '@/types';

export const GetTelemetry = graphql(`
  query GetTelemetry(
    $season: String!
    $event: String_comparison_exp = {}
    $circuit: String_comparison_exp = {}
    $session: session_name_choices_enum
    $lap: Int!
    $driver: String!
  ) {
    telemetry(
      order_by: { session_time: asc }
      where: {
        lap: {
          lap_number: { _eq: $lap }
          driver_session: {
            driver: { abbreviation: { _eq: $driver } }
            session: {
              date: { _regex: $season }
              event: { name: $event }
              name: { _eq: $session }
            }
          }
        }
      }
    ) {
      drs
      gear
      rpm
      speed
      throttle
      brake
      session_time
      distance
      time
    }
  }
`);
