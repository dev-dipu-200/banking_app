# Table Actions - Dynamic Configuration Examples

The Table component now supports dynamic action buttons (View, Edit, Delete) that can be enabled or disabled individually.

## Props

### Action-Related Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showActions` | `boolean` | `false` | Enable/disable the Actions column |
| `showView` | `boolean` | `true` | Show View button (requires `onView`) |
| `showEdit` | `boolean` | `true` | Show Edit button (requires `onEdit`) |
| `showDelete` | `boolean` | `true` | Show Delete button (requires `onDelete`) |
| `onView` | `(row: T) => void` | `undefined` | Callback when View is clicked |
| `onEdit` | `(row: T) => void` | `undefined` | Callback when Edit is clicked |
| `onDelete` | `(row: T) => void` | `undefined` | Callback when Delete is clicked |

## Examples

### Example 1: All Actions Enabled (Default)

Show View, Edit, and Delete buttons.

```tsx
<Table
  data={users}
  columns={columns}
  showActions={true}
  showView={true}      // Can be omitted (default: true)
  showEdit={true}      // Can be omitted (default: true)
  showDelete={true}    // Can be omitted (default: true)
  onView={(row) => handleView(row)}
  onEdit={(row) => handleEdit(row)}
  onDelete={(row) => handleDelete(row)}
/>
```

**Result:** Three action buttons: 👁️ View (green) | ✏️ Edit (blue) | 🗑️ Delete (red)

---

### Example 2: View and Edit Only

Show only View and Edit buttons, hide Delete.

```tsx
<Table
  data={users}
  columns={columns}
  showActions={true}
  showView={true}
  showEdit={true}
  showDelete={false}    // Hide delete button
  onView={(row) => handleView(row)}
  onEdit={(row) => handleEdit(row)}
  // No onDelete callback needed
/>
```

**Result:** Two action buttons: 👁️ View | ✏️ Edit

**Use Case:** Read-only data with editing allowed but no deletion

---

### Example 3: Edit and Delete Only

Show only Edit and Delete buttons, hide View.

```tsx
<Table
  data={users}
  columns={columns}
  showActions={true}
  showView={false}     // Hide view button
  showEdit={true}
  showDelete={true}
  onEdit={(row) => handleEdit(row)}
  onDelete={(row) => handleDelete(row)}
/>
```

**Result:** Two action buttons: ✏️ Edit | 🗑️ Delete

**Use Case:** Management interface where viewing is done via row click

---

### Example 4: View Only (Read-Only)

Show only View button for read-only access.

```tsx
<Table
  data={users}
  columns={columns}
  showActions={true}
  showView={true}
  showEdit={false}     // Hide edit button
  showDelete={false}   // Hide delete button
  onView={(row) => handleView(row)}
/>
```

**Result:** One action button: 👁️ View

**Use Case:** Read-only reports or audit logs

---

### Example 5: Edit Only

Show only Edit button.

```tsx
<Table
  data={settings}
  columns={columns}
  showActions={true}
  showView={false}
  showEdit={true}
  showDelete={false}
  onEdit={(row) => handleEdit(row)}
/>
```

**Result:** One action button: ✏️ Edit

**Use Case:** Settings or configuration tables where only editing is needed

---

### Example 6: Delete Only

Show only Delete button.

```tsx
<Table
  data={files}
  columns={columns}
  showActions={true}
  showView={false}
  showEdit={false}
  showDelete={true}
  onDelete={(row) => handleDelete(row)}
/>
```

**Result:** One action button: 🗑️ Delete

**Use Case:** File manager or cleanup interfaces

---

### Example 7: No Actions Column

Hide the entire Actions column (traditional table).

```tsx
<Table
  data={users}
  columns={columns}
  showActions={false}  // Hide entire actions column
  onRowClick={(row) => handleRowClick(row)}
/>
```

**Result:** No action buttons, click entire row for interaction

**Use Case:** Simple tables where row click handles everything

---

### Example 8: Conditional Actions

Dynamically show/hide actions based on state or permissions.

```tsx
const hasEditPermission = userRole === 'admin' || userRole === 'editor';
const hasDeletePermission = userRole === 'admin';

<Table
  data={users}
  columns={columns}
  showActions={true}
  showView={true}
  showEdit={hasEditPermission}    // Conditional based on permissions
  showDelete={hasDeletePermission} // Conditional based on permissions
  onView={(row) => handleView(row)}
  onEdit={(row) => handleEdit(row)}
  onDelete={(row) => handleDelete(row)}
/>
```

