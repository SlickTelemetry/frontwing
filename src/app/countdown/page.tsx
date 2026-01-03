'use client';

import { useEffect, useState } from 'react';

import { LandingNav } from '@/app/_components/nav';

const date = '2026-03-06T12:00:00';
const gapToDate = (targetDate: Date) => {
  const now = new Date();
  const timeDiff = targetDate.getTime() - now.getTime();
  if (timeDiff <= 0) {
    return {
      months: 0,
      days: 0,
      minutes: 0,
      seconds: 0,
    };
  }
  const totalMonths =
    targetDate.getMonth() -
    now.getMonth() +
    12 * (targetDate.getFullYear() - now.getFullYear()); // Get overlap into next year

  return {
    months: totalMonths,
    days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)) % 7,
    minutes: Math.floor(timeDiff / (1000 * 60)) % 60,
    seconds: Math.floor(timeDiff / 1000) % 60,
  };
};
export default function CountdownPage() {
  return (
    <main className='h-screen bg-[url(https://upload.wikimedia.org/wikipedia/commons/8/8e/Melbourne_Grand_Prix_Circuit%2C_March_22%2C_2018_SkySat_%28cropped%29.jpg)] bg-cover bg-center text-center'>
      <div className='bg-background/60 h-screen flex-1'>
        <div className='flex h-full flex-col items-center'>
          <LandingNav />
          <div className='flex w-full flex-1 flex-col items-center justify-center gap-8'>
            <h1 className='text-4xl font-bold md:text-6xl xl:text-8xl'>
              Countdown to 2026
            </h1>
            <div>
              <p className='text-2xl md:text-4xl'>
                Practice 1 of the Australian Grand Prix
              </p>
              <p>
                {new Date(date).toLocaleString(undefined, {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
            <Countdown />
          </div>
        </div>
      </div>
    </main>
  );
}

function Countdown() {
  const [duration, setDuration] = useState(gapToDate(new Date(date)));

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = gapToDate(new Date(date));
      setDuration(diff);
    }, 10);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className='grid grid-cols-4 gap-2'>
      <Digit time={duration.months} name='month' />
      <Digit time={duration.days} name='day' />
      <Digit time={duration.minutes} name='minute' />
      <Digit time={duration.seconds} name='second' />
    </div>
  );
}

const Digit = ({ time, name }: { time: number; name: string }) => {
  return (
    <div className='bg-background/75 grid w-32 rounded-xl py-2 text-center'>
      <p className='text-2xl md:text-6xl'>{time}</p>
      <p className='lg:text-2xl'>
        {name}
        {time !== 1 && 's'}
      </p>
    </div>
  );
};
