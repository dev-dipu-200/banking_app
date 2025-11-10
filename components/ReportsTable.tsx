'use client';

import Table, { Column } from '@/components/Table';

interface Report {
  id: number;
  title: string;
  date: string;
  status: string;
  revenue: string;
}

interface ReportsTableProps {
  reports: Report[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export default function ReportsTable({
  reports,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
}: ReportsTableProps) {
  const columns: Column<Report>[] = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'title',
      label: 'Report Title',
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      key: 'date',
      label: 'Date',
      render: (value) => (
        <span className="text-zinc-500 dark:text-zinc-400">{value}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const colors: Record<string, string> = {
          Completed:
            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
          'In Progress':
            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
          Pending:
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        };
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              colors[value] || 'bg-gray-100 text-gray-800'
            }`}
          >
            {value}
          </span>
        );
      },
    },
    {
      key: 'revenue',
      label: 'Revenue',
      render: (value) => (
        <span className="font-semibold text-green-600 dark:text-green-400">
          {value}
        </span>
      ),
    },
  ];

  return (
    <Table
      data={reports}
      columns={columns}
      is_csr={false}
      itemsPerPage={itemsPerPage}
      showPagination={true}
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={totalItems}
      emptyMessage="No reports found"
    />
  );
}
