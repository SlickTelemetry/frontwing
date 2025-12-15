'use client';
import { useQuery } from '@apollo/client/react';
import * as echarts from 'echarts';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import React, { useEffect, useRef } from 'react';

import { GET_SESSION_STINTS } from '@/lib/queries';
import { eventLocationDecode, sessionDecode } from '@/lib/utils';

import { Loader } from '@/components/Loader';
import { ServerPageError } from '@/components/ServerError';

import { useSessionItems } from '@/app/[year]/[event]/[session]/_components/driver-filters/context';

import {
  GetSessionStintsQuery,
  GetSessionStintsQueryVariables,
  Session_Name_Choices_Enum,
} from '@/types/graphql';

type Stint = {
  stint: number;
  startLap: number;
  endLap: number;
  tyreLife: number;
  tyreCompound: string;
  freshTyre: boolean;
  driver: string;
};
type StintMap = Record<number, Stint>;

type ProcessedDriverStints = {
  driver: string;
  totalLaps: number;
  stints: Stint[];
};

interface StintsEchartsChartProps {
  processedData: ProcessedDriverStints[] | undefined;
  maxLaps: number;
}

// Define a type for the custom data you want to attach to each bar
interface CustomBarDataItem {
  value: number | null;
  originalStartLap: number;
  originalEndLap: number;
  tyreCompound: string;
  freshTyre: boolean;
  driver: string;
  itemStyle?: {
    decal?: {
      symbol: string;
      symbolSize: number;
      rotation: number;
      symbolKeepAspect: boolean;
      color: string;
      dashArrayX: number[];
      dashArrayY: number[];
    };
  };
}

const tyreCompoundColors: Record<string, string> = {
  SOFT_NEW: 'hsl(6 78% 63%)',
  SOFT_OLD: 'hsl(6 79% 48%)',
  MEDIUM_NEW: 'hsl(48 89% 62%)',
  MEDIUM_OLD: 'hsl(38 85% 61%)',
  HARD_NEW: 'hsl(192 16% 92%)',
  HARD_OLD: 'hsl(192 15% 74%)',
  INTERMEDIATE_NEW: 'hsl(145 63% 53%)',
  INTERMEDIATE_OLD: 'hsl(145 65% 40%)',
  WET_NEW: 'hsl(204 70% 53%)',
  WET_OLD: 'hsl(204 67% 41%)',
  ULTRASOFT_NEW: 'hsl(305 100% 80%)',
  ULTRASOFT_OLD: 'hsl(305 100% 50%)',
  HYPERSOFT_NEW: 'hsl(348 100% 85%)',
  HYPERSOFT_OLD: 'hsl(348 100% 65%)',
  UNKNOWN_NEW: 'hsl(282 35% 58%)',
  UNKNOWN_OLD: 'hsl(282 39% 45%)',
};

