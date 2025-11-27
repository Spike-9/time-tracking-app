import { useEffect, useRef } from 'react'
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import { CategoryStats } from '../types'

ChartJS.register(ArcElement, Tooltip, Legend)

interface CategoryPieChartProps {
  data: CategoryStats[]
}

const categoryColors = {
  work: {
    background: 'rgba(59, 130, 246, 0.8)',
    border: 'rgba(59, 130, 246, 1)',
  },
  study: {
    background: 'rgba(16, 185, 129, 0.8)',
    border: 'rgba(16, 185, 129, 1)',
  },
  entertainment: {
    background: 'rgba(168, 85, 247, 0.8)',
    border: 'rgba(168, 85, 247, 1)',
  },
  misc: {
    background: 'rgba(107, 114, 128, 0.8)',
    border: 'rgba(107, 114, 128, 1)',
  },
}

const categoryLabels = {
  work: '💼 工作',
  study: '📚 学习',
  entertainment: '🎮 娱乐',
  misc: '📝 日常琐碎',
}

export function CategoryPieChart({ data }: CategoryPieChartProps) {
  if (data.length === 0) {
    return null
  }

  const labels = data.map(item => categoryLabels[item.category as keyof typeof categoryLabels])
  const values = data.map(item => item.duration)
  const backgroundColors = data.map(
    item => categoryColors[item.category as keyof typeof categoryColors].background
  )
  const borderColors = data.map(
    item => categoryColors[item.category as keyof typeof categoryColors].border
  )

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 2,
      },
    ],
  }

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: context => {
            const label = context.label || ''
            const value = context.parsed
            const hours = Math.floor(value / 60)
            const minutes = value % 60
            let timeStr = ''
            if (hours > 0) {
              timeStr = `${hours}小时`
              if (minutes > 0) {
                timeStr += ` ${minutes}分钟`
              }
            } else {
              timeStr = `${minutes}分钟`
            }
            const percentage = data[context.dataIndex].percentage.toFixed(1)
            return `${label}: ${timeStr} (${percentage}%)`
          },
        },
      },
    },
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Pie data={chartData} options={options} />
    </div>
  )
}
