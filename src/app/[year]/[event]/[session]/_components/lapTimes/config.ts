import { EChartsOption } from 'echarts';

export const baseOptions: EChartsOption = {
  title: {
    text: 'Lap Times',
    left: 'center',
    top: 'top',
    textStyle: {
      color: '#fff',
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        formatter(param) {
          if (param.axisDimension === 'y') {
            const lapTimeMs = param.value as number;
            const minutes = Math.floor(lapTimeMs / 60000);
            const seconds = Math.floor((lapTimeMs % 60000) / 1000);
            const milliseconds = lapTimeMs % 1000;
            return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().slice(0, 3)}`;
          }
          return param.value as string;
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
    top: '5%',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    name: 'Raw Lap Number',
    axisTick: { show: true, alignWithLabel: true },
    axisPointer: { type: 'shadow' },
    splitLine: { show: true, lineStyle: { opacity: 0.25 } },
    nameLocation: 'middle',
    nameGap: 35,
    nameTextStyle: {
      color: '#fff',
      fontSize: '1rem',
    },
  },
  yAxis: {
    type: 'time',
    name: 'Times',
    nameTextStyle: {
      color: '#fff',
      fontSize: '1rem',
    },
    axisLine: {
      show: true,
    },
    splitLine: { show: true, lineStyle: { opacity: 0.25 } },
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
