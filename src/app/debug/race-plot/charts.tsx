'use client';

import type { DeepPartial } from '@apollo/client/utilities';
import type { EChartsOption } from 'echarts';
import { LineChart, LineSeriesOption, ScatterChart } from 'echarts/charts';
import {
  GridComponent,
  MarkAreaComponent,
  MarkLineComponent,
  TooltipComponent,
} from 'echarts/components';
import { TitleComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import React, { useEffect, useRef } from 'react';

import { computeLeaderShadowData } from './leaderShadow';
import { buildRaceControlBands } from './raceControlIntervals';

import type { GetSessionLapTimesQuery } from '@/types/graphql';

echarts.use([
  LineChart,
  ScatterChart,
  TooltipComponent,
  GridComponent,
  MarkLineComponent,
  MarkAreaComponent,
  CanvasRenderer,
  TitleComponent,
]);

// Types derived from what the components expect
export type RacePlotDriverSession = {
  driver?: { abbreviation?: string | null } | null;
  constructorByConstructorId?: {
    color?: string | null;
    name?: string | null;
  } | null;
  results?: Array<{ classified_position?: string | null }> | null;
  laps?: Array<{
    lap_number?: number | null;
    lap_time?: number | null;
    pitin_time?: number | null;
  }> | null;
};

export type RacePlotData = {
  sessions: Array<{
    name?: string | null;
    event?: { name?: string | null; year?: number | null } | null;
    driver_sessions?: RacePlotDriverSession[] | null;
  }>;
};

export type { GetSessionLapTimesQuery };

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
  data: DeepPartial<GetSessionLapTimesQuery> | undefined;
  loading: boolean;
}

/** Gap vs median (s): axis floor; leader shadow clip. */
const NEGATIVE_CUTOFF = -180;

const SHOW_OUTLIER_CEILING = 800;

/** ECharts axis tooltip: data may be [x,y] or { value: [x,y], symbol?, ... }. */
function lineDataXY(value: unknown): [number, number] | null {
  if (Array.isArray(value) && value.length >= 2) {
    return [Number(value[0]), Number(value[1])];
  }
  if (value && typeof value === 'object' && 'value' in value) {
    const inner = (value as { value: unknown }).value;
    return lineDataXY(inner);
  }
  return null;
}

