// Config options can be found here
// https://echarts.apache.org/en/option.html
export const chartConfig = {
  backgroundColor: 'transparent',
  grid: {
    top: '0%',
    left: '0%',
    right: '0%',
    bottom: '0%',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'cross' },
    order: 'valueDesc',
    confine: true,
    className: 'max-w-md !text-sm',
    backgroundColor: 'var(--background)',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisTick: { show: true, alignWithLabel: true },
    axisPointer: { type: 'shadow' },
    name: 'Round',
    nameTextStyle: {
      fontSize: '1rem',
    },
    nameLocation: 'middle',
    nameGap: 35,
  },
  yAxis: {
    axisPointer: {
      type: 'line',
      label: { precision: 0 },
    },
    type: 'value',
    name: 'Points',
    nameTextStyle: {
      fontSize: '1rem',
    },
    nameLocation: 'middle',
    nameGap: 35,
  },
};
