import { EChartsOption } from 'echarts';

export const baseOptions: EChartsOption = {
  backgroundColor: 'transparent',
  textStyle: {
    fontFamily: 'var(--my-font), monospace',
  },
  color: 'var(--foreground)',
  title: {
    left: 'center',
    top: 'center',
  },
  tooltip: {
    trigger: 'item', // Change trigger to axis for stacked bars
    backgroundColor: 'rgba(0, 0, 0, 1)', // Dark background
    borderColor: '#60A5FA', // Light blue border
    borderWidth: 1,
    borderRadius: 4,
    textStyle: {
      color: '#E2E8F0', // Light grey text
    },
    axisPointer: {
      type: 'cross',
      label: {
        formatter(param) {
          const val = param.value as number;
          if (param.axisDimension === 'x') {
            return Math.floor(val).toString();
          }
          return val.toString();
        },
      },
    },
  },
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  xAxis: {
    type: 'value',
    name: 'Laps',
    axisLine: { show: true },
    nameLocation: 'middle',
    nameGap: 25,
    nameTextStyle: {
      // color: 'var(--foreground)',
      fontSize: '1rem',
      fontFamily: 'var(--my-font), monospace',
    },
  },
  yAxis: {
    type: 'category',
    name: 'Drivers',
    nameLocation: 'middle',
    nameGap: 40,
    nameTextStyle: {
      // color: 'var(--foreground)',
      fontSize: '1rem',
    },
  },
};
