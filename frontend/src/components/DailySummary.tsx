import { useEffect, useState } from 'react'
import { DailyStats } from '../types'
import { api } from '../services/api'
import { DurationDisplay } from './DurationDisplay'
import { CategoryPieChart } from './CategoryPieChart'

interface DailySummaryProps {
  date?: Date
}

export function DailySummary({ date }: DailySummaryProps) {
  const [stats, setStats] = useState<DailyStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date?.toISOString()])

  const loadStats = async () => {
    setLoading(true)
    setError(null)
    try {
      const dateStr = date ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      const data = await api.getDailyStats(dateStr)
      setStats(data)
    } catch (err) {
      setError('加载统计数据失败')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    )
  }

  if (!stats || stats.totalDuration === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <p className="text-gray-500 text-lg">今日暂无数据</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 总览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <div className="text-sm text-blue-600 font-medium mb-2">总时长</div>
          <div className="text-3xl font-bold text-blue-900">
            <DurationDisplay minutes={stats.totalDuration} />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
          <div className="text-sm text-green-600 font-medium mb-2">任务数量</div>
          <div className="text-3xl font-bold text-green-900">{stats.taskCount} 个</div>
        </div>
      </div>

      {/* 分类占比饼图 */}
      {stats.categoryBreakdown.length > 0 && (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">时间分配</h3>
          <CategoryPieChart data={stats.categoryBreakdown} />
        </div>
      )}

      {/* 分类详情列表 */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">分类详情</h3>
        <div className="space-y-3">
          {stats.categoryBreakdown.map(item => (
            <div
              key={item.category}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">
                  {item.category === 'work' && '💼'}
                  {item.category === 'study' && '📚'}
                  {item.category === 'entertainment' && '🎮'}
                  {item.category === 'misc' && '📝'}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {item.category === 'work' && '工作'}
                    {item.category === 'study' && '学习'}
                    {item.category === 'entertainment' && '娱乐'}
                    {item.category === 'misc' && '日常琐碎'}
                  </div>
                  <div className="text-sm text-gray-600">
                    <DurationDisplay minutes={item.duration} />
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary">
                  {item.percentage.toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
