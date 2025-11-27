import { useState, useEffect } from 'react'
import { useAppState, useAppDispatch } from '../context/AppContext'
import { api } from '../services/api'
import { CurrentTaskPanel } from '../components/CurrentTaskPanel'
import { TaskInputForm } from '../components/TaskInputForm'
import { DailySummary } from '../components/DailySummary'
import { TaskInput } from '../types'

export function HomePage() {
  const { currentTask, error } = useAppState()
  const dispatch = useAppDispatch()
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadCurrentTask()
  }, [])

  const loadCurrentTask = async () => {
    try {
      const task = await api.getCurrentTask()
      if (task) {
        dispatch({ 
          type: 'START_TASK', 
          payload: { 
            ...task, 
            status: 'running' as const,
            elapsedMinutes: 0 
          } 
        })
      }
    } catch (error) {
      console.error('Failed to load current task:', error)
    }
  }

  const handleStartTask = async (data: TaskInput) => {
    setLoading(true)
    try {
      const task = await api.startTask(data)
      dispatch({ 
        type: 'START_TASK', 
        payload: { 
          ...task, 
          status: 'running' as const,
          elapsedMinutes: 0 
        } 
      })
      setShowForm(false)
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.error?.message || '开始任务失败' })
    } finally {
      setLoading(false)
    }
  }

  const handleStopTask = async () => {
    if (!currentTask) return

    setLoading(true)
    try {
      const task = await api.stopTask(currentTask.id)
      dispatch({ type: 'STOP_TASK', payload: task })
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.error?.message || '停止任务失败' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">时间追踪</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
          <button
            onClick={() => dispatch({ type: 'CLEAR_ERROR' })}
            className="ml-4 text-red-900 underline"
          >
            关闭
          </button>
        </div>
      )}

      {currentTask ? (
        <CurrentTaskPanel task={currentTask} onStop={handleStopTask} />
      ) : (
        <div className="space-y-4">
          {showForm ? (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">开始新任务</h2>
              <TaskInputForm
                mode="timer"
                onSubmit={handleStartTask}
                onCancel={() => setShowForm(false)}
              />
            </div>
          ) : (
            <button
              onClick={() => setShowForm(true)}
              disabled={loading}
              className="w-full bg-primary text-white px-8 py-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-xl font-semibold shadow-lg transition-all disabled:opacity-50"
            >
              ▶️ 开始新任务
            </button>
          )}
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">今日统计</h2>
        <DailySummary />
      </div>
    </div>
  )
}
