// app/(user)/dashboard/page.tsx
'use client';

import ChartWrapper from '@/components/charts/ChartWrapper';
import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import PieChart from '@/components/charts/PieChart';
import DoughnutChart from '@/components/charts/DoughnutChart';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Balance',
      value: '$45,231.89',
      change: '+20.1%',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Income',
      value: '$12,450.00',
      change: '+12.5%',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Expenses',
      value: '$8,234.50',
      change: '-4.3%',
      trend: 'down',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      ),
      color: 'from-red-500 to-red-600',
    },
    {
      title: 'Savings',
      value: '$23,456.78',
      change: '+8.2%',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const recentTransactions = [
    { id: 1, name: 'Netflix Subscription', amount: -15.99, date: '2024-10-30', type: 'expense', category: 'Entertainment' },
    { id: 2, name: 'Salary Deposit', amount: 5000.00, date: '2024-10-28', type: 'income', category: 'Salary' },
    { id: 3, name: 'Grocery Store', amount: -125.50, date: '2024-10-27', type: 'expense', category: 'Food' },
    { id: 4, name: 'Freelance Project', amount: 2500.00, date: '2024-10-25', type: 'income', category: 'Freelance' },
    { id: 5, name: 'Electric Bill', amount: -85.00, date: '2024-10-24', type: 'expense', category: 'Utilities' },
  ];

  const quickActions = [
    { label: 'Send Money', icon: '💸', color: 'bg-blue-500' },
    { label: 'Request Payment', icon: '💰', color: 'bg-green-500' },
    { label: 'Pay Bills', icon: '📄', color: 'bg-purple-500' },
    { label: 'Add Account', icon: '➕', color: 'bg-pink-500' },
  ];

  // Chart Data with Enhanced Styling
  const balanceTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Balance ($)',
        data: [35000, 38000, 40000, 42000, 43500, 45231],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(59, 130, 246)',
        pointRadius: 6,
        pointHoverRadius: 8,
        borderWidth: 3,
      },
    ],
  };

  const monthlySpendingData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Spending ($)',
        data: [1200, 1800, 1500, 2100],
        backgroundColor: [
          'rgba(239, 68, 68, 0.9)',
          'rgba(245, 158, 11, 0.9)',
          'rgba(59, 130, 246, 0.9)',
          'rgba(139, 92, 246, 0.9)',
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(245, 158, 11)',
          'rgb(59, 130, 246)',
          'rgb(139, 92, 246)',
        ],
        borderWidth: 3,
        borderRadius: 12,
        hoverBackgroundColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(139, 92, 246, 1)',
        ],
      },
    ],
  };

  const expenseCategoriesData = {
    labels: ['Food', 'Entertainment', 'Utilities', 'Transport', 'Shopping'],
    datasets: [
      {
        data: [2500, 800, 450, 600, 1200],
        backgroundColor: [
          'rgba(16, 185, 129, 0.9)',
          'rgba(139, 92, 246, 0.9)',
          'rgba(245, 158, 11, 0.9)',
          'rgba(59, 130, 246, 0.9)',
          'rgba(236, 72, 153, 0.9)',
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(139, 92, 246)',
          'rgb(245, 158, 11)',
          'rgb(59, 130, 246)',
          'rgb(236, 72, 153)',
        ],
        borderWidth: 3,
      },
    ],
  };

  const incomeSourcesData = {
    labels: ['Salary', 'Freelance', 'Investments', 'Other'],
    datasets: [
      {
        data: [5000, 2500, 1200, 800],
        backgroundColor: [
          'rgba(59, 130, 246, 0.9)',
          'rgba(16, 185, 129, 0.9)',
          'rgba(245, 158, 11, 0.9)',
          'rgba(107, 114, 128, 0.9)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(107, 114, 128)',
        ],
        borderWidth: 3,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10 p-6">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        {/* Header with Enhanced Gradient */}
        <div className="animate-slide-in">
          <h1 className="text-5xl font-black mb-3">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome Back!
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Here's what's happening with your accounts today.
          </p>
        </div>

        {/* Stats Grid with Enhanced Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                    {stat.icon}
                  </div>
                  <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-600 dark:text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">
                  {stat.title}
                </h3>
                <p className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  {stat.value}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            </div>
          ))}
        </div>

        {/* Charts Grid with Beautiful Design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Balance Trend Line Chart */}
          <ChartWrapper
            title="Balance Trend"
            subtitle="6-month financial growth"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
          >
            <LineChart data={balanceTrendData} />
          </ChartWrapper>

          {/* Monthly Spending Bar Chart */}
          <ChartWrapper
            title="Monthly Spending"
            subtitle="Weekly breakdown analysis"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          >
            <BarChart data={monthlySpendingData} />
          </ChartWrapper>

          {/* Expense Categories Pie Chart */}
          <ChartWrapper
            title="Expense Categories"
            subtitle="Distribution by type"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            }
          >
            <PieChart data={expenseCategoriesData} />
          </ChartWrapper>

          {/* Income Sources Doughnut Chart */}
          <ChartWrapper
            title="Income Sources"
            subtitle="Revenue stream analysis"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          >
            <DoughnutChart data={incomeSourcesData} />
          </ChartWrapper>
        </div>

        {/* Quick Actions with Enhanced Styling */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={`group ${action.color} text-white p-4 rounded-xl hover:opacity-90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-2xl`}
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{action.icon}</div>
                <div className="text-sm font-semibold">{action.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Transactions with Enhanced Design */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Recent Transactions
              </h2>
              <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-semibold transition-colors">
                View All
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        transaction.type === 'income'
                          ? 'bg-green-100 dark:bg-green-900/30'
                          : 'bg-red-100 dark:bg-red-900/30'
                      }`}
                    >
                      {transaction.type === 'income' ? (
                        <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {transaction.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {transaction.category} • {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      transaction.type === 'income'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
