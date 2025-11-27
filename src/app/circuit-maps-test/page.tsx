'use client';

import { useQuery } from '@apollo/client/react';
import { useState } from 'react';

import {
  type ArrowPlacementAlgorithm,
  CircuitMap,
} from '@/components/circuit-map';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { graphql } from '@/types';
import type { GetAllCircuitsQuery } from '@/types/graphql';

const GET_ALL_CIRCUITS = graphql(`
  query GetAllCircuits {
    circuits(order_by: { year: desc, location: asc }) {
      year
      location
      country
      ...CircuitDetails
    }
  }
`);

export default function CircuitMapsTestPage() {
  // Group circuits by year
  type CircuitType = NonNullable<GetAllCircuitsQuery['circuits']>[number];

  const [selectedCircuit, setSelectedCircuit] = useState<CircuitType | null>(
    null,
  );
  const [arrowAlgorithm, setArrowAlgorithm] =
    useState<ArrowPlacementAlgorithm>('shoelace');

  const { data, loading, error } =
    useQuery<GetAllCircuitsQuery>(GET_ALL_CIRCUITS);

  if (loading) {
    return (
      <div className='container mx-auto p-8'>
        <h1 className='mb-8 text-4xl font-extrabold'>
          Loading all circuit maps...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto p-8'>
        <h1 className='mb-8 text-4xl font-extrabold'>
          Error loading circuit maps
        </h1>
        <p className='text-red-500'>{error.message}</p>
      </div>
    );
  }

  const circuitsByYear = new Map<number, CircuitType[]>();

  data?.circuits?.forEach((circuit) => {
    const year = circuit.year;
    if (year) {
      if (!circuitsByYear.has(year)) {
        circuitsByYear.set(year, []);
      }
      circuitsByYear.get(year)?.push(circuit);
    }
  });

  // Sort years in descending order
  const sortedYears = Array.from(circuitsByYear.keys()).sort((a, b) => b - a);

  return (
    <>
      <div className='bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 border-b backdrop-blur'>
        <div className='container mx-auto flex items-center justify-between px-8 py-4'>
          <h1 className='text-4xl font-extrabold'>All Circuit Maps Test</h1>
          <div className='flex gap-2'>
            <Button
              title='Uses polygon winding (shoelace) to pick left/right without extra checks'
              variant={arrowAlgorithm === 'shoelace' ? 'default' : 'outline'}
              onClick={() => setArrowAlgorithm('shoelace')}
            >
              Shoelace (winding)
            </Button>
            <Button
              title='Tests both perpendicular directions with point-in-polygon checks; falls back to shoelace if both fail'
              variant={
                arrowAlgorithm === 'point-in-polygon' ? 'default' : 'outline'
              }
              onClick={() => setArrowAlgorithm('point-in-polygon')}
            >
              Point-in-polygon (tests both)
            </Button>
          </div>
        </div>
      </div>
      <div className='container mx-auto p-8'>
        {sortedYears.map((year) => {
          const circuits = circuitsByYear.get(year);
          if (!circuits || circuits.length === 0) return null;

          return (
            <div key={year} className='mb-12'>
              <h2 className='bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-20 z-40 mb-6 border-b pt-2 pb-2 text-3xl font-bold backdrop-blur'>
                {year} Season ({circuits.length} circuits)
              </h2>
              <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
                {circuits.map((circuit, idx) => (
                  <CircuitMapItem
                    key={`${year}-${circuit.location}-${idx}`}
                    circuit={circuit}
                    arrowAlgorithm={arrowAlgorithm}
                    onClick={() => setSelectedCircuit(circuit)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Dialog
        open={selectedCircuit !== null}
        onOpenChange={(open) => !open && setSelectedCircuit(null)}
      >
        <DialogContent className='max-w-4xl'>
          {selectedCircuit && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selectedCircuit.location || 'Unknown Circuit'}
                  {selectedCircuit.country && (
                    <span className='text-muted-foreground font-normal'>
                      {' '}
                      • {selectedCircuit.country}
                    </span>
                  )}
                </DialogTitle>
                <DialogDescription>
                  {selectedCircuit.year && (
                    <span>{selectedCircuit.year} Season</span>
                  )}
                </DialogDescription>
              </DialogHeader>
              <div className='flex w-full justify-center py-4'>
                <CircuitMap
                  circuitData={selectedCircuit}
                  className='max-h-[600px] w-full'
                  arrowAlgorithm={arrowAlgorithm}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function CircuitMapItem({
  circuit,
  arrowAlgorithm,
  onClick,
}: {
  circuit: NonNullable<GetAllCircuitsQuery['circuits']>[number];
  arrowAlgorithm: ArrowPlacementAlgorithm;
  onClick: () => void;
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='bg-card hover:bg-accent/10 flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 text-left transition-colors'
    >
      <div className='text-center'>
        <p className='text-sm font-semibold'>{circuit.location || 'Unknown'}</p>
        {circuit.country && (
          <p className='text-muted-foreground text-xs'>{circuit.country}</p>
        )}
      </div>
      <div className='flex w-full justify-center'>
        <CircuitMap
          circuitData={circuit}
          small
          className='max-h-[150px]'
          arrowAlgorithm={arrowAlgorithm}
        />
      </div>
    </button>
  );
}
