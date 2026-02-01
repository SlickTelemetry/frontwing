'use client';
import { EChartsOption, format } from 'echarts';
import { LineSeriesOption } from 'echarts/charts';
import { useEffect, useRef } from 'react';

import { formatLapTime } from '@/lib/utils';
import { useECharts } from '@/hooks/use-EChart';

import { GetTelemetryQuery } from '@/types/graphql';

export const baseOptions: EChartsOption = {
  backgroundColor: 'transparent',
  color: 'var(--foreground)',
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
    name: 'RPM',
    nameTextStyle: {
      fontSize: '1rem',
    },
    axisLine: {
      show: true,
    },
    min: (value) => Math.floor(value.min / 500) * 500,
    splitLine: { show: true, lineStyle: { opacity: 0.75 } },
    axisTick: { show: true },
    nameLocation: 'middle',
    nameGap: 40,
    axisLabel: {
      formatter: (value) => value / 1000 + 'k',
    },
  },
};

export function RPMChart({
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

    const series = driverSessions?.map((driver) => {
      const lapData = driver.telemetries.map((telemetry) => [
        telemetry.time,
        telemetry.rpm,
      ]);
      return {
        name: 'VER',
        type: 'line',
        smooth: true,
        connectNulls: true,
        color: '#3671C6',
        areaStyle: {
          opacity: 0.1,
        },
        data: lapData,
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
