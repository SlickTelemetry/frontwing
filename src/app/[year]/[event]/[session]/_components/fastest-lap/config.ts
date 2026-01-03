import { EChartsOption } from 'echarts';

export const baseOptions: EChartsOption = {
  title: {
    text: 'Fastest Lap Times',
    subtext: '{diamond|} = Potential is total of best sector times',
    subtextStyle: {
      rich: {
        diamond: {
          backgroundColor: {
            image:
              'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,0 100,50 50,100 0,50" fill="%23FFD700"/></svg>',
          },
          width: 12,
          height: 12,
          align: 'center',
          verticalAlign: 'middle',
        },
      },
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  xAxis: {
    type: 'category',
    name: 'Drivers',
    nameLocation: 'middle',
    nameGap: 25,
    axisTick: {
      alignWithLabel: true,
    },
  },
  yAxis: {
    type: 'value',
    name: 'Time (s)',
    nameLocation: 'middle',
    nameGap: 40,
    axisLabel: {
      formatter: '{value}s',
    },
    min: function (value: { min: number }) {
      return Math.floor(value.min);
    },
    max: function (value: { max: number }) {
      return Math.floor(value.max);
    },
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: 'rgba(255,255,255,0.3)',
      },
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  backgroundColor: 'transparent',
};
