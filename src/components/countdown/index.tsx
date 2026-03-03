import useCountdown from '@/components/countdown/useCountdown';

export const Countdown = ({
  targetDate,
  'data-cy': dataCy,
}: {
  targetDate: string | Date;
  'data-cy'?: string;
}) => {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  return (
    <div className='grid w-full grid-cols-4 gap-2' data-cy={dataCy}>
      <Digit time={days} name='day' data-cy='countdown-digit-day' />
      <Digit time={hours} name='hour' data-cy='countdown-digit-hour' />
      <Digit time={minutes} name='minute' data-cy='countdown-digit-minute' />
      <Digit time={seconds} name='second' data-cy='countdown-digit-second' />
    </div>
  );
};

const Digit = ({
  time,
  name,
  'data-cy': dataCy,
}: {
  time: number;
  name: string;
  'data-cy'?: string;
}) => (
  <div className='flex w-full flex-col text-center' data-cy={dataCy}>
    <p className='text-2xl leading-5' data-cy='countdown-value'>
      {time}
    </p>
    <p className='font-space-grotesk text-xs leading-6 uppercase'>
      {name}
      {time !== 1 && 's'}
    </p>
  </div>
);
