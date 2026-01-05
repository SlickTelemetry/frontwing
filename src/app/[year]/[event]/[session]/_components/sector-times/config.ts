import { EChartsOption } from 'echarts';

import { formatLapTime } from '@/lib/utils';

export const baseOptions: EChartsOption = {
  backgroundColor: 'transparent',
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
    order: 'valueDesc',
    confine: true,
    backgroundColor: 'var(--background)',
    borderWidth: 1,
  },
  grid: {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  xAxis: {
    type: 'category',
    axisTick: { show: true, alignWithLabel: true },
    axisPointer: { type: 'shadow' },
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: true,
    },
    min: (value) => value.min - 25,
    max: (value) => value.max + 100,
    axisLabel: {
      formatter: (value) => formatLapTime(value) as string,
    },
    splitLine: {
      show: true,
    },
  },
};
