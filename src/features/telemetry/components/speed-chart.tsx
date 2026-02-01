'use client';
import { EChartsOption, format } from 'echarts';
import { LineSeriesOption } from 'echarts/charts';
import { useEffect, useRef } from 'react';

import { formatLapTime } from '@/lib/utils';
import { useECharts } from '@/hooks/use-EChart';

import { GetTelemetryQuery } from '@/types/graphql';

export const baseOptions: EChartsOption = {
  // backgroundColor: 'transparent',
  // color: 'var(--foreground)',
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'var(--background)',
    order: 'valueDesc',
    confine: true,
    borderColor: '#333',
    borderWidth: 1,
  },
  grid: {
    bottom: 0,
    left: 0,
    right: '2%',
    top: 0,
  },
  xAxis: {
    type: 'category',
    // name: 'Time',
    axisTick: {
      show: true,
    },
    axisPointer: { type: 'shadow' },
    nameLocation: 'middle',
    nameGap: 35,
    nameTextStyle: {
      color: 'var(--foreground)',
      fontSize: '1rem',
    },
    axisLabel: {
      formatter: (value) => {
        const totalMs = parseFloat(value) / 1e9;
        const formatted = formatLapTime(totalMs) as string;
        return format.encodeHTML(formatted);
      },
    },
  },
  yAxis: {
    type: 'value',
    name: 'Speed (km/h)',
    nameTextStyle: {
      fontSize: '1rem',
    },
    axisLine: {
      show: true,
    },
    splitLine: { show: true, lineStyle: { opacity: 0.75 } },
    axisTick: { show: true },
    nameLocation: 'middle',
    nameGap: 40,
  },
};

export function SpeedChart({
  driverSessions,
}: {
  driverSessions: GetTelemetryQuery['driver_sessions'];
}) {
  const speedChartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useECharts(speedChartRef);

  // Update only dynamic pieces (series/xAxis/title)
  useEffect(() => {
    if (!chartInstance.current) return;

    if (driverSessions.length === 0) {
      chartInstance.current.setOption(
        {
          title: {
            text: 'No completed laps found to display raw',
            left: 'center',
            top: 'center',
          },
          series: [],
          // xAxis: { data: allLaps },
        },
        { replaceMerge: ['series'] },
      );
      return;
    }

    const series = driverSessions.map((driver) => {
      const drsData: { xAxis: number }[][] = [];
      const lapData = driver.telemetries.map((telemetry, index) => {
        // Two checks for drs
        // 1. If valid drs differs from previous

        const prevDrsOn = [10, 12, 14].includes(
          driver.telemetries[index - 1]?.drs || 0,
        );
        const currDrsOn = [10, 12, 14].includes(telemetry?.drs || 0);

        // if previous lap was on and this is off add end point for marker
        if (prevDrsOn && !currDrsOn) {
          drsData.at(-1)?.push({ xAxis: index });
        }

        // If current telemetry has drs on add initial marker
        if (!prevDrsOn && currDrsOn) {
          drsData.push([{ xAxis: index }]);
        }

        return [telemetry.time, telemetry.speed];
      });

      return {
        name: 'VER',
        type: 'line',
        smooth: true,
        connectNulls: true,
        emphasis: { focus: 'none' },
        color: '#3671C6',
        areaStyle: {
          opacity: 0.1,
        },
        data: lapData,
        markArea: {
          silent: true,
          itemStyle: {
            color: '#3671C680',
            opacity: 0.5,
          },
          data: drsData,
        },
      } as LineSeriesOption;
    });

    chartInstance.current.setOption(
      {
        ...baseOptions,
        series,
        title: { text: '' },
      },
      { replaceMerge: ['series'] },
    );
  }, [chartInstance, driverSessions]);

  return <div ref={speedChartRef} style={{ width: '100%', height: '100%' }} />;
}
