'use client';
import { EChartsOption } from 'echarts';
import { useEffect, useRef } from 'react';

import { useECharts } from '@/hooks/use-EChart';

import { GetTelemetryQuery } from '@/types/graphql';

const charts = {
  speed: {
    title: 'Speed (KM/H)',
    height: '25%',
    top: 0,
  },
  throttle: {
    title: 'Throttle',
    height: '20%',
    top: '27%',
  },
  rpm: {
    title: 'RPM',
    height: '15%',
    top: '49%',
    yAxis: { formatter: (value: number) => value / 1000 + 'k' },
  },
  gear: {
    title: 'Gear',
    height: '10%',
    top: '66%',
  },
  brake: {
    title: 'Brake (ON/OFF)',
    height: '10%',
    top: '78%',
  },
  drs: {
    title: 'DRS (ON/OFF)',
    height: '10%',
    top: '90%',
  },
};

export const baseOptions: EChartsOption = {
  axisPointer: {
    link: [
      {
        xAxisIndex: 'all',
      },
    ],
  },
  dataZoom: [
    {
      show: true,
      realtime: true,
      // start: 30,
      // end: 70,
      xAxisIndex: [0, 1, 2, 3, 4, 5, 6],
    },
  ],
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'var(--background)',
    order: 'valueDesc',
    confine: true,
    borderColor: '#333',
    borderWidth: 1,
  },
  grid: Object.values(charts).map((chart) => ({
    left: 0,
    right: '2%',
    height: chart.height,
    top: chart.top,
  })),
  xAxis: Object.values(charts).map((_, idx) => ({
    type: 'category',
    show: false,
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
    position: idx + (1 % 2) === 0 ? 'top' : 'bottom',
    gridIndex: idx,
  })),
  yAxis: Object.values(charts).map((chart, idx) => ({
    gridIndex: idx,
    type: 'value',
    name: chart.title,
    nameTextStyle: {
      fontSize: '1rem',
    },
    axisLine: {
      show: true,
    },
    axisLabel: {
      formatter: (val) =>
        'yAxis' in chart && chart.yAxis?.formatter
          ? chart.yAxis.formatter(val)
          : val.toString(),
    },
    splitLine: { show: true, lineStyle: { opacity: 0.75 } },
    axisTick: { show: true },
    nameLocation: 'middle',
    nameGap: 40,
  })),
};

export function TelemetryChart({
  driverSessions,
}: {
  driverSessions: GetTelemetryQuery['driver_sessions'];
}) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useECharts(chartRef);

  useEffect(() => {
    if (!chartInstance.current) return;

    if (driverSessions.length === 0) {
      chartInstance.current.setOption(
        {
          title: {
            text: 'No completed laps found to display',
            left: 'center',
            top: 'center',
          },
          series: [],
        },
        { replaceMerge: ['series'] },
      );
      return;
    }

    const lapData = driverSessions.reduce(
      (acc, driver) => {
        driver.telemetries.forEach((telemetry) => {
          Object.keys(charts).forEach((chart) => {
            const key = chart as keyof typeof telemetry;
            acc[key] = acc[key] || [];
            acc[key].push([telemetry.time as number, telemetry[key] as number]);
          });
        });
        return acc;
      },
      {} as Record<string, [number, number][]>,
    );

    const series = Object.keys(lapData).map((dataType, idx) => ({
      name: charts[dataType as keyof typeof charts],
      type: 'line',
      smooth: true,
      connectNulls: true,
      emphasis: { focus: 'none' },
      data: lapData[dataType],
      xAxisIndex: idx,
      yAxisIndex: idx,
      lineStyle: {
        width: 2,
      },
      areaStyle: {
        opacity: 0.1,
      },
      color: '#3671C6',
    }));

    chartInstance.current.setOption(
      {
        ...baseOptions,
        // xAxis: {
        //   type: 'category',
        //   axisLabel: {
        //     formatter: (value) => {
        //       const totalMs = parseFloat(value) / 1e9;
        //       const formatted = formatLapTime(totalMs) as string;
        //       return format.encodeHTML(formatted);
        //     },
        //   },
        // },
        // yAxis: {
        //   type: 'value',
        //   name: 'Telemetry Data',
        // },
        // legend: {
        //   data: Object.values(charts),
        //   top: 10,
        // },
        series,
      },
      { replaceMerge: ['series'] },
    );
  }, [chartInstance, driverSessions]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
}
