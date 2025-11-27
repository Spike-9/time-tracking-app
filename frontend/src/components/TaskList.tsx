import { useEffect, useRef } from 'react'
import { Task, Category } from '../types'
import { TaskItem } from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  onLoadMore: () => void
  hasMore: boolean
  filterCategory?: Category
}

export function TaskList({ tasks, onLoadMore, hasMore, filterCategory }: TaskListProps) {
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore()
        }
      },
      { threshold: 0.1 }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [hasMore, onLoadMore])

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-gray-500 text-lg">
          {filterCategory ? '该分类下暂无任务记录' : '暂无任务记录'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}

      {hasMore && (
        <div ref={observerTarget} className="py-4 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-gray-500 mt-2">加载更多...</p>
        </div>
      )}
    </div>
  )
}