const StintsChart: React.FC<StintsEchartsChartProps> = ({
  processedData,
  maxLaps,
}) => {
  const { data: sessionData } = useSessionItems();
  const hiddenDrivers = sessionData.drivers
    .filter((d) => d.isHidden)
    .map((d) => d.abbreviation);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let myChart: echarts.ECharts | undefined;
    if (chartRef.current) {
      myChart = echarts.init(chartRef.current);

      if (!processedData || processedData.length === 0) {
        myChart.setOption({});
        return;
      }

      const drivers = processedData
        .filter((d) => !hiddenDrivers.includes(d.driver))
        .map((d) => d.driver);

      const series: echarts.SeriesOption[] = [];

      // Determine the maximum stint number across all drivers
      const maxStintNumber = processedData.reduce((max, driverData) => {
        return Math.max(max, ...driverData.stints.map((s) => s.stint));
      }, 0);

      for (let i = 1; i <= maxStintNumber; i++) {
        const stintNumber = i;
        const stintDataForSeries: CustomBarDataItem[] = [];

        drivers.forEach((driverName) => {
          const driverData = processedData.find((d) => d.driver === driverName);
          const stint = driverData?.stints.find((s) => s.stint === stintNumber);

          if (stint) {
            const duration = stint.endLap - stint.startLap + 1;
            stintDataForSeries.push({
              value: duration,
              originalStartLap: stint.startLap,
              originalEndLap: stint.endLap,
              tyreCompound: stint.tyreCompound,
              freshTyre: stint.freshTyre,
              driver: driverName,
              itemStyle: {
                decal: stint.freshTyre
                  ? undefined
                  : {
                      symbol: 'rect',
                      symbolSize: 1,
                      color: 'rgba(0,0,0,0.2)',
                      dashArrayX: [1, 0],
                      dashArrayY: [2, 5],
                      rotation: -Math.PI / 4,
                    },
              },
            } as CustomBarDataItem);
          } else {
            // Push a placeholder for drivers without this specific stint
            stintDataForSeries.push({
              value: null,
              originalStartLap: 0,
              originalEndLap: 0,
              tyreCompound: 'UNKNOWN',
              freshTyre: false,
              driver: driverName,
              itemStyle: {
                decal: {
                  symbol: 'rect',
                  symbolSize: 1,
                  color: 'rgba(0,0,0,0.2)',
                  dashArrayX: [1, 0],
                  dashArrayY: [2, 5],
                  rotation: -Math.PI / 4,
                },
              },
            } as CustomBarDataItem);
          }
        });

        series.push({
          name: `stint ${stintNumber}`,
          type: 'bar',
          stack: 'total', // Stack all stints for a driver together
          label: {
            show: true,
            formatter: '{c}', // Display the value (lap count)
            position: 'inside', // Position label inside the bar
            color: '#000', // Set label color for visibility
          },
          itemStyle: {
            // eslint-disable-next-line
            color: function (params: any) {
              const data = params.data as CustomBarDataItem;
              const compoundKey = `${data.tyreCompound.toUpperCase()}_${
                data.freshTyre ? 'NEW' : 'OLD'
              }`;
              return (
                tyreCompoundColors[compoundKey] ||
                tyreCompoundColors.UNKNOWN_NEW
              );
            },
          },
          data: stintDataForSeries,
          yAxisIndex: 0,
          xAxisIndex: 0,
        });
      }

      const option: echarts.EChartsOption = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        tooltip: {
          trigger: 'axis', // Change trigger to axis for stacked bars
          axisPointer: {
            type: 'shadow',
          },
          backgroundColor: 'rgba(0, 0, 0, 1)', // Dark background
          borderColor: '#60A5FA', // Light blue border
          borderWidth: 1,
          borderRadius: 4,
          textStyle: {
            color: '#E2E8F0', // Light grey text
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter: function (params: any[]) {
            let tooltipContent = '';
            // Sort params to ensure "stint 1", "stint 2", etc.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            params.sort((a: any, b: any) => {
              const stintA = parseInt(a.seriesName.replace('stint ', ''));
              const stintB = parseInt(b.seriesName.replace('stint ', ''));
              return stintA - stintB;
            });

            if (params.length > 0) {
              const driverName = (params[0].data as CustomBarDataItem).driver;
              tooltipContent += `<b>Driver: ${driverName}</b><br/><br/>`;
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            params.forEach((param: any) => {
              const data = param.data as CustomBarDataItem;
              const stintNumber = parseInt(
                param.seriesName.replace('stint ', ''),
              );
              // Only show tooltip if there is actual data for the stint
              if (data.value === 0 || data.value === null) return;

              const tyreColor =
                tyreCompoundColors[
                  `${data.tyreCompound.toUpperCase()}_${
                    data.freshTyre ? 'NEW' : 'OLD'
                  }`
                ] || tyreCompoundColors.UNKNOWN_NEW;

              tooltipContent += `
                <div style="margin-bottom: 10px;">
                  <span style="display:inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${tyreColor}; margin-right: 8px;"></span>
                  Stint ${stintNumber}: Laps ${data.originalStartLap} - ${data.originalEndLap}<br/>
                  Tyre: ${data.tyreCompound} ${data.freshTyre ? '(Fresh)' : '(Used)'}
                </div>
              `;
            });
            return tooltipContent;
          },
        },
        grid: {
          left: '3%',
          right: '1%',
          bottom: '8%',
          top: '5%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          name: 'Lap Number',
          max: maxLaps,
          nameLocation: 'middle',
          nameGap: 25,
        },
        yAxis: {
          type: 'category',
          data: drivers,
          axisLabel: {
            interval: 0,
            rotate: 0,
            margin: 8,
          },
          name: 'Driver',
          nameLocation: 'middle',
          nameGap: 40,
        },
        series: series,
      };

      myChart.setOption(option);
    }

    return () => {
      if (myChart) {
        myChart.dispose();
      }
    };
  }, [processedData, maxLaps, hiddenDrivers]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

const Stints = () => {
  const { year, event, session } = useParams();

  const {
    data: sessionData,
    loading,
    error,
  } = useQuery<GetSessionStintsQuery, GetSessionStintsQueryVariables>(
    GET_SESSION_STINTS,
    {
      variables: {
        year: parseInt(year as string),
        event: eventLocationDecode(event as string),
        session: sessionDecode(session as string) as Session_Name_Choices_Enum,
      },
    },
  );

  // 🛠️ Process data for BarStack
  const data = useMemo(() => {
    let maxLaps = 0; // Track the largest endLap

    const processedData = sessionData?.sessions[0]?.driver_sessions
      .map((ds) => {
        const stintMap: StintMap = {};

        ds.laps.forEach((lap, index) => {
          if (lap.stint === null || lap.stint === undefined) return;

          if (!stintMap[lap.stint]) {
            stintMap[lap.stint] = {
              stint: lap.stint || 1,
              startLap: index + 1,
              endLap: index + 1, // Defaults to same lap; will be updated
              tyreLife: lap.tyre_life || 1,
              tyreCompound: lap.tyre_compound?.value || 'unknown',
              freshTyre: lap.fresh_tyre || false,
              driver: ds.driver?.abbreviation || 'Unknown',
            };
          } else {
            stintMap[lap.stint].endLap = index + 1;
          }

          // Track max lap
          maxLaps = Math.max(maxLaps, index + 1);
        });

        return {
          driver: ds.driver?.abbreviation || 'Unknown',
          totalLaps: ds.laps.length, // Store lap count for sorting
          stints: Object.values(stintMap),
        };
      })
      .sort((a, b) => a.totalLaps - b.totalLaps); // ✅ Sort drivers by most laps

    return { processedData, maxLaps };
  }, [sessionData]);

  const { processedData, maxLaps } = data;

  if (loading) return <Loader />;
  if (error || !sessionData) return <ServerPageError />;

  return (
    <>
      <div className='h-[600px] rounded border p-2'>
        <h3 className='text-center text-lg font-semibold'>Tyre Analysis</h3>
        <StintsChart processedData={processedData} maxLaps={maxLaps} />
      </div>
    </>
  );
};

export default Stints;
