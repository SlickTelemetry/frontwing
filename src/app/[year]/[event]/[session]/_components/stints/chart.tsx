'use client';
import * as echarts from 'echarts';
import { useCallback, useEffect, useRef } from 'react';

import { useECharts } from '@/hooks/use-EChart';

import { useSessionItems } from '@/app/[year]/[event]/[session]/_components/driver-filters/context';
import { baseOptions } from '@/app/[year]/[event]/[session]/_components/stints/config';

import { GetSessionStintsQuery } from '@/types/graphql';

interface StintsEchartsChartProps {
  driverSessions: GetSessionStintsQuery['sessions'][number]['driver_sessions'];
}

// Define a type for the custom data you want to attach to each bar
interface CustomBarDataItem {
  value: [number, string];
  stint: number;
  constructor: string;
  color: string | null;
  originalStartLap: number;
  originalEndLap: number;
  tyreCompound: string;
  freshTyre: boolean;
  itemStyle?: {
    decal?: {
      symbol: string;
      symbolSize: number;
      rotation: number;
      symbolKeepAspect?: boolean;
      color: string;
      dashArrayX: number[];
      dashArrayY: number[];
    };
  };
}

// TODO: Migrate to constants
const tyreCompoundColors: Record<string, string> = {
  SOFT_OLD: 'hsl(6 78% 63%)',
  SOFT_NEW: 'hsl(6 79% 48%)',
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

export const StintsChart = ({ driverSessions }: StintsEchartsChartProps) => {
  const { hiddenDrivers } = useSessionItems();
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useECharts(chartRef);

  const setNoDataState = useCallback(() => {
    if (!chartInstance.current) return;
    chartInstance.current.setOption(
      {
        title: { text: 'No completed laps found to display' },
        series: [],
      },
      { replaceMerge: ['series'] },
    );
  }, [chartInstance]);

  const formatter = (params: {
    seriesName: string;
    data: CustomBarDataItem;
    value: [number, string];
  }) => {
    let tooltipContent = '';

    const stintNumber = parseInt(params.seriesName.replace('stint ', ''));
    tooltipContent += `<p class="font-bold">Stint ${stintNumber}</p><hr class="my-2"/>`;

    const data = params.data as CustomBarDataItem;
    // Only show tooltip if there is actual data for the stint
    if (data.value[0] === 0 || data.value === null) return;

    const driverName = (params.data as CustomBarDataItem).value[1];
    tooltipContent += `<div class="flex gap-2 items-center">${params.data.color && `<div class="size-4 rounded-full" style="background-color: ${params.data.color};"></div>`}<div><p class="font-semibold">${driverName}</p><p>${params.data.constructor}</p></div></div><hr class="my-2"/>`;

    const tyreColor =
      tyreCompoundColors[
        `${data.tyreCompound.toUpperCase()}_${data.freshTyre ? 'NEW' : 'OLD'}`
      ] || tyreCompoundColors.UNKNOWN_NEW;

    tooltipContent += `
                <div>
                  <div class="flex-1 flex gap-2 items-center">
                    <div class="size-4 rounded-full" style="background-color: ${tyreColor};"></div>
                      <div>
                        <p>${data.tyreCompound}</p>
                        <p>${data.originalEndLap + 1 - data.originalStartLap} Laps</p>
                      </div>
                      <div>
                        <p>(${data.freshTyre ? 'Fresh' : 'Used'})</p>
                        <p>(${data.originalStartLap} - ${data.originalEndLap})</p>
                      </div>
                    </div>
                </div>
              `;
    return tooltipContent;
  };

  // Initialize base options and tooltip
  useEffect(() => {
    if (!chartInstance.current) return;

    chartInstance.current.setOption({
      ...baseOptions,
      tooltip: { ...baseOptions.tooltip, formatter },
    });
  }, [chartInstance]);

  useEffect(() => {
    if (!chartInstance.current) return;

    // Handle no data
    if (driverSessions.length <= 0) {
      setNoDataState();
      return;
    }

    const series: echarts.SeriesOption[] = [];
    const driversSet = new Set<string>(); // To collect unique driver names
    let maxStintNumber = 0;

    // Dynamically determine the maximum stint number
    driverSessions.forEach((ds) => {
      maxStintNumber = Math.max(maxStintNumber, ds.laps.at(-1)?.stint ?? 0);
    });

    // Extract driver names in sorted order
    const sortedDriverNames = driverSessions
      .map((ds) => ds.driver?.abbreviation || '')
      .filter((name) => !hiddenDrivers.includes(name));

    // Build series data for each stint
    for (let stintNumber = 1; stintNumber <= maxStintNumber; stintNumber++) {
      const stintDataForSeries: CustomBarDataItem[] = [];

      driverSessions.forEach((ds) => {
        const driverName = ds.driver?.abbreviation || '';
        if (hiddenDrivers.includes(driverName)) return;

        // Aggregate laps for the current stint
        const stintData = ds.laps.reduce<CustomBarDataItem | null>(
          (acc, lap, index) => {
            if (lap.stint === stintNumber) {
              driversSet.add(driverName);

              if (!acc) {
                return {
                  value: [1, driverName], // Set stint number as value[0]
                  stint: stintNumber,
                  driver: ds.driver?.full_name || '',
                  constructor: ds.constructorByConstructorId?.name || 'Unknown',
                  color: ds.constructorByConstructorId?.color
                    ? `#${ds.constructorByConstructorId?.color}`
                    : null,
                  tyreCompound: lap.tyre_compound?.value || 'unknown',
                  freshTyre: lap.fresh_tyre || false,
                  originalStartLap: index + 1,
                  originalEndLap: index + 1,
                  itemStyle: {
                    decal: lap.fresh_tyre
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
                };
              } else {
                acc.value[0] = acc.value[0] + 1;
                acc.originalEndLap = index + 1; // Update end lap
              }
            }
            return acc;
          },
          null,
        );

        if (stintData) {
          stintDataForSeries.push(stintData);
        }
      });

      // Format bar series for chart
      if (stintDataForSeries.length > 0) {
        series.push({
          name: `stint ${stintNumber}`,
          type: 'bar',
          stack: 'total', // Stack all stints for a driver together
          backgroundStyle: {
            color: 'var(--muted)',
          },
          emphasis: { disabled: true },
          label: {
            show: true,
            formatter: ({ value, ...params }) => {
              const data = params.data as CustomBarDataItem;
              const val = value as CustomBarDataItem['value'];
              let label = `S${data.stint}`;
              if (val[0] > 2) {
                label += `\n${val[0]} Lap${val[0] > 1 ? 's' : ''}`;
              }
              return label;
            },

            position: 'inside', // Position label inside the bar
            color: '#000', // Set label color for visibility
          },
          itemStyle: {
            borderRadius: 4,
            borderWidth: 2,
            borderColor: 'transparent',
            color: (params) => {
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
        });
      }
    }

    if (sortedDriverNames.length === 0) {
      setNoDataState();
      return;
    }

    // Update chart options
    chartInstance.current.setOption(
      {
        yAxis: { data: sortedDriverNames },
        series: series,
        title: { text: '' },
      },
      { replaceMerge: ['series'] },
    );
  }, [chartInstance, driverSessions, hiddenDrivers, setNoDataState]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};
