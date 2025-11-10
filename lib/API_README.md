# Centralized API Utility Documentation

A comprehensive, type-safe API utility for making HTTP requests in your Next.js application.

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [API Methods](#api-methods)
- [Advanced Features](#advanced-features)
- [Error Handling](#error-handling)
- [Examples](#examples)
- [TypeScript Support](#typescript-support)

## Installation

The API utility is already available in your project at `lib/api.ts`.

## Basic Usage

### Import the API utility

```typescript
import api from '@/lib/api';
// or
import { api, apiRequest, uploadFile, downloadFile } from '@/lib/api';
```

### Simple GET request

```typescript
const response = await api.get('/users');

if (response.success) {
  console.log('Users:', response.data);
} else {
  console.error('Error:', response.error);
}
```

### Simple POST request

```typescript
const response = await api.post('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

if (response.success) {
  console.log('User created:', response.data);
}
```

## API Methods

### `api.get(endpoint, params?, config?)`

Make a GET request.

```typescript
// Simple GET
const users = await api.get('/users');

// GET with query parameters
const filteredUsers = await api.get('/users', {
  page: 1,
  limit: 10,
  status: 'active'
});

// GET with custom config
const data = await api.get('/users', undefined, {
  timeout: 5000,
  headers: { 'X-Custom-Header': 'value' }
});
```

### `api.post(endpoint, body?, config?)`

Make a POST request.

```typescript
const response = await api.post('/users', {
  name: 'Jane Doe',
  email: 'jane@example.com',
  role: 'admin'
});
```

### `api.put(endpoint, body?, config?)`

Make a PUT request (full update).

```typescript
const response = await api.put('/users/123', {
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  role: 'admin'
});
```

### `api.patch(endpoint, body?, config?)`

Make a PATCH request (partial update).

```typescript
const response = await api.patch('/users/123', {
  email: 'newemail@example.com'
});
```

### `api.delete(endpoint, config?)`

Make a DELETE request.

```typescript
const response = await api.delete('/users/123');
```

## Advanced Features

### File Upload

Upload single or multiple files with additional data.

```typescript
import { uploadFile } from '@/lib/api';

// Single file upload
const file = document.querySelector('input[type="file"]').files[0];
const response = await uploadFile('/upload', file);

// Multiple files upload
const files = Array.from(document.querySelector('input[type="file"]').files);
const response = await uploadFile('/upload/multiple', files);

// Upload with additional data
const response = await uploadFile(
  '/upload',
  file,
  {
    userId: '123',
    category: 'profile-picture',
    metadata: { description: 'User avatar' }
  },
  {
    timeout: 60000 // 60 seconds
  }
);
```

### File Download

Download files from the server.

```typescript
import { downloadFile } from '@/lib/api';

// Download file
const response = await downloadFile('/reports/monthly', 'monthly-report.pdf');

// Download with parameters
const response = await downloadFile(
  '/reports/export',
  'export.xlsx',
  {
    params: { year: 2025, month: 1 }
  }
);
```

### Custom Headers

Add custom headers to your requests.

```typescript
const response = await api.get('/protected', undefined, {
  headers: {
    'Authorization': 'Bearer your-token-here',
    'X-API-Key': 'your-api-key',
    'X-Custom-Header': 'custom-value'
  }
});
```

### Request Timeout

Set custom timeout for requests.

```typescript
const response = await api.get('/slow-endpoint', undefined, {
  timeout: 60000 // 60 seconds (default is 30 seconds)
});
```

### Credentials Mode

Control how cookies and credentials are sent.

```typescript
const response = await api.get('/api/data', undefined, {
  credentials: 'include' // 'include' | 'omit' | 'same-origin'
});
```

## Error Handling

The API utility returns a consistent response structure:

```typescript
interface ApiResponse<T> {
  data?: T;           // Response data (if successful)
  error?: string;     // Error message (if failed)
  success: boolean;   // Whether the request succeeded
  status: number;     // HTTP status code
  message?: string;   // Human-readable message
}
```

### Handling Errors

```typescript
const response = await api.get('/users');

if (response.success) {
  // Handle success
  console.log('Data:', response.data);
} else {
  // Handle error
  console.error('Error:', response.error);
  console.error('Status:', response.status);
  console.error('Message:', response.message);

  // Different error types
  if (response.status === 401) {
    // Unauthorized - redirect to login
    router.push('/login');
  } else if (response.status === 404) {
    // Not found
    showToast('Resource not found', 'error');
  } else if (response.status === 0) {
    // Network error
    showToast('Network connection error', 'error');
  }
}
```

## Examples

### Example 1: Login with Toast Notifications

```typescript
'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { useToast } from '@/components/ToastProvider';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);

    const response = await api.post('/auth/login', {
      email,
      password
    });

    setLoading(false);

    if (response.success) {
      toast.success('Login successful!', 'Welcome');
      // Redirect or update state
    } else {
      toast.error(response.message || 'Login failed', 'Error');
    }
  };

  return (
    // Your form JSX
  );
}
```

### Example 2: Fetch Data with Loading State

```typescript
'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const response = await api.get<User[]>('/users', {
        page: 1,
        limit: 10
      });

      setLoading(false);

      if (response.success) {
        setUsers(response.data || []);
      } else {
        setError(response.error || 'Failed to load users');
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name} - {user.email}</li>
      ))}
    </ul>
  );
}
```

### Example 3: Create User with Validation

```typescript
'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { useToast } from '@/components/ToastProvider';

export default function CreateUserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await api.post('/users', formData);

    setLoading(false);

    if (response.success) {
      toast.success('User created successfully!', 'Success');
      // Reset form
      setFormData({ name: '', email: '', role: 'user' });
    } else {
      toast.error(response.message || 'Failed to create user', 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}
```

### Example 4: Update User with PATCH

```typescript
const updateUserEmail = async (userId: string, newEmail: string) => {
  const response = await api.patch(`/users/${userId}`, {
    email: newEmail
  });

  if (response.success) {
    console.log('Email updated:', response.data);
    return true;
  } else {
    console.error('Update failed:', response.error);
    return false;
  }
};
```

### Example 5: Delete User with Confirmation

```typescript
const deleteUser = async (userId: string) => {
  const confirmed = confirm('Are you sure you want to delete this user?');

  if (!confirmed) return;

  const response = await api.delete(`/users/${userId}`);

  if (response.success) {
    toast.success('User deleted successfully', 'Success');
    // Refresh user list
  } else {
    toast.error(response.message || 'Failed to delete user', 'Error');
  }
};
```

### Example 6: File Upload with Progress (Advanced)

```typescript
import { uploadFile } from '@/lib/api';
import { useToast } from '@/components/ToastProvider';

const handleFileUpload = async (file: File) => {
  const toast = useToast();

  toast.info('Uploading file...', 'Upload');

  const response = await uploadFile(
    '/upload/avatar',
    file,
    {
      userId: '123',
      replace: true
    },
    {
      timeout: 120000 // 2 minutes for large files
    }
  );

  if (response.success) {
    toast.success('File uploaded successfully!', 'Success');
    console.log('Upload response:', response.data);
  } else {
    toast.error(response.message || 'Upload failed', 'Error');
  }
};
```

### Example 7: Download Report

```typescript
import { downloadFile } from '@/lib/api';

const downloadMonthlyReport = async (year: number, month: number) => {
  const response = await downloadFile(
    '/reports/monthly',
    `report-${year}-${month}.pdf`,
    {
      params: { year, month }
    }
  );

  if (!response.success) {
    console.error('Download failed:', response.error);
  }
};
```

## TypeScript Support

The API utility is fully typed. You can specify response types for type safety:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Type-safe request
const response = await api.get<PaginatedResponse<User>>('/users', {
  page: 1,
  limit: 10
});

if (response.success && response.data) {
  // TypeScript knows the shape of response.data
  const users = response.data.data;
  const total = response.data.total;
}
```

## Configuration

### Environment Variables

Set the API base URL in your `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

If not set, it defaults to:
- `/api` on the client-side
- `http://localhost:3000/api` on the server-side

### Default Configuration

You can modify default configurations in `lib/api.ts`:

```typescript
const defaultConfig = {
  timeout: 30000,        // 30 seconds
  credentials: 'include' // Include cookies
};
```

## Best Practices

1. **Always handle errors**: Check `response.success` before using `response.data`
2. **Use TypeScript types**: Define interfaces for your API responses
3. **Show user feedback**: Use toast notifications for user-facing operations
4. **Set appropriate timeouts**: Longer for uploads/downloads, shorter for data fetches
5. **Handle loading states**: Show loading indicators during async operations
6. **Validate on client and server**: Don't rely solely on client-side validation

## Error Status Codes

Common HTTP status codes you'll encounter:

- `200-299`: Success
- `400`: Bad Request - Invalid input
- `401`: Unauthorized - Not authenticated
- `403`: Forbidden - Not authorized
- `404`: Not Found - Resource doesn't exist
- `408`: Timeout - Request took too long
- `500`: Server Error - Something went wrong on the server
- `0`: Network Error - No connection to server

---

For more information or issues, check the source code at `lib/api.ts`.
