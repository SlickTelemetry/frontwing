'use client';

import { ExpandIcon } from 'lucide-react';

import { HeadToHeadTable } from '@/feature/head-to-head';
import { HeadToHeadDriverSelector } from '@/feature/head-to-head/driver-selector';

export default function HeadToHead() {
  return (
    <div className='h-full flex-1 p-4 lg:px-6'>
      <div className='grid md:col-span-2'>
        <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight'>
          Seasonal Head to Head
        </h2>
        <p>Compare drivers across seasons</p>

        <div className='flex gap-4 py-2'>
          <HeadToHeadDriverSelector />
        </div>

        <HeadToHeadTable />

        {/* TODO: Does this even make sense */}
        <div className='grid grid-cols-4 gap-6 py-8'>
          {[
            { title: 'Points/Season' },
            { title: 'Sessions/Season' },
            { title: 'Finishing Positions' },
            { title: 'Career Points' },
          ].map(({ title }, idx) => (
            <div key={idx}>
              <h4 className='pb-2 text-xl font-semibold'>{title}</h4>
              <div className='group bg-secondary border-muted relative flex aspect-square items-center justify-center overflow-hidden rounded border-8'>
                {/* Small Chart */}

                {/* Overlay */}
                <div className='bg-muted border-muted absolute hidden aspect-square w-full items-center justify-center opacity-25 group-hover:flex'>
                  <ExpandIcon className='size-24' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
