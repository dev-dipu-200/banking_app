# Chart Components - Multiple Data Comparison & Grid Control

All chart components now support advanced features for data visualization and comparison.

## Features

### Multiple Data Comparison
- **is_multiple_data: true** - Forces the legend to display, ideal for comparing multiple datasets
- **is_multiple_data: false** (default) - Legend only shows when there are multiple datasets

### Grid Display Control
- **is_grid: true** (default) - Shows grid lines on both X and Y axes
- **is_grid: false** - Hides all grid lines for a cleaner look

## Usage Examples

### Line Chart with Multiple Data Comparison

```tsx
import LineChart from '@/components/charts/LineChart';

function ComparisonChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: '2023 Revenue',
        data: [12000, 15000, 13000, 17000, 16000, 19000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: '2024 Revenue',
        data: [14000, 17000, 15000, 19000, 18000, 22000],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <LineChart
      data={data}
      is_multiple_data={true}
      is_grid={true}
    />
  );
}
```

### Line Chart without Grid Lines

```tsx
import LineChart from '@/components/charts/LineChart';

function CleanChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 15000, 13000, 17000, 16000, 19000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Clean look without grid lines
  return (
    <LineChart
      data={data}
      is_grid={false}
    />
  );
}
```

### Bar Chart with Multiple Data Comparison

```tsx
import BarChart from '@/components/charts/BarChart';

function ComparisonBarChart() {
  const data = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Product A',
        data: [45000, 52000, 48000, 61000],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        borderRadius: 8,
      },
      {
        label: 'Product B',
        data: [38000, 41000, 44000, 49000],
        backgroundColor: 'rgba(168, 85, 247, 0.8)',
        borderColor: 'rgb(168, 85, 247)',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  return (
    <BarChart
      data={data}
      is_multiple_data={true}
      is_grid={true}
    />
  );
}
```

### Bar Chart without Grid Lines

```tsx
import BarChart from '@/components/charts/BarChart';

function MinimalBarChart() {
  const data = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Sales',
        data: [45000, 52000, 48000, 61000],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  // Minimal design without grid lines
  return (
    <BarChart
      data={data}
      is_grid={false}
    />
  );
}
```

### Single Dataset (Legend Hidden by Default)

```tsx
import LineChart from '@/components/charts/LineChart';

function SingleDataChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 15000, 13000, 17000, 16000, 19000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Legend will be hidden automatically since there's only one dataset
  // and is_multiple_data defaults to false
  return <LineChart data={data} />;
}
```

### Pie Chart with Multiple Datasets

```tsx
import PieChart from '@/components/charts/PieChart';

function CategoryComparison() {
  const data = {
    labels: ['Savings', 'Investments', 'Emergency Fund', 'Expenses'],
    datasets: [
      {
        label: 'Budget Distribution',
        data: [35, 25, 20, 20],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
        ],
      },
    ],
  };

  return <PieChart data={data} is_multiple_data={false} />;
}
```

## API Reference

### LineChart & BarChart Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | ChartData | required | Chart data with labels and datasets |
| `options` | ChartOptions | optional | Custom Chart.js options |
| `is_multiple_data` | boolean | `false` | Enable comparison mode with forced legend display |
| `is_grid` | boolean | `true` | Show/hide grid lines on X and Y axes |

### PieChart & DoughnutChart Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | ChartData | required | Chart data with labels and datasets |
| `options` | ChartOptions | optional | Custom Chart.js options |
| `is_multiple_data` | boolean | `false` | Enable comparison mode with forced legend display |

## Behavior

### Legend Display
- When `is_multiple_data={true}`: Legend is always displayed
- When `is_multiple_data={false}`: Legend shows only if `datasets.length > 1`
- Default value is `false` for backward compatibility

### Grid Display (LineChart & BarChart only)
- When `is_grid={true}`: Grid lines are displayed on both axes
- When `is_grid={false}`: Grid lines are hidden for a cleaner look
- Default value is `true` to maintain existing behavior

## Use Cases

### Multiple Data Comparison
1. **Year-over-year comparisons** - Compare current year vs previous year
2. **Product comparisons** - Compare performance across different products
3. **Regional comparisons** - Compare metrics across different regions
4. **Before/After analysis** - Show impact of changes over time

### Grid Control
1. **Clean presentations** - Use `is_grid={false}` for minimal, modern dashboards
2. **Detailed analysis** - Use `is_grid={true}` for precise data reading
3. **Mobile optimization** - Hide grids on mobile for better readability
4. **Print-friendly** - Remove grids for cleaner printed reports

## Quick Examples

```tsx
// Comparison chart with grid
<LineChart data={data} is_multiple_data={true} is_grid={true} />

// Single chart without grid (minimal look)
<LineChart data={data} is_grid={false} />

// Bar chart comparison without grid
<BarChart data={data} is_multiple_data={true} is_grid={false} />

// Default behavior (grid visible, legend auto)
<LineChart data={data} />
```
