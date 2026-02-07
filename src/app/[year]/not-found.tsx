'use client';
import Link from 'next/link';

import { SUPPORTED_SEASONS } from '@/lib/constants';

import NotFoundError from '@/components/errors/not-found-error';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <NotFoundError title='No Season Found'>
      <div className='mt-2 border-t pt-2'>
        <p className='text-xl font-bold'>
          We currently only support data from these seasons:
        </p>
        <ul className='flex flex-wrap gap-x-4 gap-y-2 py-2'>
          {SUPPORTED_SEASONS.map((year) => (
            <li key={year}>
              <Button variant='outline' asChild className='min-w-20'>
                <Link href={`/${year}`}>{year}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </NotFoundError>
  );
}
