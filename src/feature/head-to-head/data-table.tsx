'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sortable?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  sortable = false,
}: DataTableProps<TData, TValue>) {
  // Sorting state
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSorting: sortable,
    enableMultiSort: true,
    state: { sorting },
    onSortingChange: setSorting,
  });

  return (
    <div className='overflow-hidden rounded-md border'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const sortState = header.column.getIsSorted();
                return (
                  <TableHead
                    key={header.id}
                    className={`cursor-pointer select-none ${
                      canSort ? 'hover:underline' : ''
                    }`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className='flex items-center gap-1'>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {/* Placeholder to keep spacing */}
                      {!['asc', 'desc'].includes(sortState as string) && (
                        <ChevronUpIcon className='size-4 opacity-0' />
                      )}
                      {sortState === 'asc' && (
                        <ChevronUpIcon className='size-4' />
                      )}
                      {sortState === 'desc' && (
                        <ChevronDownIcon className='size-4' />
                      )}
                      {header.column.getIsSorted() &&
                        header.column.getSortIndex() !== undefined && (
                          <span className='text-muted-foreground text-xs'>
                            {header.column.getSortIndex() + 1}
                          </span>
                        )}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
