import { Request, Response } from 'express'
import { StatisticsService } from '../services/StatisticsService'

export class StatisticsController {
  private statisticsService: StatisticsService

  constructor(statisticsService: StatisticsService) {
    this.statisticsService = statisticsService
  }

  getDailyStats = async (req: Request, res: Response) => {
    try {
      const dateStr = (req.query.date as string) || new Date().toISOString().split('T')[0]
      const date = new Date(dateStr)

      const stats = await this.statisticsService.getDailyStats(date)
      res.status(200).json(stats)
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: { message: error.message } })
      } else {
        res.status(500).json({ error: { message: '服务器错误' } })
      }
    }
  }

  getWeeklyStats = async (req: Request, res: Response) => {
    try {
      let weekStart: Date

      if (req.query.weekStart) {
        weekStart = new Date(req.query.weekStart as string)
      } else {
        // Default to start of current week (Monday)
        const now = new Date()
        const dayOfWeek = now.getDay()
        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek // Adjust when day is Sunday
        weekStart = new Date(now)
        weekStart.setDate(now.getDate() + diff)
      }

      const stats = await this.statisticsService.getWeeklyStats(weekStart)
      res.status(200).json(stats)
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: { message: error.message } })
      } else {
        res.status(500).json({ error: { message: '服务器错误' } })
      }
    }
  }

  getTopTasks = async (req: Request, res: Response) => {
    try {
      const period = (req.query.period as 'day' | 'week') || 'week'
      const limit = parseInt(req.query.limit as string) || 5

      const tasks = await this.statisticsService.getTopTasks(period, limit)
      res.status(200).json({ period, tasks })
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: { message: error.message } })
      } else {
        res.status(500).json({ error: { message: '服务器错误' } })
      }
    }
  }
}
