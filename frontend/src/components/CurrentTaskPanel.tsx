import { useState, useEffect } from 'react'
import { Task } from '../types'
import { CategoryBadge } from './CategoryBadge'
import { DurationDisplay } from './DurationDisplay'

interface CurrentTaskPanelProps {
  task: Task
  onStop: () => void
}

export function CurrentTaskPanel({ task, onStop }: CurrentTaskPanelProps) {
  const [elapsedMinutes, setElapsedMinutes] = useState(0)

  useEffect(() => {
    // Calculate initial elapsed time
    const startTime = new Date(task.startTime).getTime()
    const updateElapsed = () => {
      const now = Date.now()
      const elapsed = Math.floor((now - startTime) / 60000)
      setElapsedMinutes(elapsed)
    }

    updateElapsed()

    // Update every second
    const interval = setInterval(updateElapsed, 1000)

    return () => clearInterval(interval)
  }, [task.startTime])

  return (
    <div className="bg-blue-50 border-l-4 border-primary p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-600">正在进行</span>
            <CategoryBadge category={task.category} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{task.title}</h3>
          <div className="flex items-center gap-2 text-2xl font-bold text-primary">
            <span>⏱️</span>
            <DurationDisplay minutes={elapsedMinutes} />
          </div>
        </div>
        <button
          onClick={onStop}
          className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 min-h-[44px] min-w-[44px] font-medium"
        >
          ⏹️ 停止
        </button>
      </div>
    </div>
  )
}
