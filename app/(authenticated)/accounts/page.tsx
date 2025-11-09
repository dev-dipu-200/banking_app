// app/(user)/accounts/page.tsx
'use client';

export default function Accounts() {
  const accounts = [
    {
      id: 1,
      name: 'Premium Checking',
      type: 'Checking',
      accountNumber: '****4589',
      balance: 15234.89,
      currency: 'USD',
      color: 'from-blue-500 to-blue-700',
      icon: '💳',
    },
    {
      id: 2,
      name: 'High-Yield Savings',
      type: 'Savings',
      accountNumber: '****7823',
      balance: 23456.78,
      currency: 'USD',
      color: 'from-green-500 to-green-700',
      icon: '💰',
    },
    {
      id: 3,
      name: 'Investment Account',
      type: 'Investment',
      accountNumber: '****9102',
      balance: 45678.90,
      currency: 'USD',
      color: 'from-purple-500 to-purple-700',
      icon: '📈',
    },
    {
      id: 4,
      name: 'Business Account',
      type: 'Business',
      accountNumber: '****3456',
      balance: 8942.15,
      currency: 'USD',
      color: 'from-orange-500 to-orange-700',
      icon: '🏢',
    },
  ];

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="animate-slide-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            My Accounts
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and monitor all your bank accounts in one place
          </p>
        </div>

        {/* Total Balance Card */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 text-white animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Total Balance</p>
              <h2 className="text-5xl font-bold">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
            </div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <span className="text-blue-100">{accounts.length} Active Accounts</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
              <span className="text-blue-100">All accounts verified</span>
            </div>
          </div>
        </div>

        {/* Add New Account Button */}
        <div className="flex justify-end">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg transform hover:scale-105 flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add New Account</span>
          </button>
        </div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {accounts.map((account, index) => (
            <div
              key={account.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Header with Gradient */}
              <div className={`bg-gradient-to-br ${account.color} p-6 text-white`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm opacity-90 mb-1">{account.type}</p>
                    <h3 className="text-2xl font-bold">{account.name}</h3>
                  </div>
                  <div className="text-4xl">{account.icon}</div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm opacity-90">Account Number</p>
                  <p className="text-xl font-mono tracking-wider">{account.accountNumber}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Available Balance</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{account.currency}</p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Transfer</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-xs font-semibold text-green-600 dark:text-green-400">Details</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">Settings</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}