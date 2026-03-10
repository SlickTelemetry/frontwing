import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { eventLocationDecode, eventLocationEncode } from '@/lib/utils';

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
import { Label } from '@/components/ui/label';

import { GetTelemetryOptionsQuery } from '@/types/graphql';

export function CircuitFilter({ data }: { data?: GetTelemetryOptionsQuery }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const circuit = eventLocationDecode(searchParams.get('circuit'));

  const circuits: string[] | undefined = data?.circuits
    .map((c) => c.name)
    .filter(Boolean) as string[] | undefined;

  const onCircuitChange = (circuit?: string | null) => {
    if (!circuit) return;
    const params = new URLSearchParams(searchParams);

    params.set('circuit', eventLocationEncode(circuit) || '');
    params.delete('f');
    params.delete('season');
    params.delete('event');

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <Label htmlFor='circuit' className='pb-1 text-lg'>
        Select by Circuit
      </Label>

      <Combobox
        id='circuit'
        items={circuits || []}
        value={circuit}
        onValueChange={onCircuitChange}
      >
        <ComboboxInput className='w-75' placeholder='Circuit' />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(circuit: string) => (
              <ComboboxItem key={circuit} value={circuit}>
                {circuit}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </>
  );
}
