import ReportsTable from '@/components/ReportsTable';

interface Report {
  id: number;
  title: string;
  date: string;
  status: string;
  revenue: string;
}

// Server Component - SSR mode example
export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // Await searchParams to get the current page
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const itemsPerPage = 10;

  // Simulate server-side data fetching
  // In a real app, this would be a database query with LIMIT and OFFSET
  const allReports: Report[] = [
    { id: 1, title: 'Monthly Revenue Report', date: '2025-11-01', status: 'Completed', revenue: '$45,231' },
    { id: 2, title: 'User Analytics Summary', date: '2025-11-02', status: 'Completed', revenue: '$12,450' },
    { id: 3, title: 'Transaction Overview', date: '2025-11-03', status: 'Pending', revenue: '$8,920' },
    { id: 4, title: 'Performance Metrics', date: '2025-11-04', status: 'Completed', revenue: '$34,100' },
    { id: 5, title: 'Q4 Financial Report', date: '2025-11-05', status: 'In Progress', revenue: '$67,890' },
    { id: 6, title: 'Customer Retention Analysis', date: '2025-11-06', status: 'Completed', revenue: '$23,450' },
    { id: 7, title: 'Marketing ROI Report', date: '2025-11-07', status: 'Completed', revenue: '$15,600' },
    { id: 8, title: 'Sales Performance Q4', date: '2025-11-08', status: 'Pending', revenue: '$89,200' },
    { id: 9, title: 'Annual Growth Summary', date: '2025-11-09', status: 'Completed', revenue: '$156,400' },
    { id: 10, title: 'Product Analytics', date: '2025-11-10', status: 'In Progress', revenue: '$45,800' },
    { id: 11, title: 'Operational Efficiency', date: '2025-10-15', status: 'Completed', revenue: '$32,100' },
    { id: 12, title: 'Risk Assessment Report', date: '2025-10-20', status: 'Completed', revenue: '$0' },
    { id: 13, title: 'Compliance Audit', date: '2025-10-25', status: 'Completed', revenue: '$0' },
    { id: 14, title: 'Budget Analysis', date: '2025-10-28', status: 'Pending', revenue: '$78,900' },
    { id: 15, title: 'Market Research Summary', date: '2025-10-30', status: 'In Progress', revenue: '$12,300' },
    { id: 16, title: 'Customer Feedback Analysis', date: '2025-09-15', status: 'Completed', revenue: '$9,500' },
    { id: 17, title: 'Inventory Report', date: '2025-09-20', status: 'Completed', revenue: '$45,600' },
    { id: 18, title: 'Supply Chain Analysis', date: '2025-09-25', status: 'Pending', revenue: '$67,200' },
    { id: 19, title: 'Employee Performance', date: '2025-09-28', status: 'In Progress', revenue: '$0' },
    { id: 20, title: 'Technology Infrastructure', date: '2025-09-30', status: 'Completed', revenue: '$23,100' },
    { id: 21, title: 'Security Audit Report', date: '2025-08-15', status: 'Completed', revenue: '$0' },
    { id: 22, title: 'Customer Acquisition Cost', date: '2025-08-20', status: 'Completed', revenue: '$34,500' },
    { id: 23, title: 'Churn Rate Analysis', date: '2025-08-25', status: 'Pending', revenue: '$8,900' },
    { id: 24, title: 'Revenue Forecasting', date: '2025-08-28', status: 'In Progress', revenue: '$120,000' },
    { id: 25, title: 'Competitive Analysis', date: '2025-08-30', status: 'Completed', revenue: '$15,200' },
  ];

  // Server-side pagination
  const totalItems = allReports.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReports = allReports.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-200 mb-4">
        Reports
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">
        View analytics, transaction summaries, and performance reports.
      </p>

      <ReportsTable
        reports={paginatedReports}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">Monthly Revenue</h3>
          <p className="text-2xl font-bold text-blue-600">$45,231</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">Active Users</h3>
          <p className="text-2xl font-bold text-green-600">1,248</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">Pending Transactions</h3>
          <p className="text-2xl font-bold text-orange-600">12</p>
        </div>
      </div>
    </div>
  );
}
