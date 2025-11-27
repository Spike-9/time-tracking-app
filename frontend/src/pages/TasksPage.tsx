import { useState, useEffect } from 'react'
import { useAppState, useAppDispatch } from '../context/AppContext'
import { api } from '../services/api'
import { TaskList } from '../components/TaskList'
import { Category } from '../types'

export function TasksPage() {
  const { tasks } = useAppState()
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [filterCategory, setFilterCategory] = useState<Category | undefined>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadTasks(1)
  }, [filterCategory])

  const loadTasks = async (pageNum: number) => {
    if (loading) return

    setLoading(true)
    try {
      const result = await api.getTasks(pageNum, 20, filterCategory)
      if (pageNum === 1) {
        dispatch({ type: 'LOAD_TASKS', payload: result.tasks })
      } else {
        dispatch({ type: 'LOAD_TASKS', payload: [...tasks, ...result.tasks] })
      }
      setHasMore(result.hasMore)
      setPage(pageNum)
    } catch (error) {
      console.error('Failed to load tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadTasks(page + 1)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">任务历史</h1>
        <select
          value={filterCategory || ''}
          onChange={e => setFilterCategory(e.target.value ? (e.target.value as Category) : undefined)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
        >
          <option value="">全部分类</option>
          <option value={Category.WORK}>💼 工作</option>
          <option value={Category.STUDY}>📚 学习</option>
          <option value={Category.ENTERTAINMENT}>🎮 娱乐</option>
          <option value={Category.MISC}>📝 日常琐碎</option>
        </select>
      </div>

      <TaskList
        tasks={tasks}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
        filterCategory={filterCategory}
      />
    </div>
  )
}
