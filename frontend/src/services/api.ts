import axios, { AxiosInstance } from 'axios'
import {
  Task,
  CreateTaskDto,
  ManualTaskDto,
  PaginatedTasks,
  DailyStats,
  WeeklyStats,
  TaskRanking,
} from '../types'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor
    this.client.interceptors.request.use(
      config => config,
      error => Promise.reject(error)
    )

    // Response interceptor with retry logic
    this.client.interceptors.response.use(
      response => response,
      async error => {
        const config = error.config

        // Retry logic with exponential backoff
        if (!config || !config.retry) {
          config.retry = 0
        }

        if (config.retry < 3) {
          config.retry += 1
          const delay = Math.pow(2, config.retry - 1) * 1000 // 1s, 2s, 4s
          await new Promise(resolve => setTimeout(resolve, delay))
          return this.client(config)
        }

        return Promise.reject(error)
      }
    )
  }

  // Task endpoints
  async startTask(data: CreateTaskDto): Promise<Task> {
    const response = await this.client.post('/tasks/start', data)
    return response.data
  }

  async stopTask(taskId: string): Promise<Task> {
    const response = await this.client.put(`/tasks/${taskId}/stop`)
    return response.data
  }

  async createManualTask(data: ManualTaskDto): Promise<Task> {
    const response = await this.client.post('/tasks/manual', data)
    return response.data
  }

  async getTasks(page: number = 1, limit: number = 20, category?: string): Promise<PaginatedTasks> {
    const params: any = { page, limit }
    if (category) params.category = category
    const response = await this.client.get('/tasks', { params })
    return response.data
  }

  async getCurrentTask(): Promise<Task | null> {
    try {
      const response = await this.client.get('/tasks/current')
      return response.data
    } catch (error: any) {
      if (error.response?.status === 204) {
        return null
      }
      throw error
    }
  }

  // Statistics endpoints
  async getDailyStats(date?: string): Promise<DailyStats> {
    const params = date ? { date } : {}
    const response = await this.client.get('/stats/daily', { params })
    return response.data
  }

  async getWeeklyStats(weekStart?: string): Promise<WeeklyStats> {
    const params = weekStart ? { weekStart } : {}
    const response = await this.client.get('/stats/weekly', { params })
    return response.data
  }

  async getTopTasks(period: 'day' | 'week' = 'week', limit: number = 5): Promise<TaskRanking[]> {
    const response = await this.client.get('/stats/top-tasks', {
      params: { period, limit },
    })
    return response.data.tasks
  }
}

export const api = new ApiClient()
