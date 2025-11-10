# Toast and Modal Components

Dynamic, reusable Toast notifications and Modal dialogs for your Next.js application.

## Toast Component

A flexible toast notification system with support for success, error, warning, and info messages.

### Features

- **Multiple Types**: success, error, warning, info
- **Auto Dismiss**: Configurable duration with auto-close
- **Manual Dismiss**: Close button on each toast
- **Global Context**: Access from anywhere in your app
- **Animations**: Smooth slide-in and fade-out animations
- **Dark Mode**: Full dark mode support
- **Stacking**: Multiple toasts stack nicely
- **Position**: Top-right corner by default

### Usage

#### Basic Usage

```tsx
'use client';

import { useToast } from '@/components/ToastProvider';

export default function MyComponent() {
  const toast = useToast();

  const handleClick = () => {
    toast.success('Operation successful!');
  };

  return <button onClick={handleClick}>Show Toast</button>;
}
```

#### All Toast Types

```tsx
const toast = useToast();

// Success toast
toast.success('User created successfully!', 'Success');

// Error toast
toast.error('Failed to save changes', 'Error');

// Warning toast
toast.warning('You are about to delete this item', 'Warning');

// Info toast
toast.info('Your session will expire in 5 minutes', 'Info');

// Custom duration (in milliseconds)
toast.success('This will stay for 10 seconds', 'Long Message', 10000);

// Permanent toast (until manually closed)
toast.error('Critical error occurred', 'Error', 0);
```

#### Advanced Usage

```tsx
'use client';

import { useToast } from '@/components/ToastProvider';

export default function FormComponent() {
  const toast = useToast();

  const handleSubmit = async (data: any) => {
    try {
      // Show info toast
      toast.info('Submitting form...', 'Processing');

      await submitData(data);

      // Show success toast
      toast.success('Form submitted successfully!', 'Success');
    } catch (error) {
      // Show error toast
      toast.error(
        error.message || 'An error occurred',
        'Submission Failed'
      );
    }
  };

  return <form onSubmit={handleSubmit}>{/* form fields */}</form>;
}
```

### Toast API

#### `useToast()` Hook

Returns an object with the following methods:

- `success(message, title?, duration?)` - Show success toast
- `error(message, title?, duration?)` - Show error toast
- `warning(message, title?, duration?)` - Show warning toast
- `info(message, title?, duration?)` - Show info toast
- `showToast(type, message, title?, duration?)` - Generic method

**Parameters:**
- `message` (required): The toast message
- `title` (optional): Toast title/heading
- `duration` (optional): Display duration in ms (default: 5000, 0 for permanent)

---

## Modal Component

A versatile modal dialog component with full customization options.

### Features

- **Customizable Sizes**: sm, md, lg, xl, full
- **Portal Rendering**: Renders outside DOM hierarchy
- **Backdrop Blur**: Modern glassmorphism effect
- **Keyboard Support**: ESC key to close
- **Click Outside**: Optional close on overlay click
- **Scroll Lock**: Prevents body scroll when open
- **Footer Support**: Custom footer with buttons
- **Animations**: Smooth scale-in animation
- **Dark Mode**: Full dark mode support

### Usage

#### Basic Modal

```tsx
'use client';

import { useState } from 'react';
import Modal from '@/components/Modal';

export default function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="My Modal"
      >
        <p>Modal content goes here</p>
      </Modal>
    </>
  );
}
```

#### Modal with Footer

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  footer={
    <div className="flex justify-end gap-3">
      <button
        onClick={() => setIsOpen(false)}
        className="px-4 py-2 border rounded-lg"
      >
        Cancel
      </button>
      <button
        onClick={handleConfirm}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Confirm
      </button>
    </div>
  }
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

#### Different Sizes

```tsx
// Small modal
<Modal isOpen={isOpen} onClose={onClose} size="sm" title="Small">
  Content
</Modal>

// Medium (default)
<Modal isOpen={isOpen} onClose={onClose} size="md" title="Medium">
  Content
</Modal>

// Large
<Modal isOpen={isOpen} onClose={onClose} size="lg" title="Large">
  Content
</Modal>

// Extra Large
<Modal isOpen={isOpen} onClose={onClose} size="xl" title="Extra Large">
  Content
</Modal>

// Full width
<Modal isOpen={isOpen} onClose={onClose} size="full" title="Full Width">
  Content
</Modal>
```

#### User Detail Modal (Real Example)

