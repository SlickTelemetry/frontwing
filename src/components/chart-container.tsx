import { cn } from '@/lib/utils';

import { Loader } from '@/components/Loader';

export const ChartContainer = ({
  title,
  subtitle,
  className,
  children,
  loading,
}: {
  title: string;
  subtitle?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  loading: boolean;
}) => {
  return (
    <div
      className={cn(
        'border-foreground flex h-125 flex-col rounded border p-4 lg:h-[80dvh]',
        className,
      )}
    >
      <div className='pb-4'>
        <h2 className='mr-auto flex-1 scroll-m-20 text-2xl font-semibold tracking-tight'>
          {title}
        </h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {loading && <Loader />}
      {!loading && children}
    </div>
  );
};
