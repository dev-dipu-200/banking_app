'use client';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface PieChartData {
  labels: string[];
  datasets: {
    label?: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
    borderWidth?: number;
  }[];
}

interface PieChartProps {
  data: PieChartData;
  options?: ChartOptions<'pie'>;
}

export default function PieChart({ data, options }: PieChartProps) {
  const defaultOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: true,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
    },
    plugins: {
      legend: {
        position: 'bottom',
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
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return <Pie data={data} options={mergedOptions} />;
}
