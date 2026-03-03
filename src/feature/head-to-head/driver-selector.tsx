'use client';
import { useLazyQuery, useQuery } from '@apollo/client/react';
import { PlusCircle } from 'lucide-react';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useEffect, useState } from 'react';

import { SUPPORTED_SEASONS } from '@/lib/constants';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { graphql } from '@/types';

const paramSplitChar = '.';

export function HeadToHeadDriverSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const existingDrivers = searchParams.getAll('driver');

  const { year } = useParams<{ year: string }>();
  const [getAllDriverSeasons] = useLazyQuery(
    graphql(`
      query GetAllDriverSeasons($driver: String!) @cached {
        drivers(
          where: { abbreviation: { _eq: $driver } }
          order_by: { year: desc }
        ) {
          year
        }
      }
    `),
  );

  const { data, refetch } = useQuery(
    graphql(`
      query GetSeasonDrivers($year: Int = 2025) @cached {
        drivers(
          where: {
            year: { _eq: $year }
            driver_sessions: { session: { name: { _eq: Race } } }
          }
          order_by: { full_name: asc }
        ) {
          full_name
          abbreviation
        }
      }
    `),
    { variables: { year: parseInt(year, 10) } },
  );

  const [season, setSeason] = useState(year);
  const [driver, setDriver] = useState('');

  // Refetch drivers whenever the season changes
  useEffect(() => {
    if (season) {
      refetch({ year: parseInt(season, 10) });
    }
  }, [season, refetch]);

  const addDisabled =
    !driver || !data?.drivers?.some((d) => d.abbreviation === driver);

  const addDriver = () => {
    const params = new URLSearchParams(searchParams);
    const newParam = `${season}${paramSplitChar}${driver}`;
    if (driver && !existingDrivers.includes(newParam)) {
      params.append('driver', newParam);
      router.push(pathname + '?' + params.toString());
    }
  };

  const addDriverAllSeasons = async () => {
    const { data } = await getAllDriverSeasons({ variables: { driver } });

    const params = new URLSearchParams(searchParams);
    data?.drivers.forEach(({ year }) => {
      const newParam = `${year}${paramSplitChar}${driver}`;
      if (driver && !existingDrivers.includes(newParam)) {
        params.append('driver', newParam);
      }
    });
    router.push(pathname + '?' + params.toString());
  };

  const clearDrivers = () => {
    router.replace(pathname + '?');
  };

  return (
    <ButtonGroup className='flex gap-4 py-2'>
      <ButtonGroup>
        <Select
          value={season}
          onValueChange={(val) => {
            setSeason(val);
          }}
        >
          <SelectTrigger className='w-45'>
            <SelectValue placeholder={year} />
          </SelectTrigger>
          <SelectContent>
            {SUPPORTED_SEASONS.map((season) => (
              <SelectItem key={season} value={season.toString()}>
                {season}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </ButtonGroup>
      <ButtonGroup>
        <Select value={driver} onValueChange={(val) => setDriver(val)}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select a driver' />
          </SelectTrigger>
          <SelectContent>
            {data?.drivers.map((driver) => (
              <SelectItem
                key={driver.full_name}
                value={driver.abbreviation ?? ''}
              >
                {driver.full_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </ButtonGroup>
      <ButtonGroup>
        <Button
          size='sm'
          variant='outline'
          disabled={addDisabled}
          onClick={addDriver}
        >
          <PlusCircle /> Add Driver
        </Button>
        <Button
          size='sm'
          variant='outline'
          disabled={!driver}
          onClick={addDriverAllSeasons}
        >
          <PlusCircle /> Add ALL Driver Seasons
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button size='sm' variant='destructive' onClick={clearDrivers}>
          Clear All
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
}
