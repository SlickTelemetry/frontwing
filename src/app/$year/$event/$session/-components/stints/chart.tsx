import { format, SeriesOption } from 'echarts';
import { useCallback, useEffect, useRef } from 'react';

import { useECharts } from '@/hooks/use-EChart';

import { useSessionItems } from '@/app/$year/$event/$session/-components/driver-filters/context';
import { baseOptions } from '@/app/$year/$event/$session/-components/stints/config';
import { tyreCompoundColors } from '@/app/$year/$event/$session/-constants';

import { GetSessionStintsQuery } from '@/types/graphql';

interface StintsEchartsChartProps {
  driverSessions: GetSessionStintsQuery['sessions'][number]['driver_sessions'];
}

interface CustomBarDataItem {
  value: [number, string];
  stint: number;
  constructor: string;
  color: string | null;
  originalStartLap: number;
  originalEndLap: number;
  tyreCompound: string;
  freshTyre: boolean;
  itemStyle?: {
    decal?: {
      symbol: string;
      symbolSize: number;
      rotation: number;
      symbolKeepAspect?: boolean;
      color: string;
      dashArrayX: number[];
      dashArrayY: number[];
    };
  };
}

export const StintsChart = ({ driverSessions }: StintsEchartsChartProps) => {
  const { hiddenItems } = useSessionItems();
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useECharts(chartRef);

  const setNoDataState = useCallback(() => {
    if (!chartInstance.current) return;
    chartInstance.current.setOption(
      {
        title: { text: 'No completed laps found to display' },
        series: [],
      },
      { replaceMerge: ['series'] },
    );
  }, [chartInstance]);

  const formatter = (params: {
    seriesName: string;
    data: CustomBarDataItem;
    value: [number, string];
  }) => {
    let tooltipContent = '';

    const stintNumber = parseInt(params.seriesName.replace('stint ', ''));
    tooltipContent += `<p class="font-bold">Stint ${stintNumber}</p><hr class="my-2"/>`;

    const data = params.data as CustomBarDataItem;
    if (data.value[0] === 0 || data.value === null) return;

    const driverName = (params.data as CustomBarDataItem).value[1];
    tooltipContent += `<div class="flex gap-2 items-center">${params.data.color && `<div class="size-4 rounded-full" style="background-color: ${params.data.color};"></div>`}<div><p class="font-semibold">${driverName}</p><p>${params.data.constructor}</p></div></div><hr class="my-2"/>`;

    const tyreColor =
      tyreCompoundColors[
        `${data.tyreCompound.toUpperCase()}_${data.freshTyre ? 'NEW' : 'OLD'}`
      ] || tyreCompoundColors.UNKNOWN_NEW;

    tooltipContent += `
                <div>
                  <div class="flex-1 flex gap-2 items-center">
                    <div class="size-4 rounded-full" style="background-color: ${tyreColor};"></div>
                      <div>
                        <p>${data.tyreCompound}</p>
                        <p>${data.originalEndLap + 1 - data.originalStartLap} Laps</p>
                      </div>
                      <div>
                        <p>(${data.freshTyre ? 'Fresh' : 'Used'})</p>
                        <p>(${data.originalStartLap} - ${data.originalEndLap})</p>
                      </div>
                    </div>
                </div>
              `;
    return tooltipContent;
  };

  useEffect(() => {
    if (!chartInstance.current) return;

    chartInstance.current.setOption({
      ...baseOptions,
      tooltip: { ...baseOptions.tooltip, formatter },
    });
  }, [chartInstance]);

  useEffect(() => {
    if (!chartInstance.current) return;

    if (driverSessions.length <= 0) {
      setNoDataState();
      return;
    }

    const series: SeriesOption[] = [];
    const driversSet = new Set<string>();
    let maxStintNumber = 0;
    let maxLaps = 0;

    driverSessions.forEach((ds) => {
      maxStintNumber = Math.max(maxStintNumber, ds.laps.at(-1)?.stint ?? 0);
      maxLaps = Math.max(maxLaps, ds.laps.length);
    });

    const sortedDriverNames = driverSessions
      .map((ds) => ds.driver?.abbreviation || '')
      .filter((name) => !hiddenItems.includes(name));

    for (let stintNumber = 1; stintNumber <= maxStintNumber; stintNumber++) {
      const stintDataForSeries: CustomBarDataItem[] = [];

      driverSessions.forEach((ds) => {
        const driverName = ds.driver?.abbreviation || '';
        if (hiddenItems.includes(driverName)) return;

        const stintData = ds.laps.reduce<CustomBarDataItem | null>(
          (acc, lap, index) => {
            if (lap.stint === stintNumber) {
              driversSet.add(driverName);

              if (!acc) {
                return {
                  value: [1, driverName],
                  stint: stintNumber,
                  driver: ds.driver?.full_name || '',
                  constructor: ds.constructorByConstructorId?.name || 'Unknown',
                  color: ds.constructorByConstructorId?.color
                    ? `#${ds.constructorByConstructorId.color}`
                    : null,
                  tyreCompound: lap.tyre_compound?.value || 'unknown',
                  freshTyre: lap.fresh_tyre || false,
                  originalStartLap: index + 1,
                  originalEndLap: index + 1,
                  itemStyle: {
                    decal: lap.fresh_tyre
                      ? undefined
                      : {
                          symbol: 'rect',
                          symbolSize: 1,
                          color: 'rgba(0,0,0,0.2)',
                          dashArrayX: [1, 0],
                          dashArrayY: [2, 5],
                          rotation: -Math.PI / 4,
                        },
                  },
                };
              } else {
                acc.value[0] = acc.value[0] + 1;
                acc.originalEndLap = index + 1;
              }
            }
            return acc;
          },
          null,
        );

        if (stintData) {
          stintDataForSeries.push(stintData);
        }
      });

      if (stintDataForSeries.length > 0) {
        series.push({
          name: `stint ${stintNumber}`,
          type: 'bar',
          stack: 'total',
          backgroundStyle: {
            color: 'var(--muted)',
          },
          emphasis: { disabled: true },
          label: {
            show: true,
            formatter: ({ value, ...params }) => {
              const data = params.data as CustomBarDataItem;
              const val = value as CustomBarDataItem['value'];
              let label = `S${data.stint}`;
              if (val[0] > 2) {
                label += `\n${val[0]} Lap${val[0] > 1 ? 's' : ''}`;
              }
              return format.encodeHTML(label);
            },

            position: 'inside',
            color: '#000',
          },
          itemStyle: {
            borderRadius: 4,
            borderWidth: 2,
            borderColor: 'transparent',
            color: (params) => {
              const data = params.data as CustomBarDataItem;
              const compoundKey = `${data.tyreCompound.toUpperCase()}_${
                data.freshTyre ? 'NEW' : 'OLD'
              }`;
              return (
                tyreCompoundColors[compoundKey] ||
                tyreCompoundColors.UNKNOWN_NEW
              );
            },
          },
          data: stintDataForSeries,
        });
      }
    }

    if (sortedDriverNames.length === 0) {
      setNoDataState();
      return;
    }

    chartInstance.current.setOption(
      {
        xAxis: { max: maxLaps },
        yAxis: { data: sortedDriverNames },
        series: series,
        title: { text: '' },
      },
      { replaceMerge: ['series'] },
    );
  }, [chartInstance, driverSessions, hiddenItems, setNoDataState]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};
