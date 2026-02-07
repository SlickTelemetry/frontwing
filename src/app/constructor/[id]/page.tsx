'use client';
import { useQuery } from '@apollo/client/react';
import { use, useMemo } from 'react';
import React from 'react';

import { GET_CONSTRUCTOR } from '@/lib/queries';
import { bgGradient } from '@/lib/utils';

import { ServerPageError } from '@/components/errors/ServerError';
import { FullHeightLoader } from '@/components/Loader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { ResultsTable } from './ResultsTable';

import {
  GetConstructorQuery,
  GetConstructorQueryVariables,
} from '@/types/graphql';

const EventPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const { loading, data, error } = useQuery<
    GetConstructorQuery,
    GetConstructorQueryVariables
  >(GET_CONSTRUCTOR, {
    variables: { _id: id },
  });

  const constructor = data?.constructors[0];

  const years = useMemo(() => {
    return Array.from(
      new Set(
        constructor?.driver_sessions.map((ds) => ds.session?.event?.year),
      ),
    );
  }, [constructor]);

  const drivers = useMemo(() => {
    return Array.from(
      new Set(constructor?.driver_sessions.map((ds) => ds.driver?.full_name)),
    );
  }, [constructor]);

  if (error) return <ServerPageError msg={error.message} />;
  if (loading) return <FullHeightLoader>Loading events...</FullHeightLoader>;
  if (!constructor) return <ServerPageError />;

  return (
    <div className='container'>
      {/* Header */}
      <header
        className='mb-4 rounded p-4'
        style={{
          background: constructor.color
            ? bgGradient(constructor.color)
            : 'initial',
        }}
      >
        <h1 className='text-6xl font-semibold'>{constructor.name}</h1>
      </header>

      {/* Results Table */}
      <ResultsTable
        drivers={drivers}
        driverSessions={constructor.driver_sessions}
      >
        <YearSelector years={years} />
      </ResultsTable>
    </div>
  );
};

const YearSelector = ({ years }: { years: (number | null | undefined)[] }) => {
  if (years.length <= 0) return null;

  return (
    <div className='flex items-center justify-center p-4'>
      <Select defaultValue='2024'>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Year' />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year + ''}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EventPage;
