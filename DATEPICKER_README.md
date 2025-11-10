# DatePicker Component Documentation

A flexible, theme-aware date picker component with support for both single date and date range selection.

## Features

- ✅ Single date selection mode
- ✅ Date range selection mode
- ✅ Custom calendar UI with month navigation
- ✅ Min/max date constraints
- ✅ Hover preview for range selection
- ✅ "Today" quick selection button
- ✅ Theme-aware styling (works with all 5 themes)
- ✅ Full TypeScript support
- ✅ Keyboard accessible
- ✅ Mobile responsive

## Import

```tsx
import DatePicker, { DateRange } from '@/components/DatePicker';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `is_range` | `boolean` | `false` | Enable date range selection mode |
| `value` | `Date \| null` | `null` | Selected date (single mode) |
| `rangeValue` | `DateRange` | `{ startDate: null, endDate: null }` | Selected range (range mode) |
| `onChange` | `(date: Date \| null) => void` | `undefined` | Callback when single date is selected |
| `onRangeChange` | `(range: DateRange) => void` | `undefined` | Callback when date range is selected |
| `minDate` | `Date` | `undefined` | Minimum selectable date |
| `maxDate` | `Date` | `undefined` | Maximum selectable date |
| `placeholder` | `string` | Auto-generated | Placeholder text |
| `className` | `string` | `''` | Additional CSS classes |
| `disabled` | `boolean` | `false` | Disable the picker |

## TypeScript Interfaces

```typescript
export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface DatePickerProps {
  is_range?: boolean;
  value?: Date | null;
  rangeValue?: DateRange;
  onChange?: (date: Date | null) => void;
  onRangeChange?: (range: DateRange) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}
```

## Usage Examples

### Example 1: Single Date Selection

Basic single date picker:

```tsx
'use client';

import { useState } from 'react';
import DatePicker from '@/components/DatePicker';

export default function MyComponent() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <DatePicker
      is_range={false}
      value={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      placeholder="Select a date"
    />
  );
}
```

### Example 2: Date Range Selection

Select start and end dates:

```tsx
'use client';

import { useState } from 'react';
import DatePicker, { DateRange } from '@/components/DatePicker';

export default function MyComponent() {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  return (
    <DatePicker
      is_range={true}
      rangeValue={dateRange}
      onRangeChange={(range) => setDateRange(range)}
      placeholder="Select date range"
    />
  );
}
```

### Example 3: With Min/Max Constraints

Limit selectable dates to a specific range:

```tsx
'use client';

import { useState } from 'react';
import DatePicker from '@/components/DatePicker';

export default function MyComponent() {
  const [date, setDate] = useState<Date | null>(null);

  // Only allow selecting dates from last 30 days
  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 30);
  const maxDate = new Date();

  return (
    <DatePicker
      is_range={false}
      value={date}
      onChange={(date) => setDate(date)}
      minDate={minDate}
      maxDate={maxDate}
      placeholder="Select date (last 30 days)"
    />
  );
}
```

### Example 4: Date Range for Reports

Common use case for reporting periods:

```tsx
'use client';

import { useState } from 'react';
import DatePicker, { DateRange } from '@/components/DatePicker';

export default function ReportPage() {
  const [reportPeriod, setReportPeriod] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const generateReport = () => {
    if (reportPeriod.startDate && reportPeriod.endDate) {
      console.log('Generating report from', reportPeriod.startDate, 'to', reportPeriod.endDate);
      // Your report generation logic here
    }
  };

  return (
    <div>
      <DatePicker
        is_range={true}
        rangeValue={reportPeriod}
        onRangeChange={(range) => setReportPeriod(range)}
        placeholder="Select report period"
        maxDate={new Date()} // Can't select future dates
      />

      <button
        onClick={generateReport}
        disabled={!reportPeriod.startDate || !reportPeriod.endDate}
      >
        Generate Report
      </button>
    </div>
  );
}
```

### Example 5: Birthday Selector

Restrict to past dates only:

```tsx
'use client';

import { useState } from 'react';
import DatePicker from '@/components/DatePicker';

export default function ProfileForm() {
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);

  return (
    <DatePicker
      is_range={false}
      value={dateOfBirth}
      onChange={(date) => setDateOfBirth(date)}
      maxDate={new Date()} // Can't select future dates
      placeholder="Select your date of birth"
    />
  );
}
```

### Example 6: Event Date Range Picker

Future dates only for event planning:

```tsx
'use client';

import { useState } from 'react';
import DatePicker, { DateRange } from '@/components/DatePicker';

