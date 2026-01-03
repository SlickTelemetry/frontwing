import { EChartsOption } from 'echarts';

export const baseOptions: EChartsOption = {
  backgroundColor: 'transparent',
  title: {
    left: 'center',
    textStyle: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    confine: true,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '15%',
    top: '15%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      color: '#fff',
      fontSize: 12,
    },
    axisTick: {
      alignWithLabel: true,
    },
    name: 'Driver',
    nameLocation: 'middle',
    nameGap: 35,
    nameTextStyle: {
      color: '#fff',
      fontSize: 14,
    },
  },
  yAxis: {
    type: 'value',
    name: 'Time (s)',
    nameLocation: 'middle',
    nameGap: 40,
    min: function (value: { min: number }) {
      return Math.floor(value.min);
    },
    max: function (value: { max: number }) {
      return Math.floor(value.max);
    },
    nameTextStyle: {
      color: '#fff',
      fontSize: 14,
    },
    axisLabel: {
      color: '#fff',
      formatter: '{value}s',
    },
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: 'rgba(255,255,255,0.3)',
      },
    },
  },
};
