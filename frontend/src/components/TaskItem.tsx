import { Task } from '../types'
import { CategoryBadge } from './CategoryBadge'
import { DurationDisplay } from './DurationDisplay'

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const formatTime = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <CategoryBadge category={task.category} />
          </div>
          <h3 className="text-base font-medium text-gray-900 mb-2 truncate">{task.title}</h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
            <span>🕐 {formatTime(task.startTime)}</span>
            {task.endTime && (
              <>
                <span className="hidden sm:inline">→</span>
                <span>🕐 {formatTime(task.endTime)}</span>
              </>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold text-primary">
            {task.duration ? <DurationDisplay minutes={task.duration} /> : '-'}
          </div>
        </div>
      </div>
    </div>
  )
}
