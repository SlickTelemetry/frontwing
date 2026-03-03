import { Footer } from '@/components/Footer';
import LastEvents from '@/components/last-events';
import NextEvent from '@/components/next-event';

import { LandingNav } from '@/app/_components/nav';

export default function Home() {
  return (
    <>
      <LandingNav />
      <main className='flex-1 px-4 lg:px-6'>
        <div className='grid gap-8 md:grid-cols-2'>
          {/* <div className='rounded border'> */}
          <div className='rounded border p-4'>
            <NextEvent />
          </div>
          <div className=''>
            <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight'>
              Recent Events
            </h2>
            <LastEvents />
          </div>
          {/* </div> */}

          <div className='grid md:col-span-2'>
            <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight'>
              Schedules
            </h2>
            {/* <ScheduleComponent /> */}
          </div>
        </div>
      </main>
      <div className='bg-background sticky bottom-0 w-full'>
        <Footer />
      </div>
    </>
  );
}
