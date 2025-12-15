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
import type { EChartsOption } from 'echarts/types/dist/echarts';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

import { GET_SESSION_FASTEST_TIMES } from '@/lib/queries';
import { eventLocationDecode, sessionDecode } from '@/lib/utils';

import { Loader } from '@/components/Loader';
import { ServerPageError } from '@/components/ServerError';

import { useSessionItems } from '@/app/[year]/[event]/[session]/_components/driver-filters/context';

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

interface FastestLapEChartsProps {
  times: DriverTimes[];
}

interface EChartsCallbackParams {
  name: string;
  value: number | string | number[]; // Value of the data item
  seriesName?: string;
  // Data item itself (e.g., for bar series, it's {value: ..., itemStyle: ...})
  data: { value: number | null; itemStyle?: { color: string } };
  color?: string;
}

export interface DriverTimes {
  abbreviation: string;
  fastestLap: DriverFastestLap;
  sectors: DriverSectors;
  color: string;
}

const SectorTimes = () => {
  const { data: sessionData } = useSessionItems();
  const hiddenDrivers = sessionData.drivers
    .filter((d) => d.isHidden)
    .map((d) => d.abbreviation);
  const { year, event, session: sessionParam } = useParams();
  const { data, loading, error } = useQuery<
    GetSessionFastestTimesQuery,
    GetSessionFastestTimesQueryVariables
  >(GET_SESSION_FASTEST_TIMES, {
    variables: {
      year: parseInt(year as string),
      event: eventLocationDecode(event as string),
      session: sessionDecode(
        sessionParam as string,
      ) as Session_Name_Choices_Enum,
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
    .filter((ds) => !hiddenDrivers.includes(ds.driver?.abbreviation))
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

const SectorChart = ({
  sectorKey,
  times,
}: {
  sectorKey: keyof DriverSectors;
  times: DriverTimes[];
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // Sort by fastest sector times
  const driverTimes = [...times]
    .filter(
      (d) =>
        d.sectors[sectorKey].time !== null && d.sectors[sectorKey].time > 0,
    )
    .sort(
      (a, b) =>
        Number(a.sectors[sectorKey].time || 0) -
        Number(b.sectors[sectorKey].time || 0),
    );

  useEffect(() => {
    let chartInstance: echarts.ECharts | undefined;
    if (chartRef.current && driverTimes.length > 0) {
      chartInstance = echarts.init(chartRef.current, 'dark');

      const abbreviations = driverTimes.map((d) => d.abbreviation);
      const sectorTimes = driverTimes.map((d) => d.sectors[sectorKey].time);
      const lapNumbers = driverTimes.map((d) => d.sectors[sectorKey].lap);
      const colors = driverTimes.map((d) => `#${d.color}`);

      const option: EChartsOption = {
        backgroundColor: 'transparent',
        title: {
          text:
            sectorKey === 'sector1'
              ? 'Sector 1'
              : sectorKey === 'sector2'
                ? 'Sector 2'
                : 'Sector 3',
          left: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          confine: true,
          backgroundColor: 'transparent',
          borderWidth: 0,
          formatter: (params: unknown) => {
            if (!Array.isArray(params) || !params.length) return '';

            const param = params[0] as { dataIndex: number };
            const hoveredDriverIndex = param.dataIndex;

            let tableHtml = `
              <div style="border: 2px solid #c23531; border-radius: 4px; background-color: #282c34; padding: 10px; box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);">
                <table style="width: 100%; border-collapse: collapse; color: #fff; font-family: 'Arial', sans-serif;">
                  <thead>
                    <tr>
                      <th style="text-align: left; padding: 5px; font-weight: normal;"></th>
                      <th style="text-align: left; padding: 5px; font-weight: normal;">Time</th>
                      <th style="text-align: left; padding: 5px; font-weight: normal;">Lap</th>
                    </tr>
                  </thead>
                  <tbody>
            `;

            driverTimes.forEach((driver, index) => {
              const isHovered = index === hoveredDriverIndex;
              const style = isHovered
                ? 'background-color: rgba(255, 255, 255, 0.2);'
                : '';
              const time = driver.sectors[sectorKey].time;
              const lap = driver.sectors[sectorKey].lap;

              tableHtml += `
                <tr style="${style}">
                  <td style="font-weight: bold; text-align: left; padding: 5px;">${driver.abbreviation}</td>
                  <td style="text-align: left; padding: 5px;">${
                    time ? `${time.toFixed(3)}s` : 'N/A'
                  }</td>
                  <td style="text-align: left; padding: 5px;">${lap || 'N/A'}</td>
                </tr>
              `;
            });

            tableHtml += `
                  </tbody>
                </table>
              </div>
            `;

            return tableHtml;
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          top: '15%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: abbreviations,
          axisLabel: {
            color: '#fff',
            fontSize: 12,
          },
          axisTick: {
            alignWithLabel: true,
          },
          name: 'Driver',
          nameLocation: 'middle',
          nameGap: 35,
          nameTextStyle: {
            color: '#fff',
            fontSize: 14,
          },
        },
        yAxis: {
          type: 'value',
          name: 'Time (s)',
          nameLocation: 'middle',
          nameGap: 40,
          min: function (value: { min: number }) {
            return Math.floor(value.min);
          },
          max: function (value: { max: number }) {
            return Math.floor(value.max);
          },
          nameTextStyle: {
            color: '#fff',
            fontSize: 14,
          },
          axisLabel: {
            color: '#fff',
            formatter: '{value}s',
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: 'rgba(255,255,255,0.3)',
            },
          },
        },
        series: [
          {
            name: `Sector ${sectorKey.slice(-1)}`,
            type: 'bar',
            data: sectorTimes.map((value, index) => ({
              value: value,
              itemStyle: {
                color: colors[index],
              },
            })),
            label: {
              show: true,
              position: 'top',
              formatter: (params: unknown) => {
                const param = params as { dataIndex: number; value: number };
                const driverIndex = param.dataIndex;
                const lap = lapNumbers[driverIndex];
                return `Lap ${lap}\n${Number(param.value).toFixed(3)}s`;
              },
              color: '#fff',
              fontSize: 10,
            },
            barWidth: '60%',
          },
        ],
      };

      chartInstance.setOption(option);

      const handleResize = () => {
        chartInstance?.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance?.dispose();
      };
    }
  }, [driverTimes, sectorKey]);

  if (driverTimes.length === 0) {
    return (
      <div className='rounded border p-2'>
        <div className='flex h-[500px] items-center justify-center text-gray-500'>
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className='rounded border p-2'>
      <div ref={chartRef} style={{ width: '100%', height: '500px' }} />
    </div>
  );
};

const FastestLapChart: React.FC<FastestLapEChartsProps> = ({ times }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const driverTimes = React.useMemo(
    () =>
      [...times]
        .filter((d) => d.fastestLap.lap_time !== null)
        .sort(
          (a, b) =>
            Number(a.fastestLap.lap_time || 0) -
            Number(b.fastestLap.lap_time || 0),
        ),
    [times],
  );

  useEffect(() => {
    let chartInstance: echarts.ECharts | undefined;
    if (chartRef.current) {
      chartInstance = echarts.init(chartRef.current, 'dark');

      const abbreviations = driverTimes.map((d) => d.abbreviation);
      const lapTimes = driverTimes.map((d) => d.fastestLap.lap_time);
      const potentialBests = driverTimes.map((d) =>
        d.fastestLap.potential_best !== 0
          ? Number(d.fastestLap.potential_best)
          : null,
      );
      const colors = driverTimes.map((d) => `#${d.color}`);

      const option: echarts.EChartsCoreOption = {
        title: {
          text: 'Fastest Lap Times',
          subtext: '{diamond|} = Potential is total of best sector times',
          subtextStyle: {
            rich: {
              diamond: {
                backgroundColor: {
                  image:
                    'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,0 100,50 50,100 0,50" fill="%23FFD700"/></svg>',
                },
                width: 12,
                height: 12,
                align: 'center',
                verticalAlign: 'middle',
              },
            },
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter: (params: EChartsCallbackParams[]) => {
            const driverData = driverTimes.find(
              (d) => d.abbreviation === (params[0]?.name || ''),
            );
            if (!driverData) return '';

            return `
              <div style="display: grid; grid-template-columns: auto auto auto; gap: 5px; font-weight: normal;">
                <div style="grid-column: 1 / span 3; text-align: center; font-weight: bold;">
                  ${driverData.abbreviation}
                </div>
                <div style="text-align: center;"></div>
                <div style="text-align: center;">Fastest Lap</div>
                <div style="text-align: center;">Best Sectors</div>

                <div style="text-align: center;">S1</div>
                <div style="text-align: center;">
                  ${
                    driverData.fastestLap.sector1.time !== null
                      ? `${driverData.fastestLap.sector1.time}s`
                      : 'N/A'
                  }
                </div>
                <div style="text-align: center;">
                  ${
                    driverData.sectors.sector1.time !== null
                      ? `${driverData.sectors.sector1.time}s`
                      : 'N/A'
                  }
                </div>

                <div style="text-align: center;">S2</div>
                <div style="text-align: center;">
                  ${
                    driverData.fastestLap.sector2.time !== null
                      ? `${driverData.fastestLap.sector2.time}s`
                      : 'N/A'
                  }
                </div>
                <div style="text-align: center;">
                  ${
                    driverData.sectors.sector2.time !== null
                      ? `${driverData.sectors.sector2.time}s`
                      : 'N/A'
                  }
                </div>

                <div style="text-align: center;">S3</div>
                <div style="text-align: center;">
                  ${
                    driverData.fastestLap.sector3.time !== null
                      ? `${driverData.fastestLap.sector3.time}s`
                      : 'N/A'
                  }
                </div>
                <div style="text-align: center;">
                  ${
                    driverData.sectors.sector3.time !== null
                      ? `${driverData.sectors.sector3.time}s`
                      : 'N/A'
                  }
                </div>

                <div style="text-align: center;">Lap</div>
                <div style="text-align: center;">
                  ${
                    driverData.fastestLap.lap_time !== null
                      ? `${driverData.fastestLap.lap_time}s`
                      : 'N/A'
                  }
                </div>
                <div style="text-align: center;">
                  ${
                    driverData.fastestLap.potential_best
                      ? `${driverData.fastestLap.potential_best}s 🔸`
                      : 'N/A'
                  }
                </div>
              </div>
            `;
          },
        },
        xAxis: {
          type: 'category',
          name: 'Drivers',
          nameLocation: 'middle',
          nameGap: 25,
          data: abbreviations,
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: 'value',
          name: 'Time (s)',
          nameLocation: 'middle',
          nameGap: 40,
          axisLabel: {
            formatter: '{value}s',
          },
          min: function (value: { min: number }) {
            return Math.floor(value.min);
          },
          max: function (value: { max: number }) {
            return Math.floor(value.max);
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: 'rgba(255,255,255,0.3)',
            },
          },
        },
        series: [
          {
            name: 'Lap Times',
            type: 'bar',
            data: lapTimes.map((value, index) => ({
              value: value,
              itemStyle: {
                color: colors[index],
              },
            })),
            label: {
              show: true,
              position: 'top',
              // eslint-disable-next-line
              formatter: (params: any) => `${params.data.value.toFixed(3)}s`,
            },
          },
          {
            name: 'Potential Best',
            type: 'scatter',
            data: potentialBests.map((value) => ({
              value: value,
              itemStyle: {
                color: '#FFD700',
              },
            })),
            itemStyle: {
              color: '#FFD700',
            },
            z: 2,
            symbol: 'diamond',
            tooltip: {
              show: false, // Hide tooltip for this series as it's handled by the bar series
            },
          },
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        backgroundColor: 'transparent',
      };

      chartInstance.setOption(option);
    }

    return () => {
      chartInstance?.dispose();
    };
  }, [driverTimes]);

  return <div ref={chartRef} style={{ width: '100%', height: '500px' }} />;
};

export default SectorTimes;
