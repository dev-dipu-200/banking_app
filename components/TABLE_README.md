# Dynamic Table Component

A flexible, paginated table component for Next.js that supports both Client-Side Rendering (CSR) and Server-Side Rendering (SSR).

## Features

- **Dynamic Rendering Modes**: Switch between CSR and SSR with a single prop
- **Pagination**: Built-in pagination with customizable items per page
- **Sorting**: Client-side column sorting (CSR mode only)
- **Custom Rendering**: Custom cell renderers for each column
- **Dark Mode Support**: Fully styled for dark and light themes
- **Row Click Handlers**: Optional click handlers for rows
- **Responsive Design**: Mobile-friendly layout
- **TypeScript**: Fully typed for better developer experience

## Usage

### Basic Example (CSR Mode)

```tsx
'use client';

import Table, { Column } from '@/components/Table';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UsersPage() {
  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    // ... more users
  ];

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
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
  ];

  return (
    <Table
      data={users}
      columns={columns}
      is_csr={true}
      itemsPerPage={10}
      showPagination={true}
    />
  );
}
```

### Advanced Example with Custom Renderers (CSR Mode)

```tsx
'use client';

import Table, { Column } from '@/components/Table';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function UsersPage() {
  const users: User[] = [...];

  const columns: Column<User>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (value) => <span className="font-bold">{value}</span>,
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <button onClick={() => alert(`Edit ${row.name}`)}>
          Edit
        </button>
      ),
    },
  ];

  return (
    <Table
      data={users}
      columns={columns}
      is_csr={true}
      itemsPerPage={10}
      onRowClick={(row) => console.log('Row clicked:', row)}
    />
  );
}
```

### SSR Mode Example

For SSR mode, you need to create a client wrapper component because you cannot pass functions (like `render` in columns) directly from Server Components to Client Components.

**Step 1: Create a Client Wrapper Component** (`components/ReportsTable.tsx`):

```tsx
'use client';

import Table, { Column } from '@/components/Table';

interface Report {
  id: number;
  title: string;
  status: string;
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
  // Define columns with render functions in the client component
  const columns: Column<Report>[] = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
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
    />
  );
}
```

**Step 2: Use in Server Component** (`app/reports/page.tsx`):

```tsx
import ReportsTable from '@/components/ReportsTable';

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const itemsPerPage = 10;

  // Fetch data from your database or API (server-side)
  const { reports, totalItems } = await fetchReports({
    page: currentPage,
    limit: itemsPerPage,
  });

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      <h1>Reports</h1>
      <ReportsTable
        reports={reports}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
```

## Props

### `data` (required)
- Type: `T[]`
- Description: Array of data to display in the table

### `columns` (required)
- Type: `Column<T>[]`
- Description: Array of column configurations

### `is_csr` (optional)
- Type: `boolean`
- Default: `true`
- Description: Enable CSR mode (true) or SSR mode (false)
  - **CSR mode**: Handles pagination and sorting on the client
  - **SSR mode**: Uses URL query params for pagination, renders navigation as Next.js Links

### `itemsPerPage` (optional)
- Type: `number`
- Default: `10`
- Description: Number of items to display per page

### `showPagination` (optional)
- Type: `boolean`
- Default: `true`
- Description: Show or hide pagination controls

### `currentPage` (optional)
- Type: `number`
- Description: Current page number (used in SSR mode)

### `totalPages` (optional)
- Type: `number`
- Description: Total number of pages (used in SSR mode)

### `totalItems` (optional)
- Type: `number`
- Description: Total number of items (used in SSR mode)

### `onPageChange` (optional)
- Type: `(page: number) => void`
- Description: Callback when page changes (used in SSR mode for custom handling)

### `onRowClick` (optional)
- Type: `(row: T) => void`
- Description: Callback when a row is clicked

### `className` (optional)
- Type: `string`
- Description: Additional CSS classes for the table container

### `emptyMessage` (optional)
- Type: `string`
- Default: `'No data available'`
- Description: Message to display when there is no data

## Column Configuration

Each column object can have the following properties:

### `key` (required)
- Type: `string`
- Description: The key to access the value in the data object

### `label` (required)
- Type: `string`
- Description: The header label for the column

### `sortable` (optional)
- Type: `boolean`
- Description: Enable sorting for this column (CSR mode only)

### `render` (optional)
- Type: `(value: any, row: T) => React.ReactNode`
- Description: Custom renderer for the cell
- Parameters:
  - `value`: The value of the cell
  - `row`: The entire row object

## When to Use CSR vs SSR

### Use CSR (`is_csr={true}`) when:
- You have a relatively small dataset (< 1000 items)
- You want instant client-side sorting
- You want instant pagination without page reloads
- Data is fetched client-side (e.g., from an API route)
- The page is already a Client Component

### Use SSR (`is_csr={false}`) when:
- You have a large dataset
- You want better SEO for paginated content
- You're fetching data server-side from a database
- You want to reduce JavaScript bundle size
- You need URL-based pagination (shareable links to specific pages)

## Examples in the Project

- **CSR Example**: `/app/admin/users/page.tsx`
- **SSR Example**: `/app/admin/reports/page.tsx`

## Styling

The table is fully styled with Tailwind CSS and supports both light and dark modes. You can customize the appearance by:

1. Passing a `className` prop to the Table component
2. Customizing the global styles in your Tailwind config
3. Using the `render` prop in column definitions for custom cell styling
