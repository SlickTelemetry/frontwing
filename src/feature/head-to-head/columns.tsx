import { ColumnDef } from '@tanstack/react-table';
import { CircleXIcon } from 'lucide-react';

export interface DriverRow {
  id: string;
  abbreviation: string;
  season: number;
  driver: string;
  position?: number | null;
  points?: number | null;
  wins?: number | null;
  sessions: number;
  laps: number;
}

const renderPlaceholder =
  (placeholder = '—') =>
  ({ getValue }: { getValue: () => unknown }) =>
    getValue() ?? placeholder;

export const columns = (
  removeDriver: (driver: string) => void,
): ColumnDef<DriverRow>[] => [
  { accessorKey: 'season', header: 'Season', enableSorting: true },
  { accessorKey: 'driver', header: 'Driver', enableSorting: true },
  {
    accessorKey: 'position',
    header: 'Position',
    enableSorting: true,
    sortUndefined: 'last',
    cell: renderPlaceholder(),
  },
  {
    accessorKey: 'points',
    header: 'Points',
    enableSorting: true,
    sortUndefined: 'last',
    cell: renderPlaceholder(),
  },
  {
    accessorKey: 'wins',
    header: 'Wins',
    enableSorting: true,
    sortUndefined: 'last',
    cell: renderPlaceholder(),
  },
  { accessorKey: 'sessions', header: 'Sessions', enableSorting: true },
  { accessorKey: 'laps', header: 'Laps', enableSorting: true },
  {
    id: 'actions',
    header: '',
    enableSorting: false,
    cell: ({ row }) => {
      const driver = row.original;
      return (
        <CircleXIcon
          className='cursor-pointer'
          onClick={() =>
            removeDriver(`${driver.season}.${driver.abbreviation}`)
          }
        />
      );
    },
  },
];
