import { gql } from '@apollo/client';

import { graphql } from '@/types';

export const GET_DEBUG_ALL_EVENTS_RACE_LAPS = gql`
  query GetDebugAllEventsRaceLaps @cached {
    events(order_by: [{ year: desc }, { round_number: asc }]) {
      year
      name
      round_number
      race_sessions: sessions(where: { name: { _eq: Race } }) {
        name
        total_laps
      }
    }
  }
`;

export const GET_DEBUG_HIERARCHY = gql`
  query GetDebugHierarchy @cached {
    events(order_by: [{ year: desc }, { round_number: asc }]) {
      year
      name
      round_number
      sessions {
        name
      }
    }
  }
`;

export const GET_DEBUG_SESSION_DRIVERS = gql`
  query GetDebugSessionDrivers(
    $year: Int!
    $round: Int!
    $session: session_name_choices_enum!
  ) @cached {
    sessions(
      limit: 1
      where: {
        event: { year: { _eq: $year }, round_number: { _eq: $round } }
        name: { _eq: $session }
      }
    ) {
      name
      event {
        name
        round_number
        year
      }
      driver_sessions(order_by: { driver: { full_name: asc } }) {
        driver_id
        session_id
        driver {
          abbreviation
          full_name
          number
        }
      }
    }
  }
`;

export const GET_DEBUG_DRIVER_LAPS = gql`
  query GetDebugDriverLaps($driverId: String!, $sessionId: String!) @cached {
    driver_sessions(
      where: { driver_id: { _eq: $driverId }, session_id: { _eq: $sessionId } }
      limit: 1
    ) {
      driver {
        abbreviation
        full_name
        number
      }
      laps(order_by: { lap_number: asc }) {
        lap_number
        lap_time
        sector1
        sector2
        sector3
      }
    }
  }
`;

export const GET_RACE_PLOT_DATA = gql`
  query GetRacePlotData($year: Int!, $event: String!) @cached {
    sessions(
      limit: 1
      where: {
        event: { year: { _eq: $year }, name: { _eq: $event } }
        name: { _eq: Race }
      }
    ) {
      name
      event {
        name
        year
      }
      driver_sessions {
        driver {
          abbreviation
        }
        constructorByConstructorId {
          color
          name
        }
        results(
          where: {
            _or: [
              { grid_position: { _is_null: false } }
              { finishing_position: { _is_null: false } }
            ]
          }
        ) {
          classified_position
        }
        laps(order_by: { lap_number: asc }) {
          lap_number
          lap_time
        }
      }
    }
  }
`;

export const GET_DEBUG_LAP_TELEMETRY = gql`
  query GetDebugLapTelemetry(
    $driverId: String!
    $sessionId: String!
    $lapNumber: Int!
  ) @cached {
    laps(
      limit: 1
      where: {
        lap_number: { _eq: $lapNumber }
        driver_session: {
          driver_id: { _eq: $driverId }
          session_id: { _eq: $sessionId }
        }
      }
    ) {
      lap_number
      telemetries(order_by: { session_time: asc }) {
        time
        session_time
        speed
        throttle
        brake
        gear
        rpm
        x
        y
        z
      }
    }
  }
`;

export const GET_CONSTRUCTOR = gql`
  query GetConstructor($_id: String!) @cached {
    constructors(where: { ergast_id: { _eq: $_id } }) {
      name
      color
      year
      driver_sessions(
        order_by: { session: { event: { year: asc } } }
        where: { session: { total_laps: { _is_null: false } } }
      ) {
        driver {
          full_name
          number
          headshot_url
          country_code
        }
        session {
          name
          event {
            round_number
            name
            year
          }
        }
        results {
          points
          classified_position
          grid_position
        }
      }
    }
  }
`;

export const GET_EVENT_DETAILS = graphql(`
  query GetEventDetails($year: Int!, $event: String!) @cached {
    events(where: { name: { _eq: $event }, year: { _eq: $year } }, limit: 1) {
      scheduleSessions: sessions {
        name
      }
      ...EventSessionResults
    }

    circuits(
      where: {
        year: { _eq: $year }
        sessions: { name: { _eq: Race }, event: { name: { _eq: $event } } }
      }
      limit: 1
    ) {
      ...CircuitDetails
    }

    fia_documents(
      where: { _and: { event_name: { _eq: $event }, year: { _eq: $year } } }
      order_by: { publish_time: desc }
    ) {
      ...FIADocs
    }

    schedule(
      where: { _and: { event_name: { _eq: $event }, year: { _eq: $year } } }
      order_by: { round_number: asc }
    ) {
      location
      country
      event_name
      ...EventSessionCards
      ...ScheduleEventDetails
    }
  }
`);

export const GET_STANDINGS = graphql(`
  query GetStandings($season: Int!) @cached {
    events(where: { year: { _eq: $season } }) {
      round_number
      name
      format
      race_sessions: sessions(where: { name: { _eq: Race } }) {
        driver_sessions {
          driver {
            abbreviation
          }
          constructorByConstructorId {
            name
          }
          results {
            classified_position
          }
        }
      }
    }
    drivers(
      where: { driver_standings: { season: { _eq: $season } } }
      order_by: { driver_standings_aggregate: { max: { points: desc } } }
    ) {
      abbreviation
      full_name
      latest_constructor: driver_sessions(
        limit: 1
        where: {
          session: { event: { year: { _eq: $season } }, name: { _eq: Race } }
          constructorByConstructorId: { name: { _is_null: false } }
        }
        order_by: { session: { event: { round_number: desc } } }
      ) {
        constructor: constructorByConstructorId {
          name
          color
        }
      }
      driver_standings(
        where: { season: { _eq: $season } }
        order_by: { round: asc }
      ) {
        round
        points
        position
      }
    }
    constructors(
      where: { constructor_standings: { season: { _eq: $season } } }
      order_by: { constructor_standings_aggregate: { max: { points: desc } } }
    ) {
      name
      color
      lastRoundPoints: constructor_standings(
        where: { season: { _eq: $season } }
        order_by: { round: desc }
        limit: 1
      ) {
        points
      }
      constructor_standings(
        where: { season: { _eq: $season } }
        order_by: { round: desc }
      ) {
        round
        points
        position
      }
    }
  }
`);

