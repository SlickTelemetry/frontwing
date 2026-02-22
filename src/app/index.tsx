import { Image } from '@unpic/react';
import { createFileRoute, Link } from '@tanstack/react-router';

import { Footer } from '@/components/Footer';
import NextEvent from '@/components/next-event';
import { Button } from '@/components/ui/button';

import { LandingNav } from '@/app/-components/nav';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <>
      <main className='flex flex-1'>
        <div className='container flex flex-1 flex-col items-center'>
          <LandingNav />

          <div className='flex flex-1 flex-col items-center justify-center gap-2 text-center'>
            <Image
              src='/slick-telemetry.png'
              width={64}
              height={64}
              alt='Slick Telemetry Logo'
            />
            <h1 className='scroll-m-20 text-center text-8xl font-extrabold tracking-tight text-balance uppercase'>
              Slick Telemetry
            </h1>
            <p className='font-light uppercase sm:text-xl lg:text-3xl'>
              Home of Formula 1 insights
            </p>

            <Button asChild>
              <Link
                to='/$year'
                params={{ year: new Date().getFullYear() }}
                className='w-fit'
              >
                Explore Now
              </Link>
            </Button>
          </div>

          <NextEvent />
          <Footer />
        </div>
      </main>
    </>
  );
}
