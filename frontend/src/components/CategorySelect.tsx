import { Category } from '../types'

interface CategorySelectProps {
  value: Category
  onChange: (category: Category) => void
}

const categories = [
  { value: Category.WORK, label: '💼 工作', icon: '💼' },
  { value: Category.STUDY, label: '📚 学习', icon: '📚' },
  { value: Category.ENTERTAINMENT, label: '🎮 娱乐', icon: '🎮' },
  { value: Category.MISC, label: '📝 日常琐碎', icon: '📝' },
]

export function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value as Category)}
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-base"
    >
      {categories.map(cat => (
        <option key={cat.value} value={cat.value}>
          {cat.label}
        </option>
      ))}
    </select>
  )
}
