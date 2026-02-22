'use client';

import { useParams } from '@tanstack/react-router';

import { SUPPORTED_SEASONS } from '@/lib/constants';
import useUrlUpdater from '@/hooks/use-url-updater';

import { BaseSelector } from '@/components/navigation/selector';

export function SeasonSelector() {
  const updateUrl = useUrlUpdater();
  const { year } = useParams({ strict: false });

  const value = SUPPORTED_SEASONS.find(
    (y) => y.toString() === year,
  )?.toString();

  return (
    <BaseSelector
      value={value}
      placeholder='Season'
      items={SUPPORTED_SEASONS.map((y) => ({
        label: y.toString(),
        value: y.toString(),
      }))}
      onChange={(val) => updateUrl('year', val)}
      width='w-24'
    />
  );
}
