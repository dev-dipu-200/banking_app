'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export interface LineChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    fill?: boolean;
    tension?: number;
    pointBackgroundColor?: string;
    pointBorderColor?: string;
    pointHoverBackgroundColor?: string;
    pointHoverBorderColor?: string;
    pointRadius?: number;
    pointHoverRadius?: number;
    borderWidth?: number;
  }[];
}

interface LineChartProps {
  data: LineChartData;
  options?: ChartOptions<'line'>;
}

export default function LineChart({ data, options }: LineChartProps) {
  const defaultOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: true,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
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
          color: 'rgba(156, 163, 175, 0.05)',
          lineWidth: 1,
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

  return <Line data={data} options={mergedOptions} />;
}
