# Table Component - Quick Reference Card

## Basic Usage

```tsx
import Table, { Column } from '@/components/Table';

<Table
  data={myData}
  columns={columns}
  showActions={true}
/>
```

## Action Props Quick Reference

| What You Want | Props to Set |
|---------------|--------------|
| **All actions** | `showActions={true}` |
| **View + Edit + Delete** | `showActions={true}` `onView={...}` `onEdit={...}` `onDelete={...}` |
| **View + Edit only** | `showActions={true}` `showDelete={false}` |
| **View + Delete only** | `showActions={true}` `showEdit={false}` |
| **Edit + Delete only** | `showActions={true}` `showView={false}` |
| **View only** | `showActions={true}` `showEdit={false}` `showDelete={false}` |
| **Edit only** | `showActions={true}` `showView={false}` `showDelete={false}` |
| **Delete only** | `showActions={true}` `showView={false}` `showEdit={false}` |
| **No actions** | `showActions={false}` or omit |

## Copy-Paste Templates

### Template 1: All Actions
```tsx
<Table
  data={data}
  columns={columns}
  showActions={true}
  onView={(row) => console.log('View:', row)}
  onEdit={(row) => console.log('Edit:', row)}
  onDelete={(row) => console.log('Delete:', row)}
/>
```

### Template 2: View & Edit Only
```tsx
<Table
  data={data}
  columns={columns}
  showActions={true}
  showDelete={false}
  onView={(row) => console.log('View:', row)}
  onEdit={(row) => console.log('Edit:', row)}
/>
```

### Template 3: Edit Only
```tsx
<Table
  data={data}
  columns={columns}
  showActions={true}
  showView={false}
  showDelete={false}
  onEdit={(row) => console.log('Edit:', row)}
/>
```

### Template 4: With Modals
```tsx
const [isViewOpen, setIsViewOpen] = useState(false);
const [isEditOpen, setIsEditOpen] = useState(false);
const [selected, setSelected] = useState(null);

<Table
  showActions={true}
  onView={(row) => { setSelected(row); setIsViewOpen(true); }}
  onEdit={(row) => { setSelected(row); setIsEditOpen(true); }}
  onDelete={(row) => confirm(`Delete ${row.name}?`) && deleteRow(row)}
/>

<Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)}>
  {/* View content */}
</Modal>

<Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
  {/* Edit form */}
</Modal>
```

## Button Colors
- 🟢 **View** = Green
- 🔵 **Edit** = Blue  
- 🔴 **Delete** = Red

## Remember
- Set `showActions={true}` to enable any actions
- Default is ALL buttons shown if callbacks provided
- Hide individual buttons with `showView={false}`, etc.
- Always handle callbacks (`onView`, `onEdit`, `onDelete`)

## Full Example
See `app/admin/users/page.tsx` for complete working example!
