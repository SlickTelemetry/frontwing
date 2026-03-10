'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { eventLocationDecode, eventLocationEncode } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/use-storage';

import { Button } from '@/components/ui/button';

import { getTelemetryOptions } from '@/features/telemetry/api/get-telemetry-options';
import { CircuitFilter } from '@/features/telemetry/components/filter-circuit';
import { YearEventFilter } from '@/features/telemetry/components/filter-year-event';

export default function EventYearFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [circuitMode, setCircuitMode] = useLocalStorage<boolean>(
    'telemetryCircuitMode',
    searchParams.get('circuit') ? true : false,
  );

  const { data } = getTelemetryOptions();

  const handleCircuitModeToggle = () => {
    const params = new URLSearchParams(searchParams);
    if (circuitMode) {
      // changing to year/event, remove circuit
      params.delete('circuit');
      router.push(`?${params.toString()}`, { scroll: false });
    } else {
      // changing to circuit, set circuit based off year/event if possible
      const year = params.get('season');
      const event = params.get('event');
      if (event && year) {
        const selectedEvent = data?.events.find(
          (e) =>
            e.name === eventLocationDecode(event) &&
            e.year?.toString() === year,
        );

        const circuitMatch = selectedEvent?.sessions[0].circuit?.name;
        if (circuitMatch) {
          params.set('circuit', eventLocationEncode(circuitMatch) || '');
        }
      }

      params.delete('season');
      params.delete('event');
      router.push(`?${params.toString()}`, { scroll: false });
    }

    setCircuitMode(!circuitMode);
  };

  return (
    <div className='mx-auto flex items-center gap-4 py-4'>
      <p className='flex size-8 items-center justify-center rounded-full border'>
        1
      </p>
      <div className='flex flex-1 flex-col'>
        {circuitMode && <CircuitFilter data={data} />}

        {!circuitMode && <YearEventFilter data={data} />}

        <Button
          className='w-fit'
          variant='link'
          onClick={handleCircuitModeToggle}
        >
          {circuitMode ? 'Search by Year & Event' : 'Search by Circuit'}
        </Button>
      </div>
    </div>
  );
}
