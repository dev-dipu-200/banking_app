'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export interface Column<T = any> {
  key: string;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
}

export interface TableProps<T = any> {
  data: T[];
  columns: Column<T>[];
  is_csr?: boolean;
  itemsPerPage?: number;
  showPagination?: boolean;
  className?: string;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  totalPages?: number;
  totalItems?: number;
}

export default function Table<T extends Record<string, any>>({
  data,
  columns,
  is_csr = true,
  itemsPerPage = 10,
  showPagination = true,
  className = '',
  onRowClick,
  emptyMessage = 'No data available',
  currentPage: externalCurrentPage,
  onPageChange: externalOnPageChange,
  totalPages: externalTotalPages,
  totalItems: externalTotalItems,
}: TableProps<T>) {
  // Internal state for CSR mode
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Use external or internal pagination state based on mode
  const currentPage = is_csr ? internalCurrentPage : (externalCurrentPage || 1);
  const setCurrentPage = is_csr ? setInternalCurrentPage : (externalOnPageChange || (() => {}));

  // Sort and paginate data for CSR mode
  const processedData = useMemo(() => {
    if (!is_csr) {
      // SSR mode: use data as-is (already sorted/paginated on server)
      return data;
    }

    // CSR mode: handle sorting and pagination client-side
    let sortedData = [...data];

    // Apply sorting
    if (sortConfig) {
      sortedData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    // Apply pagination
    if (showPagination) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return sortedData.slice(startIndex, endIndex);
    }

    return sortedData;
  }, [data, sortConfig, currentPage, itemsPerPage, showPagination, is_csr]);

  // Calculate total pages
  const totalPages = is_csr
    ? Math.ceil(data.length / itemsPerPage)
    : (externalTotalPages || 1);

  const totalItems = is_csr ? data.length : (externalTotalItems || data.length);

  const handleSort = (key: string) => {
    if (!is_csr) return; // Sorting only works in CSR mode

    const column = columns.find((col) => col.key === key);
    if (!column?.sortable) return;

    setSortConfig((current) => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
  };

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const renderPagination = () => {
    if (!showPagination || totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to{' '}
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
        </div>

        <div className="flex items-center space-x-2">
          {is_csr ? (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
          ) : (
            <Link
              href={createPageUrl(currentPage - 1)}
              className={`px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                currentPage === 1 ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              Previous
            </Link>
          )}

          {startPage > 1 && (
            <>
              {is_csr ? (
                <button
                  onClick={() => handlePageChange(1)}
                  className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  1
                </button>
              ) : (
                <Link
                  href={createPageUrl(1)}
                  className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  1
                </Link>
              )}
              {startPage > 2 && (
                <span className="px-2 text-gray-500 dark:text-gray-400">...</span>
              )}
            </>
          )}

          {pages.map((page) =>
            is_csr ? (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  page === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ) : (
              <Link
                key={page}
                href={createPageUrl(page)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  page === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {page}
              </Link>
            )
          )}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="px-2 text-gray-500 dark:text-gray-400">...</span>
              )}
              {is_csr ? (
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {totalPages}
                </button>
              ) : (
                <Link
                  href={createPageUrl(totalPages)}
                  className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {totalPages}
                </Link>
              )}
            </>
          )}

          {is_csr ? (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          ) : (
            <Link
              href={createPageUrl(currentPage + 1)}
              className={`px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              Next
            </Link>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${
                    column.sortable && is_csr ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 select-none' : ''
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && is_csr && (
                      <span className="text-gray-400">
                        {sortConfig?.key === column.key ? (
                          sortConfig.direction === 'asc' ? (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M5 10l5-5 5 5H5z" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M15 10l-5 5-5-5h10z" />
                            </svg>
                          )
                        ) : (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 8l5-5 5 5H5zm0 4l5 5 5-5H5z" opacity="0.3" />
                          </svg>
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {processedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              processedData.map((row, index) => (
                <tr
                  key={index}
                  onClick={() => onRowClick?.(row)}
                  className={`${
                    onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700' : ''
                  } transition-colors`}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {renderPagination()}
    </div>
  );
}
