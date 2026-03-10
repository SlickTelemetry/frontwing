import { useQuery } from '@apollo/client/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { eventLocationDecode } from '@/lib/utils';

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
import { Label } from '@/components/ui/label';

import { graphql } from '@/types';
import {
  Driver_Sessions_Bool_Exp,
  Drivers_Bool_Exp,
  GetTelemetryOptionDriversWithLapsQuery,
} from '@/types/graphql';

type DriverProps = GetTelemetryOptionDriversWithLapsQuery['drivers'][number];

function buildTelemetryWhere({
  event,
  season,
  circuit,
}: {
  event?: string | null;
  season?: number | null;
  circuit?: string | null;
}): Drivers_Bool_Exp | null {
  const lapsFilter = {
    laps_aggregate: {
      count: {
        filter: { lap_time: { _is_null: false } },
        predicate: { _gt: 0 },
        arguments: ['lap_time'],
      },
    },
  } as Driver_Sessions_Bool_Exp;

  // Case 1: Circuit mode
  if (circuit) {
    return {
      driver_sessions: {
        ...lapsFilter,
        session: {
          circuit: {
            name: { _eq: circuit },
          },
        },
      },
    };
  }

  // Case 2: Event mode (must have both)
  if (event && season) {
    return {
      driver_sessions: {
        ...lapsFilter,
        session: {
          event: {
            name: { _eq: eventLocationDecode(event) },
            year: { _eq: season },
          },
        },
      },
    };
  }

  // Optional safety guard (should never happen)
  return null;
}

export function DriverFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const circuit = searchParams.get('circuit');
  const season = searchParams.get('season')
    ? parseInt(searchParams.get('season') as string)
    : null;
  const event = searchParams.get('event');

  const where = buildTelemetryWhere({ event, season, circuit });
  const [driver, setDriver] = useState<DriverProps | null>();
  const { data } = useQuery(
    graphql(`
      query GetTelemetryOptionDriversWithLaps($where: drivers_bool_exp!) {
        drivers(
          where: $where
          order_by: { full_name: asc }
          distinct_on: full_name
        ) {
          abbreviation
          full_name
        }
      }
    `),
    {
      variables: { where: where as Drivers_Bool_Exp },
      skip: !where,
    },
  );

  const handleDriverSelect = (driver: DriverProps | null) => {
    const params = new URLSearchParams(searchParams);
    params.append('driver', driver?.abbreviation || '');
    router.push(`?${params.toString()}`, { scroll: false });
    setDriver(driver);
  };

  return (
    <div className='mx-auto flex items-center gap-4 py-4'>
      <p className='flex size-8 items-center justify-center rounded-full border'>
        2
      </p>
      <div className='flex flex-1 flex-col'>
        <Label htmlFor='driver' className='pb-1 text-lg'>
          Add a driver
        </Label>
        <Combobox
          id='driver'
          disabled={!data?.drivers}
          items={data?.drivers || []}
          value={driver || null}
          itemToStringLabel={(d) => d?.abbreviation || ''}
          onValueChange={handleDriverSelect}
        >
          <ComboboxInput className='w-75' placeholder='Driver' />
          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(driver) => (
                <ComboboxItem key={driver.abbreviation} value={driver}>
                  {driver.full_name}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
  );
}