export const GET_SESSION_DETAILS = graphql(`
  query GetSessionDetails(
    $year: Int!
    $event: String!
    $session: session_name_choices_enum!
    $isCompetition: Boolean! = false
    $isQualifying: Boolean! = false
    $isPractice: Boolean! = false
  ) @cached {
    sessions(
      limit: 1
      where: {
        event: { year: { _eq: $year }, name: { _eq: $event } }
        name: { _eq: $session }
      }
    ) {
      name
      driver_sessions {
        constructorByConstructorId {
          name
          color
        }
        driver {
          abbreviation
        }
        results {
          finishing_position
        }
        fastest_lap: laps(limit: 1, order_by: { lap_time: asc }) {
          lap_time
        }
      }
      ...SessionDetails
      ...EventCompetitionResults @include(if: $isCompetition)
      ...EventQualifyingResults @include(if: $isQualifying)
      ...EventPracticeResults @include(if: $isPractice)
    }

    schedule(
      where: { _and: { event_name: { _eq: $event }, year: { _eq: $year } } }
      order_by: { round_number: asc }
      limit: 1
    ) {
      ...ScheduleEventDetails
    }
  }
`);

export const GET_SESSION_RESULTS = gql`
  query SessionResults(
    $year: Int!
    $event: String!
    $session: session_name_choices_enum!
  ) @cached {
    sessions(
      limit: 1
      where: {
        event: { year: { _eq: $year }, name: { _eq: $event } }
        name: { _eq: $session }
      }
    ) {
      name
      event {
        name
      }
      driver_sessions {
        constructorByConstructorId {
          name
          color
        }
        driver {
          abbreviation
          full_name
          number
          headshot_url
        }
        results(
          where: {
            _or: [
              { grid_position: { _is_null: false } }
              { finishing_position: { _is_null: false } }
            ]
          }
        ) {
          grid_position
          finishing_position
          points
          status
          classified_position
          total_race_time
        }
        fastest_lap: laps(order_by: { lap_time: asc }, limit: 1) {
          lap_number
          stint
          lap_time
        }
      }
    }
  }
`;

export const GET_SESSION_FASTEST_TIMES = graphql(`
  query GetSessionFastestTimes(
    $year: Int!
    $event: String!
    $session: session_name_choices_enum!
  ) @cached {
    sessions(
      limit: 1
      where: {
        event: { year: { _eq: $year }, name: { _eq: $event } }
        name: { _eq: $session }
      }
    ) {
      name
      event {
        name
      }
      driver_sessions {
        constructorByConstructorId {
          name
          color
        }
        driver {
          abbreviation
        }
        fastest_lap: laps(order_by: { lap_time: asc }, limit: 1) {
          lap_number
          lap_time
          sector1
          sector2
          sector3
        }
        fastest_sector1: laps(order_by: { sector1: asc }, limit: 1) {
          lap_number
          sector1
        }
        fastest_sector2: laps(order_by: { sector2: asc }, limit: 1) {
          lap_number
          sector2
        }
        fastest_sector3: laps(order_by: { sector3: asc }, limit: 1) {
          lap_number
          sector3
        }
      }
    }
  }
`);

export const GET_SESSION_STINTS = graphql(`
  query GetSessionStints(
    $year: Int!
    $event: String!
    $session: session_name_choices_enum!
  ) @cached {
    sessions(
      limit: 1
      where: {
        event: { year: { _eq: $year }, name: { _eq: $event } }
        name: { _eq: $session }
      }
    ) {
      driver_sessions {
        constructorByConstructorId {
          name
          color
        }
        driver {
          abbreviation
          full_name
        }
        laps {
          lap_number
          stint
          tyre_compound {
            value
          }
          tyre_life
          fresh_tyre
          lap_start_date
        }

        results {
          finishing_position
          q1_time
          q2_time
          q3_time
        }
        fastest_lap: laps(limit: 1, order_by: { lap_time: asc }) {
          lap_time
        }
      }
      race_control_messages(
        where: { scope: { _eq: Track }, flag: { _in: [CHEQUERED] } }
      ) {
        time
      }
    }
  }
`);

export const GET_SESSION_LAP_TIMES = graphql(`
  query GetSessionLapTimes(
    $year: Int!
    $event: String!
    $session: session_name_choices_enum!
  ) @cached {
    sessions(
      limit: 1
      where: {
        event: { year: { _eq: $year }, name: { _eq: $event } }
        name: { _eq: $session }
      }
    ) {
      driver_sessions {
        constructorByConstructorId {
          name
          color
        }
        driver {
          abbreviation
          full_name
          number
        }
        laps_aggregate {
          aggregate {
            avg {
              lap_time
            }
          }
        }
        laps(order_by: { lap_number: asc }) {
          pitin_time
          pitout_time
          lap_number
          lap_time
          compound
          session_time
        }
      }
    }
  }
`);
