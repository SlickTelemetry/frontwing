'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFoundError({
  title,
  link,
  children,
}: {
  title: string;
  link?: {
    href: string;
    title: string;
  };
  children?: React.ReactNode;
}) {
  return (
    <div className='mx-auto w-fit p-4 lg:p-6'>
      <div className='grid gap-4 rounded border border-dotted p-4 sm:grid-cols-2'>
        <div>
          <h1 className='text-8xl'>404</h1>
          <h2 className='text-2xl'>{title}</h2>
        </div>
        <div className='col-span-full grid gap-2'>
          {link && (
            <Button asChild className='w-full'>
              <Link href={link.href}>{link.title}</Link>
            </Button>
          )}
          {children}
        </div>
        <div
          className='flex h-52 w-full min-w-72 rounded bg-cover bg-center bg-no-repeat sm:col-start-2 sm:row-start-1'
          style={{ backgroundImage: `url(/mclaren-mp4.jpg)` }}
        ></div>
      </div>
    </div>
  );
}