function computeRaceGapYAxisRange(
  sortedDrivers: string[],
  lapTimesByDriver: Map<string, number[]>,
  cumulativeMedians: number[],
  negativeCutoff: number,
): { min: number; max: number } {
  let top = -Infinity;
  let rawBottom = Infinity;

  for (const abbr of sortedDrivers) {
    const laps = lapTimesByDriver.get(abbr) || [];
    let cum = 0;
    for (let lap = 0; lap < laps.length; lap++) {
      cum += laps[lap];
      const medianTime = cumulativeMedians[lap] ?? 0;
      const rawSec = -(cum - medianTime) / 1000;
      if (Number.isNaN(rawSec)) continue;
      if (rawSec >= SHOW_OUTLIER_CEILING) continue;
      top = Math.max(top, rawSec);
      rawBottom = Math.min(rawBottom, rawSec);
    }
  }

  if (top === -Infinity || rawBottom === Infinity) {
    return { min: negativeCutoff, max: negativeCutoff + 100 };
  }

  const bottom = Math.max(negativeCutoff, rawBottom);
  const span = top - bottom;
  const ymax = top + span / 50;

  return { min: bottom, max: ymax };
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
      /** Same indexing as lapTimesByDriver: pit-in recorded for this lap. */
      const pitInByDriver = new Map<string, boolean[]>();
      const driverFinalPositions = new Map<string, number>();

      // First pass: collect all lap times and create color map
      driverData.forEach((driver: RacePlotDriverSession) => {
        if (driver.driver?.abbreviation) {
          // Set color mapping
          driverColorMap.set(
            driver.driver.abbreviation,
            `#${driver.constructorByConstructorId?.color || 'cccccc'}`,
          );

          // Collect lap times (aligned with pit flags per lap row)
          const lapRows = (driver.laps || []).filter(
            (lap) => !!lap.lap_number && lap.lap_time !== null,
          );
          lapTimesByDriver.set(
            driver.driver.abbreviation,
            lapRows.map((lap) => Number(lap.lap_time)),
          );
          pitInByDriver.set(
            driver.driver.abbreviation,
            lapRows.map((lap) => lap.pitin_time != null),
          );

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

      // Fastest lap: single minimum raw lap time (ms) across every lap from every driver.
      // Median pace is not used here — only for the gap on the Y axis below.
      let fastestLapIdx: number | null = null;
      let fastestDriverAbbr: string | null = null;
      let bestLapMs = Infinity;
      for (const abbr of sortedDrivers) {
        const laps = lapTimesByDriver.get(abbr) || [];
        for (let lap = 0; lap < laps.length; lap++) {
          const t = laps[lap];
          if (t === undefined || Number.isNaN(t)) continue;
          if (t < bestLapMs) {
            bestLapMs = t;
            fastestLapIdx = lap;
            fastestDriverAbbr = abbr;
          }
        }
      }

      // Create series data with calculated offsets
      const leaderShadowPoints = computeLeaderShadowData(
        sortedDrivers,
        lapTimesByDriver,
        cumulativeMedians,
        maxLaps,
        NEGATIVE_CUTOFF,
      );

      const yAxisRange = computeRaceGapYAxisRange(
        sortedDrivers,
        lapTimesByDriver,
        cumulativeMedians,
        NEGATIVE_CUTOFF,
      );

      const pitScatterData: Array<{
        value: [number, number];
        itemStyle: { color: string };
      }> = [];

      const series = sortedDrivers.map((driverAbbr, index) => {
        const color = driverColorMap.get(driverAbbr) || '#cccccc';
        const driverLapTimes = lapTimesByDriver.get(driverAbbr) || [];
        const pitFlags = pitInByDriver.get(driverAbbr) ?? [];

        // Calculate cumulative times for this driver
        const cumulativeTimes = driverLapTimes.reduce(
          (acc: number[], curr: number) => {
            const prev = acc.length > 0 ? acc[acc.length - 1] : 0;
            acc.push(prev + curr);
            return acc;
          },
          [],
        );

        // Y = gap vs median cumulative pace (s). Diamond marks the (driver, lap) that had the
        // global minimum raw lap time above — not “closest to median” or any median-based rule.
        const canMarkFastest =
          fastestLapIdx !== null && fastestDriverAbbr !== null;

        const lapData = cumulativeTimes.map((time, lap) => {
          const medianTime = cumulativeMedians[lap] || 0;
          const ySec = -(time - medianTime) / 1000;
          const x = lap + 1;

          if (pitFlags[lap]) {
            pitScatterData.push({
              value: [x, ySec],
              itemStyle: { color },
            });
          }

          if (!canMarkFastest) {
            return [x, ySec] as [number, number];
          }

          const isFastestLapByRawTime =
            driverAbbr === fastestDriverAbbr && lap === fastestLapIdx;

          if (isFastestLapByRawTime) {
            return {
              value: [x, ySec] as [number, number],
              symbol: 'diamond' as const,
              symbolSize: 14,
              itemStyle: {
                color: '#FFD700',
                borderColor: '#1a1a1a',
                borderWidth: 1,
              },
            };
          }
          return {
            value: [x, ySec] as [number, number],
            symbol: 'none' as const,
          };
        });

        // Determine line style based on index
        const lineStyles = ['-', '-.', '--', ':', '-', '-'];
        const lineStyle = lineStyles[index % lineStyles.length];

        const position = driverFinalPositions.get(driverAbbr);
        const positionStr =
          position === Number.POSITIVE_INFINITY
            ? 'DNF '
            : `${position === Infinity ? 'DNF' : index + 1}. `;

        const hasFastestMarker =
          canMarkFastest && driverAbbr === fastestDriverAbbr;

        return {
          name: `${positionStr}${driverAbbr}`,
          type: 'line',
          smooth: false,
          showSymbol: canMarkFastest,
          z: hasFastestMarker ? 20 : 2,
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

      const leaderShadowSeries =
        leaderShadowPoints.length > 0
          ? ({
              name: '__leader_shadow__',
              type: 'line',
              data: leaderShadowPoints,
              showSymbol: false,
              silent: true,
              z: 0,
              lineStyle: {
                width: 0,
                opacity: 0,
              },
              areaStyle: {
                color: 'rgba(211, 211, 211,0.3)',
                origin: NEGATIVE_CUTOFF,
              },
              showInLegend: false,
              tooltip: { show: false },
            } as LineSeriesOption)
          : null;

      const pitStopScatterSeries =
        pitScatterData.length > 0
          ? {
              name: '__pit_stops__',
              type: 'scatter' as const,
              data: pitScatterData,
              symbol: 'circle' as const,
              symbolSize: 7,
              z: 24,
              silent: true,
              tooltip: { show: false },
              showInLegend: false,
            }
          : null;

      const seriesForChart = [
        ...(leaderShadowSeries ? [leaderShadowSeries] : []),
        ...series,
        ...(pitStopScatterSeries ? [pitStopScatterSeries] : []),
      ];

      const { vscBands, scBands, redFlagLaps } = buildRaceControlBands(
        data.sessions[0].race_control_messages,
      );

      if (seriesForChart.length > 0) {
        const first = series[0] as LineSeriesOption & {
          markArea?: unknown;
          markLine?: unknown;
        };

        const vscOrange = 'rgba(255, 180, 100, 0.35)';
        const scYellow = 'rgba(255, 235, 150, 0.35)';

        // Only set xAxis on each corner (omit yAxis). ECharts markArea then
        // defaults y to -Infinity/Infinity so the band spans the full grid height,
        // matching vertical markLine behaviour.
        const markAreaData = [
          ...vscBands.map(
            ([start, end]) =>
              [
                { xAxis: start, itemStyle: { color: vscOrange } },
                { xAxis: end },
              ] as const,
          ),
          ...scBands.map(
            ([start, end]) =>
              [
                { xAxis: start, itemStyle: { color: scYellow } },
                { xAxis: end },
              ] as const,
          ),
        ];

        first.markArea =
          markAreaData.length > 0
            ? {
                silent: true,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data: markAreaData as any,
              }
            : undefined;

        first.markLine =
          redFlagLaps.length > 0
            ? {
                silent: true,
                symbol: 'none',
                lineStyle: {
                  color: '#e53935',
                  width: 1.5,
                  type: 'dotted',
                },
                label: { show: false },
                data: redFlagLaps.map((lap) => ({ xAxis: lap })),
              }
            : undefined;
      }

      const option: EChartsOption = {
        title: {
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
          confine: true,
          formatter: function (params: unknown) {
            let tooltipContent = '';
            const typedParams = params as {
              value: unknown;
              seriesName: string;
              color?: string;
            }[];

            const firstXY = typedParams?.[0]
              ? lineDataXY(typedParams[0].value)
              : null;
            if (typedParams?.length && firstXY) {
              tooltipContent = `<div class='font-bold text-white'>Lap: ${firstXY[0]}</div>`;

              typedParams.sort((a, b) => {
                const ay = lineDataXY(a.value)?.[1] ?? 0;
                const by = lineDataXY(b.value)?.[1] ?? 0;
                return by - ay;
              });
              typedParams.forEach((item) => {
                if (item.seriesName.startsWith('__')) return;
                const xy = lineDataXY(item.value);
                if (!xy) return;
                const seriesName = item.seriesName.split(' ');
                const driverAbbr = seriesName[seriesName.length - 1];
                const driverColor = driverColorMap.get(driverAbbr) || '#FFFFFF';
                const deltaTime = xy[1];
                const deltaStr =
                  deltaTime > 0
                    ? `+${deltaTime.toFixed(3)}s`
                    : `${deltaTime.toFixed(3)}s`;
                tooltipContent += `<div><span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${driverColor};"></span><span style="color:${driverColor}">${driverAbbr}</span>: ${deltaStr}</div>`;
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
          min: 0,
          max: 'dataMax',
          interval: 2,
          splitLine: {
            lineStyle: {
              opacity: 0.5,
              type: 'dashed',
              width: 0.5,
            },
          },
        },
        yAxis: {
          type: 'value',
          name: 'Time offset from Average Pace (s)',
          nameLocation: 'middle',
          nameGap: 40,
          min: yAxisRange.min,
          max: yAxisRange.max,
          axisLabel: {
            formatter: '{value}s',
            showMinLabel: false,
            showMaxLabel: false,
          },
          splitLine: {
            lineStyle: {
              opacity: 0.5,
              type: 'dashed',
              width: 0.5,
            },
          },
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        series: seriesForChart as any,
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
