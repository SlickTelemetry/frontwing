import { EChartsOption, format } from 'echarts';

import { formatLapTime } from '@/lib/utils';

export const baseOptions: EChartsOption = {
  backgroundColor: 'transparent',
  color: 'var(--foreground)',
  dataZoom: [
    {
      type: 'slider',
      xAxisIndex: 0,
      start: 0,
      end: 100,
      bottom: 10,
      handleSize: '120%',
    },
  ],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        formatter(param) {
          const val = param.value as string;
          if (param.axisDimension === 'y') {
            return formatLapTime(val) as string;
          }
          return val;
        },
      },
    },
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    order: 'valueDesc',
    confine: true,
    borderColor: '#333',
    borderWidth: 1,
    textStyle: {
      color: '#fff',
    },
  },
  grid: {
    bottom: 100,
    left: 0,
    right: 0,
    top: 0,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    name: 'Lap Number',
    axisTick: { show: true, alignWithLabel: true },
    axisPointer: { type: 'shadow' },
    nameLocation: 'middle',
    nameGap: 35,
    nameTextStyle: {
      color: 'var(--foreground)',
      fontSize: '1rem',
    },
  },
  yAxis: {
    type: 'time',
    name: 'Lap Times',
    nameTextStyle: {
      fontSize: '1rem',
    },
    axisLine: {
      show: true,
    },
    splitLine: { show: true, lineStyle: { opacity: 0.75 } },
    min: (value) => value.min - 500,
    max: (value) => value.max * 1.001,
    axisTick: { show: true },
    nameLocation: 'middle',
    nameGap: 40,
    axisLabel: {
      formatter: (value) =>
        format.encodeHTML(
          `${Math.floor(value / 60000)}:${Math.floor((value % 60000) / 1000)
            .toString()
            .padStart(2, '0')}`,
        ),
    },
  },
};
