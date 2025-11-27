// Enums
export enum Category {
  WORK = 'work',
  STUDY = 'study',
  ENTERTAINMENT = 'entertainment',
  MISC = 'misc',
}

export enum TaskStatus {
  RUNNING = 'running',
  COMPLETED = 'completed',
}

// Task Types
export interface Task {
  id: string
  title: string
  category: Category
  startTime: string // ISO8601
  endTime: string | null
  duration: number | null // 分钟
  status: TaskStatus
  createdAt: string
  updatedAt: string
}

export interface RunningTask extends Task {
  status: TaskStatus.RUNNING
  elapsedMinutes: number // 前端计算的实时时长
}

// DTOs
export interface CreateTaskDto {
  title: string
  category: string
}

export interface ManualTaskDto {
  title: string
  category: string
  duration: number // 分钟
}

export interface ListOptions {
  page: number
  limit: number
  category?: string
}

export interface PaginatedTasks {
  tasks: Task[]
  total: number
  page: number
  hasMore: boolean
}

// Statistics Types
export interface CategoryStats {
  category: Category
  duration: number
  percentage: number
}

export interface DailyStats {
  date: string
  totalDuration: number
  taskCount: number
  categoryBreakdown: CategoryStats[]
}

export interface WeeklyStats {
  weekStart: string
  weekEnd: string
  totalDuration: number
  dailyBreakdown: Array<{
    date: string
    duration: number
  }>
  categoryBreakdown: CategoryStats[]
}

export interface TaskRanking {
  title: string
  category: Category
  totalDuration: number
  occurrences: number
}
