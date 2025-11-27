import { useState } from 'react'
import { Category, TaskInput } from '../types'
import { CategorySelect } from './CategorySelect'

interface TaskInputFormProps {
  onSubmit: (data: TaskInput) => void
  onCancel: () => void
  mode: 'timer' | 'manual'
}

export function TaskInputForm({ onSubmit, onCancel, mode }: TaskInputFormProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<Category>(Category.WORK)
  const [duration, setDuration] = useState('')
  const [errors, setErrors] = useState<{ title?: string; duration?: string }>({})

  const validate = (): boolean => {
    const newErrors: { title?: string; duration?: string } = {}

    if (!title.trim()) {
      newErrors.title = '请输入任务标题'
    } else if (title.length > 200) {
      newErrors.title = '任务标题不能超过 200 个字符'
    }

    if (mode === 'manual') {
      const durationNum = parseInt(duration)
      if (!duration || isNaN(durationNum)) {
        newErrors.duration = '请输入有效的时长'
      } else if (durationNum <= 0) {
        newErrors.duration = '时长必须大于 0'
      } else if (durationNum > 1440) {
        newErrors.duration = '时长不能超过 1440 分钟（24 小时）'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    const data: TaskInput = {
      title: title.trim(),
      category,
    }

    if (mode === 'manual') {
      data.duration = parseInt(duration)
    }

    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          任务标题 *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          placeholder="输入任务标题"
          maxLength={200}
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        <p className="mt-1 text-sm text-gray-500">{title.length}/200</p>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          分类 *
        </label>
        <CategorySelect value={category} onChange={setCategory} />
      </div>

      {mode === 'manual' && (
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
            时长（分钟）*
          </label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="输入时长"
            min="1"
            max="1440"
          />
          {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
          <p className="mt-1 text-sm text-gray-500">最多 1440 分钟（24 小时）</p>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[44px]"
        >
          {mode === 'timer' ? '开始计时' : '创建任务'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 min-h-[44px]"
        >
          取消
        </button>
      </div>
    </form>
  )
}
