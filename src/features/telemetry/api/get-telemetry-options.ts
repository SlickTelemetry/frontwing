'use client';
import { useQuery } from '@apollo/client/react';

import { graphql } from '@/types';

const GetTelemetryOptions = graphql(`
  query GetTelemetryOptions {
    circuits(distinct_on: name) {
      name
    }
    seasons: events(distinct_on: year, order_by: { year: desc }) {
      year
    }
    events(order_by: { date: desc }) {
      year
      name
      round_number
      format
      sessions(order_by: { date: desc }) {
        name
        circuit {
          name
        }
      }
    }
  }
`);

export function getTelemetryOptions() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, loading, error } = useQuery(GetTelemetryOptions);

  return { data, loading, error };
}
