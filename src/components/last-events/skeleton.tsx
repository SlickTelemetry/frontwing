export function NextEventSkeleton() {
  return (
    <div className='mx-auto flex w-[300px] animate-pulse flex-col justify-center gap-2 py-4'>
      <p className='text-sm font-light uppercase'>Next Race</p>

      <div className='bg-muted size-6 w-full rounded' />
      <div className='bg-muted size-6 w-full rounded' />
      <div className='border-foreground flex w-full justify-evenly border-t py-4'>
        {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
          <div key={unit} className='flex flex-col items-center justify-center'>
            <div className='bg-muted size-8 animate-pulse rounded' />
            <p className='font-space-grotesk text-xs leading-6 font-bold uppercase'>
              {unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
