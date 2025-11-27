import { useState } from 'react'
import { DailySummary } from '../components/DailySummary'

export function StatisticsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(e.target.value))
  }

  const today = new Date().toISOString().split('T')[0]
  const selectedDateStr = selectedDate.toISOString().split('T')[0]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">统计分析</h1>
        <input
          type="date"
          value={selectedDateStr}
          max={today}
          onChange={handleDateChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>

      <DailySummary date={selectedDate} />
    </div>
  )
}
