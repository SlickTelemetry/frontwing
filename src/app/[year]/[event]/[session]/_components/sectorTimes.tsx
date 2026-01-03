'use client';
import { useQuery } from '@apollo/client/react';
import { BarChart } from 'echarts/charts';
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { useParams } from 'next/navigation';

import { GET_SESSION_FASTEST_TIMES } from '@/lib/queries';
import { eventLocationDecode, sessionDecode } from '@/lib/utils';

import { Loader } from '@/components/Loader';
import { ServerPageError } from '@/components/ServerError';

import { useSessionItems } from '@/app/[year]/[event]/[session]/_components/driver-filters/context';
import { FastestLapChart } from '@/app/[year]/[event]/[session]/_components/fastest-lap';
import { SectorChart } from '@/app/[year]/[event]/[session]/_components/sector-times';

import {
  GetSessionFastestTimesQuery,
  GetSessionFastestTimesQueryVariables,
  Session_Name_Choices_Enum,
} from '@/types/graphql';

// Register the required components
echarts.use([
  BarChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  CanvasRenderer,
]);

type Sector = {
  time: number | null;
  lap?: number | null;
};

interface DriverSectors {
  sector1: Sector;
  sector2: Sector;
  sector3: Sector;
}

interface DriverFastestLap extends DriverSectors {
  lap_number: number | null;
  lap_time: number | null;
  potential_best: string | 0;
}

export interface DriverTimes {
  abbreviation: string;
  fastestLap: DriverFastestLap;
  sectors: DriverSectors;
  color: string;
}

const SectorTimes = () => {
  const { hiddenItems } = useSessionItems();
  const { year, event, session } = useParams();
  const { data, loading, error } = useQuery<
    GetSessionFastestTimesQuery,
    GetSessionFastestTimesQueryVariables
  >(GET_SESSION_FASTEST_TIMES, {
    variables: {
      year: parseInt(year as string),
      event: eventLocationDecode(event as string),
      session: sessionDecode(session as string) as Session_Name_Choices_Enum,
    },
  });

  if (error) {
    return (
      <div className='my-16'>
        <ServerPageError msg='Issue loading sectors times' />
      </div>
    );
  }

  const driverSessions = data?.sessions[0].driver_sessions || [];

  const driverTimes: DriverTimes[] = driverSessions
    .filter((ds) => !hiddenItems.includes(ds.driver?.abbreviation ?? ''))
    .map((ds) => {
      const sector1 =
        ds.fastest_sector1.length > 0 && ds.fastest_sector1[0].sector1 !== null
          ? Number(ds.fastest_sector1[0].sector1) / 1000
          : null;
      const sector2 =
        ds.fastest_sector2.length > 0 && ds.fastest_sector2[0].sector2 !== null
          ? Number(ds.fastest_sector2[0].sector2) / 1000
          : null;
      const sector3 =
        ds.fastest_sector3.length > 0 && ds.fastest_sector3[0].sector3 !== null
          ? Number(ds.fastest_sector3[0].sector3) / 1000
          : null;

      return {
        abbreviation: ds.driver?.abbreviation || 'N/A',
        fastestLap: {
          lap_number:
            ds.fastest_lap.length > 0 && ds.fastest_lap[0].lap_number !== null
              ? Number(ds.fastest_lap[0].lap_number)
              : null,
          lap_time:
            ds.fastest_lap.length > 0 && ds.fastest_lap[0].lap_time !== null
              ? Number(ds.fastest_lap[0].lap_time) / 1000
              : null,
          sector1: {
            time:
              ds.fastest_lap.length > 0 && ds.fastest_lap[0].sector1 !== null
                ? Number(ds.fastest_lap[0].sector1) / 1000
                : null,
          },
          sector2: {
            time:
              ds.fastest_lap.length > 0 && ds.fastest_lap[0].sector2 !== null
                ? Number(ds.fastest_lap[0].sector2) / 1000
                : null,
          },
          sector3: {
            time:
              ds.fastest_lap.length > 0 && ds.fastest_lap[0].sector3 !== null
                ? Number(ds.fastest_lap[0].sector3) / 1000
                : null,
          },
          potential_best:
            sector1 && sector2 && sector3
              ? (sector1 + sector2 + sector3).toFixed(3)
              : 0,
        },
        sectors: {
          sector1: {
            time: sector1,
            lap:
              ds.fastest_sector1.length > 0 &&
              ds.fastest_sector1[0].lap_number !== null
                ? Number(ds.fastest_sector1[0].lap_number)
                : null,
          },
          sector2: {
            time: sector2,
            lap:
              ds.fastest_sector2.length > 0 &&
              ds.fastest_sector2[0].lap_number !== null
                ? Number(ds.fastest_sector2[0].lap_number)
                : null,
          },
          sector3: {
            time: sector3,
            lap:
              ds.fastest_sector3.length > 0 &&
              ds.fastest_sector3[0].lap_number !== null
                ? Number(ds.fastest_sector3[0].lap_number)
                : null,
          },
        },
        color: ds.constructorByConstructorId?.color || 'cccccc',
      };
    });

  return (
    <div className='grid gap-4'>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <FastestLapChart times={driverTimes} />
          <SectorChart times={driverTimes} sectorKey='sector1' />
          <SectorChart times={driverTimes} sectorKey='sector2' />
          <SectorChart times={driverTimes} sectorKey='sector3' />
        </>
      )}
    </div>
  );
};

export default SectorTimes;