**Result:** Actions shown based on user permissions

**Use Case:** Role-based access control (RBAC)

---

### Example 9: Actions with Row Click

Combine action buttons with row click handler.

```tsx
<Table
  data={users}
  columns={columns}
  showActions={true}
  showView={true}
  showEdit={true}
  showDelete={true}
  onView={(row) => openViewModal(row)}
  onEdit={(row) => openEditModal(row)}
  onDelete={(row) => confirmDelete(row)}
  onRowClick={(row) => quickPreview(row)}  // Still works!
/>
```

**Result:** Action buttons + row click (click on row cells, not action buttons)

**Use Case:** Quick preview on row click, detailed actions via buttons

---

## Complete Implementation Example

Here's a complete example with all three modals:

```tsx
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
}

export default function UsersPage() {
  const toast = useToast();
  const [users, setUsers] = useState<User[]>([/* your data */]);

  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleView = (user: User) => {
    setViewingUser(user);
    setIsViewModalOpen(true);
    toast.info(`Viewing ${user.name}`, 'View Mode');
  };

  const handleEdit = (user: User) => {
    setEditingUser({ ...user });
    setIsEditModalOpen(true);
    toast.info(`Editing ${user.name}`, 'Edit Mode');
  };

  const handleDelete = (user: User) => {
    const confirmed = confirm(`Delete ${user.name}?`);
    if (confirmed) {
      setUsers(users.filter(u => u.id !== user.id));
      toast.success(`${user.name} deleted`, 'Deleted');
    }
  };

  const handleSaveEdit = () => {
    if (!editingUser) return;
    // Update user in your state/database
    setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
    setIsEditModalOpen(false);
    toast.success('User updated!', 'Success');
  };

  const columns: Column<User>[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
  ];

  return (
    <div>
      <Table
        data={users}
        columns={columns}
        showActions={true}
        showView={true}
        showEdit={true}
        showDelete={true}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="View User"
      >
        {viewingUser && (
          <div>
            <p><strong>Name:</strong> {viewingUser.name}</p>
            <p><strong>Email:</strong> {viewingUser.email}</p>
            <p><strong>Role:</strong> {viewingUser.role}</p>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit User"
        footer={
          <div className="flex gap-2">
            <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
            <button onClick={handleSaveEdit}>Save</button>
          </div>
        }
      >
        {editingUser && (
          <div className="space-y-4">
            <input
              value={editingUser.name}
              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
              placeholder="Name"
            />
            <input
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              placeholder="Email"
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
```

## Action Button Colors

The action buttons use consistent colors across all themes:

- **View (👁️)**: Green - `text-green-600` / `text-green-400` (dark)
- **Edit (✏️)**: Blue - `text-blue-600` / `text-blue-400` (dark)
- **Delete (🗑️)**: Red - `text-red-600` / `text-red-400` (dark)

All buttons have hover states with darker shades for better UX.

## Best Practices

1. **Always provide callbacks**: If you set `showView={true}`, make sure to provide `onView` callback
2. **Confirm destructive actions**: Always confirm before deleting (use browser confirm or custom modal)
3. **Show appropriate feedback**: Use toast notifications to inform users of action results
4. **Handle loading states**: Show loading indicators during async operations
5. **Disable during operations**: Disable action buttons while processing to prevent double-clicks
6. **Permission-based visibility**: Hide actions users don't have permission to perform

## Migration from Old Code

### Old Way (Custom Actions Column)

```tsx
const columns = [
  // ... other columns
  {
    key: 'actions',
    label: 'Actions',
    render: (_, row) => (
      <div>
        <button onClick={() => handleEdit(row)}>Edit</button>
        <button onClick={() => handleDelete(row)}>Delete</button>
      </div>
    )
  }
];
```

### New Way (Built-in Actions)

```tsx
const columns = [
  // ... other columns
  // No custom actions column needed!
];

<Table
  columns={columns}
  showActions={true}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

## TypeScript Support

All action props are fully typed:

```typescript
interface TableProps<T = any> {
  showActions?: boolean;
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}
```

Your IDE will provide full autocomplete and type checking!

---

For more information, see the main [TABLE_README.md](./TABLE_README.md) file.
