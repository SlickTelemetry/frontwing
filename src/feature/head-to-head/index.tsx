'use client';

import { useQuery } from '@apollo/client/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { columns, DriverRow } from '@/feature/head-to-head/columns';
import { DataTable } from '@/feature/head-to-head/data-table';

import { graphql } from '@/types';

const paramSplitChar = '.';
export const HeadToHeadTable = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const existingDrivers = searchParams.getAll('driver');

  // Build filters for Hasura query
  const driverFilters = useMemo(() => {
    return existingDrivers.map((driver) => {
      const [season, abbr] = driver.split(paramSplitChar);
      return {
        abbreviation: { _eq: abbr },
        year: { _eq: parseInt(season, 10) },
      };
    });
  }, [existingDrivers]);

  // Query all drivers in one go
  const { data, loading, previousData } = useQuery(
    graphql(`
      query GetDriversByList($filters: [drivers_bool_exp!]!) @cached {
        drivers(where: { _or: $filters }) {
          abbreviation
          year
          full_name
          driver_standings(limit: 1, order_by: { round: desc }) {
            position
            points
            wins
          }
          driver_sessions_aggregate {
            aggregate {
              count(columns: session_id, distinct: true)
            }
          }
          driver_sessions {
            laps_aggregate {
              aggregate {
                count(columns: lap_start_time, distinct: true)
              }
            }
          }
        }
      }
    `),
    {
      variables: { filters: driverFilters },
      skip: driverFilters.length === 0,
    },
  );

  const removeDriver = (driver: string) => {
    const params = new URLSearchParams(window.location.search);
    const updatedDrivers = existingDrivers.filter((d) => d !== driver);
    params.delete('driver');
    updatedDrivers.forEach((d) => params.append('driver', d));
    router.push(pathname + '?' + params.toString(), { scroll: false });
  };

  const rows: DriverRow[] = useMemo(() => {
    const dataToUse = loading ? previousData : data;
    if (!dataToUse?.drivers?.length) return [];
    return dataToUse.drivers.map((d) => ({
      id: `${d.year}${paramSplitChar}${d.abbreviation}`,
      abbreviation: d.abbreviation ?? '',
      season: d.year ?? 0,
      driver: d.full_name ?? '',
      position: d.driver_standings[0]?.position,
      points: d.driver_standings[0]?.points,
      wins: d.driver_standings[0]?.wins,
      sessions: d.driver_sessions_aggregate.aggregate?.count ?? 0,
      laps: d.driver_sessions.reduce(
        (acc, s) => acc + (s.laps_aggregate.aggregate?.count ?? 0),
        0,
      ),
    }));
  }, [data, loading, previousData]);

  return <DataTable columns={columns(removeDriver)} data={rows} sortable />;
};
