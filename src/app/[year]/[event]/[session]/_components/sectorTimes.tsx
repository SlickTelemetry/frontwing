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
import { Circle } from 'lucide-react';
import { useParams } from 'next/navigation';

import { GET_SESSION_FASTEST_TIMES } from '@/lib/queries';
import { eventLocationDecode, sessionDecode } from '@/lib/utils';

import { ChartContainer } from '@/components/chart-container';
import { ServerPageError } from '@/components/ServerError';

import { useSessionItems } from '@/app/[year]/[event]/[session]/_components/driver-filters/context';
import { FastestLapChart } from '@/app/[year]/[event]/[session]/_components/fastest-lap';
import { SectorChart } from '@/app/[year]/[event]/[session]/_components/sector-times';

import {
  GetSessionFastestTimesQuery,
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

type SectionTitle = 'sector1' | 'sector2' | 'sector3';

type DriverSectors = {
  [key in SectionTitle]: Sector;
};

type DriverFastestLap =
  GetSessionFastestTimesQuery['sessions'][number]['driver_sessions'][number]['fastest_lap'][number] & {
    potential_best: number;
  };

export interface DriverTimes {
  abbreviation: string;
  fastestLap: DriverFastestLap;
  sectors: DriverSectors;
  color: string;
}

const SectorTimes = () => {
  const { hiddenItems } = useSessionItems();
  const { year, event, session } = useParams();
  const { data, loading, error } = useQuery(GET_SESSION_FASTEST_TIMES, {
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
      const sector1 = ds.fastest_sector1[0].sector1 ?? null;
      const sector2 = ds.fastest_sector2[0].sector2 ?? null;
      const sector3 = ds.fastest_sector3[0].sector3 ?? null;

      return {
        abbreviation: ds.driver?.abbreviation || 'N/A',
        fastestLap: {
          ...ds.fastest_lap[0],
          potential_best:
            sector1 && sector2 && sector3 ? sector1 + sector2 + sector3 : 0,
        },
        sectors: {
          sector1: {
            time: sector1,
            lap: ds.fastest_sector1[0].lap_number,
          },
          sector2: {
            time: sector2,
            lap: ds.fastest_sector2[0].lap_number,
          },
          sector3: {
            time: sector3,
            lap: ds.fastest_sector3[0].lap_number,
          },
        },
        color: ds.constructorByConstructorId?.color || 'cccccc',
      };
    });

  return (
    <div className='grid gap-4'>
      <ChartContainer
        title='Fastest Lap'
        subtitle={
          <>
            <Circle className='inline size-4 fill-[#FFD700] stroke-0' />{' '}
            represents the potential fastest lap, this is based on all of a
            drivers fastest individual sectors
          </>
        }
        loading={loading}
        className='lg:h-125'
      >
        <FastestLapChart times={driverTimes} />
      </ChartContainer>
      <ChartContainer
        title='Fastest Sector 1'
        loading={loading}
        className='lg:h-125'
      >
        <SectorChart times={driverTimes} sectorKey='sector1' />
      </ChartContainer>
      <ChartContainer
        title='Fastest Sector 2'
        loading={loading}
        className='lg:h-125'
      >
        <SectorChart times={driverTimes} sectorKey='sector2' />
      </ChartContainer>
      <ChartContainer
        title='Fastest Sector 3'
        loading={loading}
        className='lg:h-125'
      >
        <SectorChart times={driverTimes} sectorKey='sector3' />
      </ChartContainer>
    </div>
  );
};

export default SectorTimes;
