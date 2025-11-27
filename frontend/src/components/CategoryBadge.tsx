import { Category } from '../types'

interface CategoryBadgeProps {
  category: Category
}

const categoryConfig = {
  [Category.WORK]: {
    label: '工作',
    color: 'bg-blue-100 text-blue-800',
    icon: '💼',
  },
  [Category.STUDY]: {
    label: '学习',
    color: 'bg-green-100 text-green-800',
    icon: '📚',
  },
  [Category.ENTERTAINMENT]: {
    label: '娱乐',
    color: 'bg-purple-100 text-purple-800',
    icon: '🎮',
  },
  [Category.MISC]: {
    label: '日常琐碎',
    color: 'bg-gray-100 text-gray-800',
    icon: '📝',
  },
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const config = categoryConfig[category]

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm font-medium ${config.color}`}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  )
}
