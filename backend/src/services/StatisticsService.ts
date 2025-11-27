import { PrismaClient } from '@prisma/client'
import {
  DailyStats,
  WeeklyStats,
  TaskRanking,
  CategoryStats,
  Category,
  TaskStatus,
} from '../types/index'

export class StatisticsService {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async getDailyStats(date: Date): Promise<DailyStats> {
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    // Get all completed tasks for the day
    const tasks = await this.prisma.task.findMany({
      where: {
        status: TaskStatus.COMPLETED,
        startTime: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    })

    // Calculate total duration
    const totalDuration = tasks.reduce((sum, task) => sum + (task.duration || 0), 0)

    // Calculate category breakdown
    const categoryMap = new Map<string, number>()
    tasks.forEach(task => {
      const current = categoryMap.get(task.category) || 0
      categoryMap.set(task.category, current + (task.duration || 0))
    })

    const categoryBreakdown: CategoryStats[] = Array.from(categoryMap.entries()).map(
      ([category, duration]) => ({
        category: category as Category,
        duration,
        percentage: totalDuration > 0 ? (duration / totalDuration) * 100 : 0,
      })
    )

    return {
      date: date.toISOString().split('T')[0],
      totalDuration,
      taskCount: tasks.length,
      categoryBreakdown,
    }
  }

  async getWeeklyStats(weekStart: Date): Promise<WeeklyStats> {
    const startOfWeek = new Date(weekStart)
    startOfWeek.setHours(0, 0, 0, 0)

    const endOfWeek = new Date(weekStart)
    endOfWeek.setDate(endOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)

    // Get all completed tasks for the week
    const tasks = await this.prisma.task.findMany({
      where: {
        status: TaskStatus.COMPLETED,
        startTime: {
          gte: startOfWeek,
          lte: endOfWeek,
        },
      },
    })

    // Calculate total duration
    const totalDuration = tasks.reduce((sum, task) => sum + (task.duration || 0), 0)

    // Calculate daily breakdown
    const dailyMap = new Map<string, number>()
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(day.getDate() + i)
      const dateStr = day.toISOString().split('T')[0]
      dailyMap.set(dateStr, 0)
    }

    tasks.forEach(task => {
      const dateStr = new Date(task.startTime).toISOString().split('T')[0]
      const current = dailyMap.get(dateStr) || 0
      dailyMap.set(dateStr, current + (task.duration || 0))
    })

    const dailyBreakdown = Array.from(dailyMap.entries()).map(([date, duration]) => ({
      date,
      duration,
    }))

    // Calculate category breakdown
    const categoryMap = new Map<string, number>()
    tasks.forEach(task => {
      const current = categoryMap.get(task.category) || 0
      categoryMap.set(task.category, current + (task.duration || 0))
    })

    const categoryBreakdown: CategoryStats[] = Array.from(categoryMap.entries()).map(
      ([category, duration]) => ({
        category: category as Category,
        duration,
        percentage: totalDuration > 0 ? (duration / totalDuration) * 100 : 0,
      })
    )

    return {
      weekStart: startOfWeek.toISOString().split('T')[0],
      weekEnd: endOfWeek.toISOString().split('T')[0],
      totalDuration,
      dailyBreakdown,
      categoryBreakdown,
    }
  }

  async getTopTasks(period: 'day' | 'week', limit: number = 5): Promise<TaskRanking[]> {
    const now = new Date()
    let startDate: Date

    if (period === 'day') {
      startDate = new Date(now)
      startDate.setHours(0, 0, 0, 0)
    } else {
      // week
      startDate = new Date(now)
      startDate.setDate(startDate.getDate() - 6)
      startDate.setHours(0, 0, 0, 0)
    }

    const endDate = new Date(now)
    endDate.setHours(23, 59, 59, 999)

    // Get all completed tasks for the period
    const tasks = await this.prisma.task.findMany({
      where: {
        status: TaskStatus.COMPLETED,
        startTime: {
          gte: startDate,
          lte: endDate,
        },
      },
    })

    // Group by title and aggregate
    const taskMap = new Map<string, { category: string; totalDuration: number; count: number }>()

    tasks.forEach(task => {
      const existing = taskMap.get(task.title)
      if (existing) {
        existing.totalDuration += task.duration || 0
        existing.count += 1
      } else {
        taskMap.set(task.title, {
          category: task.category,
          totalDuration: task.duration || 0,
          count: 1,
        })
      }
    })

    // Convert to array and sort by total duration
    const rankings: TaskRanking[] = Array.from(taskMap.entries())
      .map(([title, data]) => ({
        title,
        category: data.category as Category,
        totalDuration: data.totalDuration,
        occurrences: data.count,
      }))
      .sort((a, b) => b.totalDuration - a.totalDuration)
      .slice(0, limit)

    return rankings
  }
}
