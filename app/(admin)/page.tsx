// app/(admin)/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Users, FileText, DollarSign, Activity } from 'lucide-react';

export default function AdminDashboard() {
  // Mock data (replace with real API later)
  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, color: 'text-blue-600' },
    { label: 'Revenue', value: '$45,231', icon: DollarSign, color: 'text-green-600' },
    { label: 'Reports', value: '89', icon: FileText, color: 'text-purple-600' },
    { label: 'Active Sessions', value: '456', icon: Activity, color: 'text-orange-600' },
  ];

  const recentUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'User', joined: '2025-04-01' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', joined: '2025-03-15' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User', joined: '2025-04-10' },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-200">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Welcome to the admin control panel. Manage users, view analytics, and monitor system health.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  {stat.label}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
                  {stat.value}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-500">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>New users in the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            user.role === 'Admin'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}
                        >
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell>{user.joined}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common admin tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <DollarSign className="mr-2 h-4 w-4" />
                View Revenue
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Overview</CardTitle>
          <CardDescription>User activity over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <p className="text-zinc-500 dark:text-zinc-400">
              Chart will be implemented here (Recharts / Chart.js)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}