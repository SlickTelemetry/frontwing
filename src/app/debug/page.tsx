'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function DebugIndexPage() {
  return (
    <div className='container mx-auto p-8'>
      <h1 className='mb-8 text-4xl font-extrabold'>Internal Tests</h1>

      <div className='flex flex-col gap-4'>
        <Button asChild variant='outline'>
          <Link
            href='/debug/circuit-maps'
            className='inline-block w-full text-center'
          >
            Circuit Maps Test
          </Link>
        </Button>

        <Button asChild variant='outline'>
          <Link
            href='/debug/missing-constructors'
            className='inline-block w-full text-center'
          >
            Missing Constructors Test
          </Link>
        </Button>

        <Button asChild variant='outline'>
          <Link
            href='/debug/telemetry'
            className='inline-block w-full text-center'
          >
            Telemetry Test
          </Link>
        </Button>

        <Button asChild variant='outline'>
          <Link
            href='/debug/events-laps'
            className='inline-block w-full text-center'
          >
            Events &amp; race laps
          </Link>
        </Button>

        <Button asChild variant='outline'>
          <Link
            href='/debug/race-plot'
            className='inline-block w-full text-center'
          >
            Race plot
          </Link>
        </Button>
      </div>
    </div>
  );
}
