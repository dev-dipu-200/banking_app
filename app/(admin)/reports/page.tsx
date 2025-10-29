// app/(admin)/reports/page.tsx
export default function ReportsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-200 mb-4">
        Reports
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        View analytics, transaction summaries, and performance reports.
      </p>

      {/* Example content */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Monthly Revenue</h3>
          <p className="text-2xl font-bold text-blue-600">$45,231</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Active Users</h3>
          <p className="text-2xl font-bold text-green-600">1,248</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Pending Transactions</h3>
          <p className="text-2xl font-bold text-orange-600">12</p>
        </div>
      </div>
    </div>
  );
}