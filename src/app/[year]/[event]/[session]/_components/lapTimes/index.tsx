'use client';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import React, { useEffect, useRef, useState } from 'react';

import { GetSessionLapTimesQuery } from '@/types/graphql';

echarts.use([LineChart, TooltipComponent, GridComponent, CanvasRenderer]);

import {
  CallbackDataParams,
  TopLevelFormatterParams,
} from 'echarts/types/dist/shared';

import { useECharts } from '@/hooks/use-EChart';

import { Toggle } from '@/components/toggle';

import { useSessionItems } from '@/app/[year]/[event]/[session]/_components/driver-filters/context';
import { baseOptions } from '@/app/[year]/[event]/[session]/_components/lapTimes/config';

export const LapTimesChart = ({ data }: { data?: GetSessionLapTimesQuery }) => {
  const { data: sessionData } = useSessionItems();
  const [hideOutliers, setHideOutliers] = useState(false);

  // TODO: Take this logic and return directly from hook
  const hiddenDrivers = sessionData.drivers
    .filter((d) => d.isHidden)
    .map((d) => d.abbreviation);
  // TODO:

  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useECharts(chartRef);

  const driverSessions = React.useMemo(() => {
    return (
      data?.sessions?.[0]?.driver_sessions?.filter(
        (s) => !hiddenDrivers.includes(s?.driver?.abbreviation),
      ) || []
    );
  }, [data, hiddenDrivers]);

  // Create a map for driver abbreviation to constructor color
  const driverColorMap = React.useMemo(() => {
    const map = new Map<string, string>();
    driverSessions.forEach((driver) => {
      if (driver?.driver?.abbreviation) {
        map.set(
          driver.driver.abbreviation,
          `#${driver.constructorByConstructorId?.color || 'cccccc'}`,
        );
      }
    });
    return map;
  }, [driverSessions]);

  const allLaps = Array.from({
    length: data?.sessions?.[0]?.driver_sessions[0].laps.length ?? 0,
  }).map((_, idx) => idx + 1);

  const baselineLap = driverSessions
    .find((driverSession) =>
      driverSession?.laps?.some((lap) => lap?.lap_time !== null),
    )
    ?.laps?.find((lap) => lap?.lap_time !== null)?.lap_time;

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      if (baselineLap === null || baselineLap === undefined) {
        chart.setOption({
          title: {
            text: 'No completed laps found to display raw',
            left: 'center',
            top: 'center',
          },
        });
        return;
      }

      chart.setOption({
        ...baseOptions,
        xAxis: {
          ...baseOptions.xAxis,
          data: allLaps,
        },
        tooltip: {
          ...baseOptions.tooltip,
          formatter: function (params: TopLevelFormatterParams) {
            let tooltipContent = '';

            const typedParams = params as CallbackDataParams[];
            if (
              typedParams &&
              typedParams.length > 0 &&
              typedParams[0]?.value
            ) {
              tooltipContent = `<div class='font-bold text-white'>Lap: ${typedParams[0].name}</div>`;

              typedParams
                .sort((a, b) => {
                  return (a.value as number[])[1] - (b.value as number[])[1];
                })
                .forEach((item) => {
                  const driverAbbr = item.seriesName;
                  const driverColor =
                    driverColorMap.get(driverAbbr ?? '') || '#FFFFFF';
                  if (item.value) {
                    const lapTimeMs = (item.value as number) ?? 0;
                    const minutes = Math.floor(lapTimeMs / 60000);
                    const seconds = Math.floor((lapTimeMs % 60000) / 1000);
                    const milliseconds = lapTimeMs % 1000;
                    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;

                    tooltipContent += `<div><span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${driverColor};"></span><span style="color:${driverColor}">${item.seriesName}</span>: ${formattedTime}</div>`;
                  }
                });
            }
            return tooltipContent;
          },
        },
      });

      return () => {
        chart.dispose();
      };
    }
  }, [allLaps, baselineLap, driverColorMap]);

  useEffect(() => {
    if (!chartInstance.current) return;

    const chart = echarts.init(chartRef.current);

    if (driverSessions.length === 0) {
      chart.setOption({
        title: {
          text: 'No completed laps found to display raw',
          left: 'center',
          top: 'center',
        },
      });
      return;
    }

    const series = driverSessions.map((driver) => {
      //TODO:  Halfway to 107% rule, should be based on field average not driver avg
      const avgLapTime = driver.laps_aggregate.aggregate?.avg?.lap_time;
      const color = `#${driver?.constructorByConstructorId?.color || 'cccccc'}`;
      const lapData = [...driver?.laps]
        ?.filter((lap) => !!lap?.lap_number && lap.lap_time !== null)
        //For outliers remove pitin laps and filter based on 107% rule (but right now 107% driver avg)
        .filter((lap) => {
          if (!hideOutliers) return true;
          if (lap.pitin_time) return false;
          const outlier107 = avgLapTime ? avgLapTime * 1.07 : Infinity;
          return (lap.lap_time ?? 0) < outlier107;
        })
        .map((lap) => lap.lap_time ?? 0);

      return {
        name: driver?.driver?.abbreviation,
        type: 'line',
        smooth: true,
        showSymbol: false,
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

    chart.setOption({ series });
  }, [chartInstance, driverSessions, hideOutliers]);

  return (
    <>
      <div className='absolute z-10 flex w-fit items-center gap-4'>
        <Toggle
          id='hide-outliers'
          toggle={() => setHideOutliers((prev) => !prev)}
          checked={hideOutliers}
        >
          Hide outlier
        </Toggle>
      </div>
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </>
  );
};