```tsx
'use client';

import { useState } from 'react';
import Modal from '@/components/Modal';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export default function UserList() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* User list */}
      <div>
        {users.map(user => (
          <div key={user.id} onClick={() => handleViewUser(user)}>
            {user.name}
          </div>
        ))}
      </div>

      {/* User Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="User Details"
        size="lg"
        footer={
          <div className="flex justify-end gap-3">
            <button onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button onClick={handleSave}>
              Save Changes
            </button>
          </div>
        }
      >
        {selectedUser && (
          <div className="space-y-4">
            <img
              src={selectedUser.avatar}
              alt={selectedUser.name}
              className="w-20 h-20 rounded-full"
            />
            <h3>{selectedUser.name}</h3>
            <p>{selectedUser.email}</p>
            <p>Role: {selectedUser.role}</p>
          </div>
        )}
      </Modal>
    </>
  );
}
```

#### Image Gallery Modal

```tsx
<Modal
  isOpen={isGalleryOpen}
  onClose={() => setIsGalleryOpen(false)}
  title="Image Gallery"
  size="xl"
  showCloseButton={true}
>
  <div className="grid grid-cols-3 gap-4">
    {images.map(image => (
      <img
        key={image.id}
        src={image.url}
        alt={image.title}
        className="w-full h-48 object-cover rounded-lg"
      />
    ))}
  </div>
</Modal>
```

#### Form Modal

```tsx
<Modal
  isOpen={isFormOpen}
  onClose={() => setIsFormOpen(false)}
  title="Add New User"
  size="md"
  footer={
    <div className="flex justify-end gap-3">
      <button onClick={() => setIsFormOpen(false)}>
        Cancel
      </button>
      <button onClick={handleSubmit}>
        Submit
      </button>
    </div>
  }
>
  <form className="space-y-4">
    <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
    <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
    <select className="w-full p-2 border rounded">
      <option>User</option>
      <option>Admin</option>
    </select>
  </form>
</Modal>
```

### Modal Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | boolean | required | Controls modal visibility |
| `onClose` | () => void | required | Callback when modal closes |
| `title` | string | - | Modal title/heading |
| `children` | ReactNode | required | Modal content |
| `size` | 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' | 'md' | Modal width |
| `showCloseButton` | boolean | true | Show X button in header |
| `closeOnOverlayClick` | boolean | true | Close when clicking outside |
| `footer` | ReactNode | - | Custom footer content |

---

## Combined Example: Table with Toast and Modal

```tsx
'use client';

import { useState } from 'react';
import Table, { Column } from '@/components/Table';
import Modal from '@/components/Modal';
import { useToast } from '@/components/ToastProvider';

export default function UsersPage() {
  const toast = useToast();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    toast.info(`Viewing ${user.name}`);
  };

  const handleEdit = (user) => {
    toast.warning(`Editing ${user.name}`);
  };

  const handleDelete = (user) => {
    toast.error(`Cannot delete ${user.name}`, 'Error');
  };

  const handleSave = () => {
    toast.success('User updated successfully!');
    setIsModalOpen(false);
  };

  const columns: Column[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div>
          <button onClick={() => handleView(row)}>View</button>
          <button onClick={() => handleEdit(row)}>Edit</button>
          <button onClick={() => handleDelete(row)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        data={users}
        columns={columns}
        is_csr={true}
        onRowClick={handleView}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="User Details"
        size="lg"
        footer={
          <button onClick={handleSave}>Save</button>
        }
      >
        {selectedUser && (
          <div>
            <h3>{selectedUser.name}</h3>
            <p>{selectedUser.email}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
```

---

## Setup

The `ToastProvider` is already integrated into your app's `ClientProvider`. You don't need to add it manually.

If you need to add it to a new project:

```tsx
// app/layout.tsx or components/ClientProvider.tsx
import ToastProvider from '@/components/ToastProvider';

export default function Layout({ children }) {
  return (
    <ToastProvider>
      {children}
    </ToastProvider>
  );
}
```

---

## Examples in Project

- **Toast Examples**: `/app/admin/users/page.tsx`
- **Modal Examples**: `/app/admin/users/page.tsx`
- **Combined Usage**: `/app/admin/users/page.tsx`

---

## Styling

Both components are fully styled with Tailwind CSS and support:
- Light/Dark themes
- Custom theme colors (Orange, Purple, Green)
- Responsive design
- Smooth animations
- Accessibility features

You can customize the styling by:
1. Modifying the component files directly
2. Overriding classes via Tailwind
3. Using the global CSS variables defined in `globals.css`
