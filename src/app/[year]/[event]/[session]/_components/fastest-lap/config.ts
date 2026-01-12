import { EChartsOption, format } from 'echarts';

import { formatLapTime } from '@/lib/utils';

export const baseOptions: EChartsOption = {
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'cross',
      label: {
        formatter(param) {
          const val = param.value as string;
          if (param.axisDimension === 'x') {
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
  yAxis: {
    type: 'category',
    axisTick: { show: true, alignWithLabel: true },
    axisPointer: { type: 'shadow' },
  },
  xAxis: {
    type: 'value',
    axisLine: {
      show: true,
    },
    min: 0,
    max: (value) => value.max * 1.004,
    axisLabel: {
      formatter: (value) => format.encodeHTML(formatLapTime(value) as string),
    },
    splitLine: {
      show: true,
    },
  },
};
