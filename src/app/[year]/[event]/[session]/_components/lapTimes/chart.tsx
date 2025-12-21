'use client';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { useEffect, useRef } from 'react';

import { GetSessionLapTimesQuery } from '@/types/graphql';

echarts.use([LineChart, TooltipComponent, GridComponent, CanvasRenderer]);

import { formatLapTime } from '@/lib/utils';
import { useECharts } from '@/hooks/use-EChart';

import { useSessionItems } from '@/app/[year]/[event]/[session]/_components/driver-filters/context';
import { baseOptions } from '@/app/[year]/[event]/[session]/_components/lapTimes/config';

export const LapTimesChart = ({
  data,
  showPitIn,
  hideOutliers,
}: {
  data?: GetSessionLapTimesQuery;
  showPitIn: boolean;
  hideOutliers: number | null;
}) => {
  const { hiddenDrivers } = useSessionItems();

  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useECharts(chartRef);

  // Initialize base options once (tooltip uses item color, not external maps)
  useEffect(() => {
    if (!chartInstance.current) return;

    const driverColorMap = new Map<string, string>();
    data?.sessions?.[0]?.driver_sessions.forEach((driver) => {
      if (driver?.driver?.abbreviation) {
        driverColorMap.set(
          driver.driver.abbreviation,
          `#${driver.constructorByConstructorId?.color || 'cccccc'}`,
        );
      }
    });

    const formatter = function (
      params: {
        seriesName: string;
        value: [number, number | null, string];
      }[],
    ) {
      let tooltipContent = '';
      if (params && params.length > 0 && params[0]?.value) {
        // value[0] is a zero-based index, display as 1-based lap number
        const lapIdx = Number(params[0].value[0] ?? 0);
        tooltipContent = `<div class='font-bold text-white'>Lap: ${lapIdx + 1}</div>`;
        params
          .filter((item) => item.value[1] !== null)
          .sort((a, b) => {
            return (a.value[1] ?? 0) - (b.value[1] ?? 0);
          })
          .forEach((item) => {
            const [_lapNum, lapTime, tyre] = item.value as [
              number,
              number,
              string,
            ];
            const driverColor =
              driverColorMap.get(item.seriesName ?? '') || '#FFFFFF';
            if (lapTime) {
              const formattedTime = formatLapTime(lapTime ?? 0);
              tooltipContent += `<div><span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${driverColor};"></span><span style="color:${driverColor}">${item.seriesName}</span>: ${formattedTime} ${tyre}</div>`;
            }
          });
      }
      return tooltipContent;
    };

    chartInstance.current.setOption(
      {
        ...baseOptions,
        tooltip: { ...baseOptions.tooltip, formatter },
      },
      true,
    );
  }, [chartInstance, data]);

  // Update only dynamic pieces (series/xAxis/title)
  useEffect(() => {
    if (!chartInstance.current) return;

    const driverSessions =
      data?.sessions?.[0]?.driver_sessions?.filter(
        (s) => !hiddenDrivers.includes(s?.driver?.abbreviation ?? ''),
      ) || [];

    const allLaps = Array.from({
      length:
        driverSessions?.reduce(
          (acc, driver) => Math.max(acc, driver.laps.length),
          0,
        ) ?? 0,
    }).map((_, lapIdx) => lapIdx + 1);

    if (driverSessions.length === 0) {
      chartInstance.current.setOption(
        {
          title: {
            text: 'No completed laps found to display raw',
            left: 'center',
            top: 'center',
          },
          series: [],
          xAxis: { data: allLaps },
        },
        { replaceMerge: ['series'] },
      );
      return;
    }

    const series = driverSessions.map((driver) => {
      //TODO:  Halfway to 107% rule, should be based on field average not driver avg
      const avgLapTime = driver.laps_aggregate.aggregate?.avg?.lap_time;
      const color = `#${driver?.constructorByConstructorId?.color || 'cccccc'}`;
      const lapData = [...driver?.laps]
        // ?.filter((lap) => !!lap?.lap_number && lap.lap_time !== null)
        .map((lap) => {
          // Use zero-based lap index so it maps to xAxis category indexes (0 -> lap 1)
          const lapNum = lap.lap_number ? lap.lap_number - 1 : 0;

          // Filter pit laps
          if (!showPitIn && (lap.pitin_time || lap.pitout_time))
            return [lapNum, null];

          // Filter outliers
          if (hideOutliers) {
            const outlierTime = avgLapTime
              ? avgLapTime * hideOutliers
              : Infinity;
            if ((lap.lap_time ?? 0) > outlierTime) {
              return [lapNum, null];
            }
          }
          // Include tyre compound in data for tooltip
          return [lapNum, lap.lap_time ?? null, lap.compound];
        });

      return {
        name: driver?.driver?.abbreviation,
        type: 'line',
        smooth: true,
        connectNulls: true,
        lineStyle: {
          color: color,
          cap: 'round',
          width: 2,
        },
        itemStyle: {
          color: color,
        },
        data: lapData,
      } as LineSeriesOption;
    });

    chartInstance.current.setOption(
      {
        series,
        xAxis: {
          data: allLaps,
        },
        title: { text: '' },
      },
      { replaceMerge: ['series'] },
    );
  }, [chartInstance, data?.sessions, hiddenDrivers, hideOutliers, showPitIn]);

  return (
    <>
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </>
  );
};
