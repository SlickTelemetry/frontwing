'use client';
import Link from 'next/link';

import { SUPPORTED_SEASONS } from '@/lib/constants';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className='mx-auto flex w-full max-w-[500px] flex-col gap-2 p-4 lg:px-6'>
      <div className='rounded border border-dotted p-4'>
        <h1 className='pointer-cursor line-clamp-1 scroll-m-20 text-4xl font-semibold tracking-tight text-balance'>
          No standings found
        </h1>
        <p>We currently only support data from these seasons:</p>
        <ul className='flex flex-wrap gap-x-4 gap-y-2 py-2'>
          {SUPPORTED_SEASONS.map((year) => (
            <li key={year}>
              <Button variant='link' asChild>
                <Link href={`/${year}/standings`}>{year}</Link>
              </Button>
            </li>
          ))}
        </ul>
        <hr className='mt-1 mb-2' />
        <div
          className='flex h-52 flex-1 rounded bg-cover bg-center bg-no-repeat'
          style={{ backgroundImage: `url(/mclaren-mp4.jpg)` }}
        ></div>
      </div>
    </div>
  );
}
