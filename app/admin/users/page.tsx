'use client';

import { useState } from 'react';
import Table, { Column } from '@/components/Table';
import Modal from '@/components/Modal';
import { useToast } from '@/components/ToastProvider';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  phone?: string;
  joinedDate?: string;
}

export default function UsersPage() {
  const toast = useToast();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Generate more mock users for pagination demo
  const mockUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'User',
      phone: '+1 234-567-8901',
      joinedDate: '2024-01-15',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Admin',
      phone: '+1 234-567-8902',
      joinedDate: '2024-02-20',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'User',
      phone: '+1 234-567-8903',
      joinedDate: '2024-03-10',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    },
    {
      id: 4,
      name: 'Alice Williams',
      email: 'alice@example.com',
      role: 'User',
      phone: '+1 234-567-8904',
      joinedDate: '2024-03-25',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    },
    {
      id: 5,
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      role: 'Moderator',
      phone: '+1 234-567-8905',
      joinedDate: '2024-04-05',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
    },
    {
      id: 6,
      name: 'Diana Prince',
      email: 'diana@example.com',
      role: 'Admin',
      phone: '+1 234-567-8906',
      joinedDate: '2024-04-15',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
    },
    {
      id: 7,
      name: 'Ethan Hunt',
      email: 'ethan@example.com',
      role: 'User',
      phone: '+1 234-567-8907',
      joinedDate: '2024-05-01',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan',
    },
    {
      id: 8,
      name: 'Fiona Gallagher',
      email: 'fiona@example.com',
      role: 'User',
      phone: '+1 234-567-8908',
      joinedDate: '2024-05-12',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fiona',
    },
    {
      id: 9,
      name: 'George Miller',
      email: 'george@example.com',
      role: 'Moderator',
      phone: '+1 234-567-8909',
      joinedDate: '2024-06-03',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=George',
    },
    {
      id: 10,
      name: 'Hannah Montana',
      email: 'hannah@example.com',
      role: 'User',
      phone: '+1 234-567-8910',
      joinedDate: '2024-06-18',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hannah',
    },
    {
      id: 11,
      name: 'Isaac Newton',
      email: 'isaac@example.com',
      role: 'Admin',
      phone: '+1 234-567-8911',
      joinedDate: '2024-07-05',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isaac',
    },
    {
      id: 12,
      name: 'Julia Roberts',
      email: 'julia@example.com',
      role: 'User',
      phone: '+1 234-567-8912',
      joinedDate: '2024-07-22',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julia',
    },
    {
      id: 13,
      name: 'Kevin Hart',
      email: 'kevin@example.com',
      role: 'User',
      phone: '+1 234-567-8913',
      joinedDate: '2024-08-10',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin',
    },
    {
      id: 14,
      name: 'Laura Croft',
      email: 'laura@example.com',
      role: 'Moderator',
      phone: '+1 234-567-8914',
      joinedDate: '2024-08-25',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura',
    },
    {
      id: 15,
      name: 'Michael Scott',
      email: 'michael@example.com',
      role: 'User',
      phone: '+1 234-567-8915',
      joinedDate: '2024-09-08',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    },
    {
      id: 16,
      name: 'Nancy Drew',
      email: 'nancy@example.com',
      role: 'Admin',
      phone: '+1 234-567-8916',
      joinedDate: '2024-09-20',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nancy',
    },
    {
      id: 17,
      name: 'Oliver Twist',
      email: 'oliver@example.com',
      role: 'User',
      phone: '+1 234-567-8917',
      joinedDate: '2024-10-05',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver',
    },
    {
      id: 18,
      name: 'Pam Beesly',
      email: 'pam@example.com',
      role: 'User',
      phone: '+1 234-567-8918',
      joinedDate: '2024-10-18',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pam',
    },
    {
      id: 19,
      name: 'Quinn Fabray',
      email: 'quinn@example.com',
      role: 'Moderator',
      phone: '+1 234-567-8919',
      joinedDate: '2024-10-28',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Quinn',
    },
    {
      id: 20,
      name: 'Rachel Green',
      email: 'rachel@example.com',
      role: 'User',
      phone: '+1 234-567-8920',
      joinedDate: '2024-11-02',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel',
    },
    {
      id: 21,
      name: 'Sam Winchester',
      email: 'sam@example.com',
      role: 'Admin',
      phone: '+1 234-567-8921',
      joinedDate: '2024-11-10',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
    },
    {
      id: 22,
      name: 'Tina Fey',
      email: 'tina@example.com',
      role: 'User',
      phone: '+1 234-567-8922',
      joinedDate: '2024-11-15',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tina',
    },
    {
      id: 23,
      name: 'Uma Thurman',
      email: 'uma@example.com',
      role: 'User',
      phone: '+1 234-567-8923',
      joinedDate: '2024-11-20',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Uma',
    },
    {
      id: 24,
      name: 'Victor Hugo',
      email: 'victor@example.com',
      role: 'Moderator',
      phone: '+1 234-567-8924',
      joinedDate: '2024-11-25',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Victor',
    },
    {
      id: 25,
      name: 'Wendy Williams',
      email: 'wendy@example.com',
      role: 'User',
      phone: '+1 234-567-8925',
      joinedDate: '2024-11-28',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wendy',
    },
  ];

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
    toast.info(`Viewing details for ${user.name}`);
  };

  const handleEditUser = (user: User) => {
    setEditingUser({ ...user });
    setIsEditModalOpen(true);
    toast.info(`Editing ${user.name}`, 'Edit Mode');
  };

  const handleDeleteUser = (user: User) => {
    const confirmed = confirm(`Are you sure you want to delete ${user.name}?`);
    if (confirmed) {
      toast.success(`${user.name} deleted successfully`, 'Deleted');
    }
  };

  const handleSaveEdit = () => {
    if (!editingUser) return;
    toast.success('User updated successfully!', 'Success');
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  const handleEditChange = (field: keyof User, value: string) => {
    if (!editingUser) return;
    setEditingUser({ ...editingUser, [field]: value });
  };

  const columns: Column<User>[] = [
    {
      key: 'id',
      label: 'ID',
      sortable: true,
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      render: (value) => (
        <span className="text-zinc-500 dark:text-zinc-400">{value}</span>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (value) => {
        const colors: Record<string, string> = {
          Admin:
            'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
          Moderator:
            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
          User: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
        };
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              colors[value] || colors.User
            }`}
          >
            {value}
          </span>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-200 mb-2">
            User Management
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Manage user accounts, roles, and permissions.
          </p>
        </div>
        <button
          onClick={() => toast.success('Add user feature coming soon!', 'Info')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Add User
        </button>
      </div>

      <Table
        data={mockUsers}
        columns={columns}
        is_csr={true}
        itemsPerPage={10}
        showPagination={true}
        showActions={true}
        showView={true}
        showEdit={true}
        showDelete={true}
        onView={(row) => handleViewUser(row)}
        onEdit={(row) => handleEditUser(row)}
        onDelete={(row) => handleDeleteUser(row)}
        emptyMessage="No users found"
      />

      {/* View User Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="User Details"
        size="lg"
        footer={
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              style={{ background: 'var(--card-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              Close
            </button>
          </div>
        }
      >
        {selectedUser && (
          <div className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
              <img
                src={selectedUser.avatar}
                alt={selectedUser.name}
                className="w-20 h-20 rounded-full border-4 border-blue-100 dark:border-blue-900"
              />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {selectedUser.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedUser.email}
                </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  User ID
                </label>
                <p className="text-gray-900 dark:text-gray-100 font-semibold">
                  #{selectedUser.id}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Role
                </label>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedUser.role === 'Admin'
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      : selectedUser.role === 'Moderator'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}
                >
                  {selectedUser.role}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Phone
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {selectedUser.phone}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Joined Date
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {selectedUser.joinedDate}
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Account Status
              </h4>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  Active
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit User"
        size="lg"
        footer={
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              style={{ background: 'var(--card-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        }
      >
        {editingUser && (
          <div className="space-y-4">
            {/* Avatar Section */}
            <div className="flex items-center gap-4 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <img
                src={editingUser.avatar}
                alt={editingUser.name}
                className="w-16 h-16 rounded-full border-4 border-blue-100 dark:border-blue-900"
              />
              <div>
                <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {editingUser.name}
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>ID: #{editingUser.id}</p>
              </div>
            </div>

            {/* Edit Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Name
                </label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => handleEditChange('name', e.target.value)}
                  className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  style={{ background: 'var(--background)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => handleEditChange('email', e.target.value)}
                  className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  style={{ background: 'var(--background)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Phone
                </label>
                <input
                  type="tel"
                  value={editingUser.phone}
                  onChange={(e) => handleEditChange('phone', e.target.value)}
                  className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  style={{ background: 'var(--background)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Role
                </label>
                <select
                  value={editingUser.role}
                  onChange={(e) => handleEditChange('role', e.target.value)}
                  className="w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  style={{ background: 'var(--background)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                >
                  <option value="User">User</option>
                  <option value="Moderator">Moderator</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
