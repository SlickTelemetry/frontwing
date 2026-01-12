'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { useECharts } from '@/hooks/use-EChart';

import {
  baseOptions,
  ChartControls,
  generatePerRoundAvailablePoints,
  makeLineSeries,
  preparePoints,
  useStandingsSeries,
  useTooltipFormatter,
} from '@/app/[year]/standings/_components/chart';
import {
  buildConstructorPositionCountsTimeline,
  buildDriverPositionCountsTimeline,
} from '@/app/[year]/standings/_components/countback';
import { useHiddenItems } from '@/app/[year]/standings/_components/legend/context';

import {
  Event_Format_Choices_Enum,
  type GetStandingsQuery,
} from '@/types/graphql';

interface Props {
  events: GetStandingsQuery['events'];
  type: ViewType;
}

export function StandingsChart({ events, type }: Props) {
  const { data, toggleVisibility } = useHiddenItems();
  const { year } = useParams<{ year: string }>();
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useECharts(chartRef);

  // Chart Settings
  const [showTooltip, setShowTooltip] = useState(true);
  const [showPointsPerRound, setShowRoundPoints] = useState(false);
  const [showAvailablePoints, setShowAvailablePoints] = useState(false);

  const allRoundFormats = events.map(
    (e) => e.format ?? Event_Format_Choices_Enum.Conventional,
  );
  const allRounds = Array.from(
    { length: allRoundFormats.length },
    (_, i) => i + 1,
  );

  const perRoundAvailablePoints = generatePerRoundAvailablePoints({
    year: parseInt(year),
    allRoundFormats,
    type,
  });
  const availablePointsSeries = makeLineSeries(
    'Available Points',
    preparePoints(perRoundAvailablePoints, allRounds, showPointsPerRound),
    '#888888',
    'dashed',
  );

  const activeDrivers = data.drivers.filter((d) => !d.isHidden);
  const activeConstructors = data.constructors.filter((d) => !d.isHidden);
  const activeItems =
    type === 'drivers'
      ? activeDrivers.map((d) => d.abbreviation ?? '')
      : activeConstructors.map((constructor) => constructor.name ?? '');

  const formatTooltip = useTooltipFormatter({
    events,
    activeItems,
    buildPosition:
      type === 'drivers'
        ? buildDriverPositionCountsTimeline
        : buildConstructorPositionCountsTimeline,
  });

  const { driversSeries, constructorsSeries } = useStandingsSeries({
    drivers: activeDrivers,
    constructors: activeConstructors,
    allRounds,
    showPointsPerRound,
  });

  const baseSeries = type === 'drivers' ? driversSeries : constructorsSeries;

  // update chart
  useEffect(() => {
    if (!chartInstance.current) return;
    const activeSeries = [
      showAvailablePoints ? availablePointsSeries : null,
      ...baseSeries,
    ];

    chartInstance.current.setOption(
      {
        ...baseOptions,
        xAxis: { ...baseOptions.xAxis, data: allRounds },
        tooltip: {
          ...baseOptions.tooltip,
          formatter: showTooltip ? formatTooltip : () => {},
        },
        series: activeSeries,
      },
      { notMerge: true, lazyUpdate: true },
    );
  }, [
    chartInstance,
    allRounds,
    showTooltip,
    formatTooltip,
    showAvailablePoints,
    availablePointsSeries,
    baseSeries,
  ]);

  return (
    <>
      <ChartControls
        toggleVisibility={toggleVisibility}
        showTooltip={showTooltip}
        toggleTooltip={() => setShowTooltip((prev) => !prev)}
        showPointsPerRound={showPointsPerRound}
        togglePointsPerRound={() => setShowRoundPoints((prev) => !prev)}
        showAvailablePoints={showAvailablePoints}
        toggleAvailablePoints={() => setShowAvailablePoints((prev) => !prev)}
      />
      <div
        ref={chartRef}
        className='h-75 w-full pr-4 pb-2 pl-2 lg:h-100 2xl:h-125'
      />
    </>
  );
}
