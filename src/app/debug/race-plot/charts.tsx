'use client';

import type { EChartsOption } from 'echarts';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import React, { useEffect, useRef } from 'react';

echarts.use([LineChart, TooltipComponent, GridComponent, CanvasRenderer]);

// Types derived from what the components expect
export type RacePlotDriverSession = {
  driver?: { abbreviation?: string | null } | null;
  constructorByConstructorId?: {
    color?: string | null;
    name?: string | null;
  } | null;
  results?: Array<{ classified_position?: string | null }> | null;
  laps?: Array<{ lap_number?: number | null; lap_time?: number | null }> | null;
};

export type RacePlotData = {
  sessions: Array<{
    name?: string | null;
    event?: { name?: string | null; year?: number | null } | null;
    driver_sessions?: RacePlotDriverSession[] | null;
  }>;
};

export type GetSessionLapTimesQuery = RacePlotData;

interface ChartProps {
  loading: boolean;
  children: React.ReactNode;
}

const ChartContainer: React.FC<ChartProps> = ({ loading, children }) => {
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className='rounded border p-2'>
      <div className='h-[800px]'>{children}</div>
    </div>
  );
};

interface RaceChartProps {
  data: GetSessionLapTimesQuery | undefined;
  loading: boolean;
}

export const DeltaToWinnerECharts = ({ data, loading }: RaceChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && chartRef.current && data?.sessions?.[0]) {
      const chart = echarts.init(chartRef.current);

      const driverData = data.sessions[0].driver_sessions || [];

      // Create a map for driver abbreviation to constructor color and prepare lap data
      const driverColorMap = new Map<string, string>();
      const lapTimesByDriver = new Map<string, number[]>();
      const driverFinalPositions = new Map<string, number>();

      // First pass: collect all lap times and create color map
      driverData.forEach((driver: RacePlotDriverSession) => {
        if (driver.driver?.abbreviation) {
          // Set color mapping
          driverColorMap.set(
            driver.driver.abbreviation,
            `#${driver.constructorByConstructorId?.color || 'cccccc'}`,
          );

          // Collect lap times
          const validLaps = (driver.laps || [])
            .filter((lap) => !!lap.lap_number && lap.lap_time !== null)
            .map((lap) => Number(lap.lap_time));
          lapTimesByDriver.set(driver.driver.abbreviation, validLaps);

          // Store final position based on their completion time
          const finalTime = (driver.laps || []).reduce(
            (sum: number, lap) => sum + Number(lap.lap_time || 0),
            0,
          );
          driverFinalPositions.set(
            driver.driver.abbreviation,
            finalTime > 0 ? finalTime : Number.POSITIVE_INFINITY,
          );
        }
      });

      // Calculate median lap times for each lap number
      const maxLaps = Math.max(
        0,
        ...Array.from(lapTimesByDriver.values()).map((laps) => laps.length),
      );
      const medianLapTimes: number[] = [];

      for (let lap = 0; lap < maxLaps; lap++) {
        const lapTimes = Array.from(lapTimesByDriver.values())
          .map((times) => times[lap])
          .filter((time) => time !== undefined && !isNaN(time));

        if (lapTimes.length > 0) {
          const sortedTimes = lapTimes.sort((a, b) => a - b);
          const mid = Math.floor(sortedTimes.length / 2);
          medianLapTimes[lap] =
            sortedTimes.length % 2 === 0
              ? (sortedTimes[mid - 1] + sortedTimes[mid]) / 2
              : sortedTimes[mid];
        }
      }

      // Calculate cumulative medians
      const cumulativeMedians = medianLapTimes.reduce(
        (acc: number[], curr: number) => {
          const prev = acc.length > 0 ? acc[acc.length - 1] : 0;
          acc.push(prev + curr);
          return acc;
        },
        [],
      );

      // Sort drivers by final position
      const sortedDrivers = Array.from(driverFinalPositions.entries())
        .sort(([, posA], [, posB]) => posA - posB)
        .map(([driver]) => driver);

      // Create series data with calculated offsets
      const series = sortedDrivers.map((driverAbbr, index) => {
        const color = driverColorMap.get(driverAbbr) || '#cccccc';
        const driverLapTimes = lapTimesByDriver.get(driverAbbr) || [];

        // Calculate cumulative times for this driver
        const cumulativeTimes = driverLapTimes.reduce(
          (acc: number[], curr: number) => {
            const prev = acc.length > 0 ? acc[acc.length - 1] : 0;
            acc.push(prev + curr);
            return acc;
          },
          [],
        );

        // Calculate delta to median pace
        const lapData = cumulativeTimes.map((time, lap) => {
          const medianTime = cumulativeMedians[lap] || 0;
          return [lap + 1, -(time - medianTime) / 1000]; // Convert to seconds
        });

        // Determine line style based on index
        const lineStyles = ['-', '-.', '--', ':', '-', '-'];
        const lineStyle = lineStyles[index % lineStyles.length];

        const position = driverFinalPositions.get(driverAbbr);
        const positionStr =
          position === Number.POSITIVE_INFINITY
            ? 'DNF '
            : `${position === Infinity ? 'DNF' : index + 1}. `;

        return {
          name: `${positionStr}${driverAbbr}`,
          type: 'line',
          smooth: false,
          showSymbol: false,
          lineStyle: {
            color: color,
            width: 2,
            type: lineStyle as 'solid' | 'dashed' | 'dotted',
          },
          itemStyle: {
            color: color,
          },
          data: lapData,
        } as LineSeriesOption;
      });

      const option: EChartsOption = {
        title: {
          text: 'Delta to Fastest Lap (Practice) or Winner',
          left: 'center',
          top: 'top',
          textStyle: {
            fontSize: 16,
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' },
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#333',
          borderWidth: 1,
          textStyle: {
            color: '#fff',
          },
          position: (
            pos: number[],
            _params: unknown,
            _dom: unknown,
            rect: { height: number } | null,
            size: { contentSize: [number, number] },
          ): number[] | { left: number; top: number } => {
            const chartHeight = rect?.height || 0;
            const tooltipHeight = size?.contentSize?.[1] || 0;

            let top = pos[1] + 10;

            const minTop = 10;
            const maxTop = chartHeight - tooltipHeight - 10;

            top = Math.max(minTop, Math.min(top, maxTop));

            return {
              left: pos[0] + 20,
              top: top,
            };
          },
          formatter: function (params: unknown) {
            let tooltipContent = '';
            const typedParams = params as {
              value: [number, number];
              seriesName: string;
              color?: string;
            }[];

            if (
              typedParams &&
              typedParams.length > 0 &&
              typedParams[0]?.value
            ) {
              tooltipContent = `<div class='font-bold text-white'>Lap: ${typedParams[0].value[0]}</div>`;

              typedParams.sort((a, b) => {
                return (b.value as number[])[1] - (a.value as number[])[1];
              });
              typedParams.forEach((item) => {
                if (item.value) {
                  const seriesName = item.seriesName.split(' ');
                  const driverAbbr = seriesName[seriesName.length - 1];
                  const driverColor =
                    driverColorMap.get(driverAbbr) || '#FFFFFF';
                  const deltaTime = (item.value as number[])[1];
                  const deltaStr =
                    deltaTime > 0
                      ? `+${deltaTime.toFixed(3)}s`
                      : `${deltaTime.toFixed(3)}s`;
                  tooltipContent += `<div><span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${driverColor};"></span><span style="color:${driverColor}">${driverAbbr}</span>: ${deltaStr}</div>`;
                }
              });
            }
            return tooltipContent;
          },
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '5%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          name: 'Lap Number',
          nameLocation: 'middle',
          nameGap: 30,
          max: 'dataMax',
          interval: 2,
          splitLine: {
            lineStyle: {
              type: 'dashed',
            },
          },
        },
        yAxis: {
          type: 'value',
          name: 'Time offset from Average Pace (s)',
          nameLocation: 'middle',
          nameGap: 40,
          axisLabel: {
            formatter: '{value}s',
          },
          interval: 25,
          splitLine: {
            lineStyle: {
              type: 'dashed',
            },
          },
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        series: series as any,
      };

      chart.setOption(option);

      // Handle resize
      const handleResize = () => chart.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    }
  }, [data, loading]);

  return (
    <ChartContainer loading={loading}>
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </ChartContainer>
  );
};
