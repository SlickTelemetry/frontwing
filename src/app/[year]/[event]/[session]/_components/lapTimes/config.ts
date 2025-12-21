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
    left: '0%',
    right: '2%',
    bottom: '0%',
    top: '2%',
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
      color: 'var(--foreground)',
      fontSize: '1rem',
    },
    axisLine: {
      show: true,
    },
    splitLine: { show: true, lineStyle: { opacity: 0.75 } },
    min: (value) => value.min - 500,
    max: (value) => value.max + 500,
    axisTick: { show: true },
    nameLocation: 'middle',
    nameGap: 40,
    axisLabel: {
      formatter: (value) =>
        `${Math.floor(value / 60000)}:${Math.floor((value % 60000) / 1000)
          .toString()
          .padStart(2, '0')}`,
    },
  },
};