export default function EventForm() {
  const [eventDates, setEventDates] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  return (
    <DatePicker
      is_range={true}
      rangeValue={eventDates}
      onRangeChange={(range) => setEventDates(range)}
      minDate={new Date()} // Can't select past dates
      placeholder="Select event dates"
    />
  );
}
```

### Example 7: With Form Integration

Integrate with forms:

```tsx
'use client';

import { useState } from 'react';
import DatePicker from '@/components/DatePicker';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkInDate: null as Date | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Name"
      />

      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />

      <DatePicker
        is_range={false}
        value={formData.checkInDate}
        onChange={(date) => setFormData({ ...formData, checkInDate: date })}
        minDate={new Date()}
        placeholder="Check-in date"
      />

      <button type="submit">Book Now</button>
    </form>
  );
}
```

## How It Works

### Single Date Mode (`is_range={false}`)

1. Click the input to open calendar
2. Navigate months using arrow buttons
3. Click a date to select it
4. Calendar closes automatically
5. `onChange` callback is called with selected date

### Range Mode (`is_range={true}`)

1. Click the input to open calendar
2. Click first date to set start date
3. Hover over other dates to preview range
4. Click second date to complete range
5. Range is automatically ordered (start < end)
6. Calendar closes automatically
7. `onRangeChange` callback is called with range

### Quick "Today" Button

Both modes include a "Today" button that:
- **Single mode**: Selects today's date
- **Range mode**: Sets both start and end to today

## Styling

The DatePicker uses CSS variables for theming and works perfectly with all 5 themes:

- `var(--background)` - Input field background
- `var(--border)` - Input and calendar borders
- `var(--text-primary)` - Primary text color
- `var(--text-secondary)` - Secondary text (placeholders, day names)
- `var(--card-bg)` - Calendar dropdown background
- `var(--card-border)` - Calendar border

### Button Colors

- **Selected date**: Blue background (`bg-blue-600`)
- **Range dates**: Light blue background (`bg-blue-100`)
- **Today indicator**: Blue border (`border-blue-600`)
- **Hover**: Light blue (`hover:bg-blue-100`)

## Date Formatting

The component uses `toLocaleDateString` with the following format:

```javascript
date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})
// Output: "Jan 15, 2024"
```

You can format dates differently in your `onChange` callbacks if needed.

## Accessibility

- **Keyboard navigation**: Tab through calendar controls
- **ARIA labels**: All buttons have proper titles
- **Focus management**: Proper focus states on all interactive elements
- **Color contrast**: Works in both light and dark themes

## Best Practices

1. **Always provide onChange callbacks**: Handle the selected date/range
2. **Use constraints wisely**: Set `minDate`/`maxDate` for better UX
3. **Validate dates**: Check if dates are null before using them
4. **Show feedback**: Use toast notifications when dates are selected
5. **Handle edge cases**: Account for timezone differences if needed

## Common Patterns

### Format Date for Display

```tsx
const formatDate = (date: Date | null) => {
  if (!date) return 'Not selected';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

<div>Selected: {formatDate(selectedDate)}</div>
```

### Calculate Days Between Dates

```tsx
const calculateDays = (range: DateRange) => {
  if (!range.startDate || !range.endDate) return 0;
  const diff = range.endDate.getTime() - range.startDate.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const days = calculateDays(dateRange);
```

### Disable Weekends

```tsx
const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
};

// To implement, you'd need to modify the component or use minDate/maxDate creatively
```

## Live Demo

Visit `/admin/accounts` to see the DatePicker in action with:
- Single date selection
- Date range selection
- Constrained date ranges (last 30 days)
- Integration with forms and modals

## Troubleshooting

### Date not updating

Make sure you're using controlled component pattern:

```tsx
// ✅ Correct
<DatePicker value={date} onChange={(d) => setDate(d)} />

// ❌ Wrong - missing state update
<DatePicker value={date} onChange={(d) => console.log(d)} />
```

### Range not working

Ensure you're using the range props:

```tsx
// ✅ Correct
<DatePicker
  is_range={true}
  rangeValue={range}
  onRangeChange={(r) => setRange(r)}
/>

// ❌ Wrong - using single date props
<DatePicker
  is_range={true}
  value={date}
  onChange={(d) => setDate(d)}
/>
```

### Calendar not opening

Check if the component is disabled:

```tsx
<DatePicker disabled={false} /> // Should be clickable
```

---

For more examples, see `/app/admin/accounts/page.tsx`
