'use client';
import { useQuery } from '@apollo/client/react';

import { graphql } from '@/types';
import {
  Driver_Sessions_Bool_Exp,
  Session_Name_Choices_Enum,
} from '@/types/graphql';

const GetTelemetryDriverLaps = graphql(`
  query GetTelemetryDriverLaps(
    $where: driver_sessions_bool_exp!
    $driver: String!
  ) {
    drivers(
      where: { abbreviation: { _eq: $driver }, driver_sessions: $where }
      order_by: { full_name: asc }
      limit: 1
    ) {
      abbreviation
      full_name
      driver_sessions(where: $where) {
        session {
          name
        }
        constructor: constructorByConstructorId {
          name
          color
        }
        laps {
          lap_number
          lap_time
          compound
          fresh_tyre
        }
      }
    }
  }
`);

type TelemetryDriverFilter =
  | {
      mode: 'circuit';
      circuit: string;
    }
  | {
      mode: 'event';
      event: string;
      season: number;
    };

export function buildDriverLapsWhere(
  filter: TelemetryDriverFilter,
): Driver_Sessions_Bool_Exp {
  if (filter.mode === 'circuit') {
    return {
      session: {
        circuit: {
          name: { _eq: filter.circuit },
        },
      },
    };
  }

  // event mode
  return {
    session: {
      event: {
        name: { _eq: filter.event },
        year: { _eq: filter.season },
      },
    },
  };
}

export interface GetTelemetryProps {
  season?: number;
  event?: string | null;
  circuit?: string;
  session?: Session_Name_Choices_Enum | null;
  driver?: string;
  laps?: number[];
}

export function getTelemetryDriverLaps({
  driver,
  season,
  event,
  circuit,
  session,
}: GetTelemetryProps) {
  if (!season || !session || !driver || (!circuit && !event)) {
    return { data: null, error: null };
  }

  const where = buildDriverLapsWhere({
    mode: 'event',
    // circuit,
    event: event as string,
    season,
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, loading, error } = useQuery(GetTelemetryDriverLaps, {
    variables: {
      where,
      driver,
    },
    skip: !driver,
  });

  return { data, loading, error };
}
