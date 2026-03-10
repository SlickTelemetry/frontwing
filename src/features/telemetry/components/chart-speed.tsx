import { EChartsOption } from 'echarts';
import { LineSeriesOption } from 'echarts/charts';
import { useEffect, useRef } from 'react';

import { useECharts } from '@/hooks/use-EChart';

import { TelemetryItemContextValue } from '@/features/telemetry/hooks/useTelemetryData';

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
    bottom: '20%',
    left: 0,
    right: '2%',
    top: 0,
  },
  legend: {},
  xAxis: {
    type: 'value',
    max: 'dataMax',
    min: 'dataMin',
    // name: 'Time',
    // axisTick: {
    // show: true,
    // },
    // axisPointer: { type: 'shadow' },
    // nameLocation: 'middle',
    // nameGap: 35,
    // nameTextStyle: {
    //   color: 'var(--foreground)',
    //   fontSize: '1rem',
    // },
    splitLine: {
      show: false,
    },
    axisLabel: {
      show: false,
      //   formatter: (value) => {
      //     const formatted = formatLapTime(value) as string;
      //     return format.encodeHTML(formatted);
      //   },
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
    splitLine: { show: true, lineStyle: { opacity: 0.25 } },
    axisTick: { show: true },
    nameLocation: 'middle',
    nameGap: 40,
  },
};

export function SpeedChart({
  telemetries,
}: {
  telemetries: TelemetryItemContextValue[];
}) {
  const speedChartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useECharts(speedChartRef);

  // Update only dynamic pieces (series/xAxis/title)
  useEffect(() => {
    if (!chartInstance.current) return;

    if (telemetries.length === 0) {
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

    const series = telemetries.map((telemetryItem) => {
      const drsData: { xAxis: number }[][] = [];

      const lapData = telemetryItem.telemetry.map((telemetry, index) => {
        // Two checks for drs
        // 1. If valid drs differs from previous

        const prevDrsOn = [10, 12, 14].includes(
          telemetryItem.telemetry[index - 1]?.drs || 0,
        );

        const currDrsOn = !!(
          [10, 12, 14].includes(telemetry?.drs || 0) &&
          telemetryItem.telemetry[index + 1]
        );

        // if previous lap was on and this is off add end point for marker
        if (prevDrsOn && !currDrsOn) {
          drsData.at(-1)?.push({ xAxis: telemetry.distance as number });
        }

        // If current telemetry has drs on add initial marker
        if (!prevDrsOn && currDrsOn) {
          drsData.push([{ xAxis: telemetry.distance as number }]);
        }

        if (!telemetry.distance || !telemetry.speed) return [null, null];

        // return telemetry.speed;
        return [telemetry.distance, Math.floor(telemetry.speed)];
      });

      return {
        name: `${telemetryItem.driver} - ${telemetryItem.session} - L${telemetryItem.lap}`,
        type: 'line',
        smooth: true,
        symbol: 'none',
        sampling: 'lttb',
        connectNulls: true,
        color: telemetryItem.color,
        data: lapData,
        emphasis: {
          focus: 'series',
        },
        markArea: {
          silent: true,
          itemStyle: {
            opacity: 0.5,
          },
          data: drsData,
        },
      } as LineSeriesOption;
    });

    chartInstance.current.setOption(
      {
        ...baseOptions,
        series: series.flat(),
        title: { text: '' },
        legend: {
          data: telemetries.map(
            (t) => `${t.driver} - ${t.session} - L${t.lap}`,
          ),
        },
      },
      { replaceMerge: ['series'] },
    );
  }, [chartInstance, telemetries]);

  return <div ref={speedChartRef} style={{ width: '100%', height: '100%' }} />;
}
