'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export interface BarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    borderRadius?: number;
    hoverBackgroundColor?: string | string[];
  }[];
}

interface BarChartProps {
  data: BarChartData;
  options?: ChartOptions<'bar'>;
  is_multiple_data?: boolean;
  is_grid?: boolean;
}

export default function BarChart({ data, options, is_multiple_data = false, is_grid = true }: BarChartProps) {
  const defaultOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: true,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
    },
    plugins: {
      legend: {
        display: is_multiple_data ? true : (data.datasets.length > 1),
        position: 'top',
        labels: {
          color: 'rgb(156, 163, 175)',
          font: {
            size: 12,
            weight: 'bold' as const,
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: 'rgb(243, 244, 246)',
        bodyColor: 'rgb(209, 213, 219)',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 2,
        padding: 12,
        boxPadding: 6,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        displayColors: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: is_grid,
          color: 'rgba(156, 163, 175, 0.1)',
          lineWidth: 1,
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          font: {
            size: 11,
            weight: 'normal' as const,
          },
          callback: function(value) {
            return '$' + value.toLocaleString();
          },
        },
        border: {
          display: false,
        },
      },
      x: {
        grid: {
          display: is_grid,
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          font: {
            size: 11,
            weight: 'bold' as const,
          },
        },
        border: {
          display: false,
        },
      },
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return <Bar data={data} options={mergedOptions} />;
}
