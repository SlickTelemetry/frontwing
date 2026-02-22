import clsx from 'clsx';
import { Earth } from 'lucide-react';

export const MapLoader = ({ loading }: { loading: boolean }) => {
  return (
    <div
      className={clsx(
        'pointer-events-none absolute inset-0 flex items-center justify-center bg-black transition-opacity duration-400',
        loading ? 'opacity-100' : 'opacity-0',
      )}
    >
      <Earth
        size={48}
        className={
          loading ? 'animate-[ping_1.5s_ease-out_infinite]' : 'animate-none'
        }
      />
    </div>
  );
};
