import { PrismaClient } from '@prisma/client'
import {
  CreateTaskDto,
  ManualTaskDto,
  ListOptions,
  PaginatedTasks,
  Task,
  TaskStatus,
} from '../types'
import { validateWithSchema, createTaskSchema, manualTaskSchema } from '../utils/validation'

export class TaskService {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async startTask(data: CreateTaskDto): Promise<Task> {
    // Validate input
    const validation = validateWithSchema(createTaskSchema, data)
    if (!validation.success) {
      throw new Error(validation.errors?.join(', '))
    }

    // Check if a task is already running
    const runningTask = await this.prisma.task.findFirst({
      where: { status: TaskStatus.RUNNING },
    })

    if (runningTask) {
      throw new Error('已有任务正在运行，请先停止当前任务')
    }

    // Create new task
    const task = await this.prisma.task.create({
      data: {
        title: data.title,
        category: data.category,
        startTime: new Date(),
        status: TaskStatus.RUNNING,
      },
    })

    return this.formatTask(task)
  }

  async stopTask(taskId: string): Promise<Task> {
    // Find task
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    })

    if (!task) {
      throw new Error('任务不存在')
    }

    if (task.status !== TaskStatus.RUNNING) {
      throw new Error('任务未在运行中')
    }

    // Calculate duration
    const endTime = new Date()
    const startTime = new Date(task.startTime)
    const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 60000) // 转换为分钟

    // Update task
    const updatedTask = await this.prisma.task.update({
      where: { id: taskId },
      data: {
        endTime,
        duration,
        status: TaskStatus.COMPLETED,
      },
    })

    return this.formatTask(updatedTask)
  }

  async createManualTask(data: ManualTaskDto): Promise<Task> {
    // Validate input
    const validation = validateWithSchema(manualTaskSchema, data)
    if (!validation.success) {
      throw new Error(validation.errors?.join(', '))
    }

    // Use current time as endTime and calculate startTime
    const endTime = new Date()
    const startTime = new Date(endTime.getTime() - data.duration * 60000)

    // Create task
    const task = await this.prisma.task.create({
      data: {
        title: data.title,
        category: data.category,
        startTime,
        endTime,
        duration: data.duration,
        status: TaskStatus.COMPLETED,
      },
    })

    return this.formatTask(task)
  }

  async getTaskList(options: ListOptions): Promise<PaginatedTasks> {
    const { page = 1, limit = 20, category } = options

    // Build where clause
    const where: any = {}
    if (category) {
      where.category = category
    }

    // Get total count
    const total = await this.prisma.task.count({ where })

    // Get tasks
    const tasks = await this.prisma.task.findMany({
      where,
      orderBy: { startTime: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    })

    const hasMore = page * limit < total

    return {
      tasks: tasks.map(task => this.formatTask(task)),
      total,
      page,
      hasMore,
    }
  }

  async getCurrentTask(): Promise<Task | null> {
    const task = await this.prisma.task.findFirst({
      where: { status: TaskStatus.RUNNING },
    })

    return task ? this.formatTask(task) : null
  }

  private formatTask(task: any): Task {
    return {
      id: task.id,
      title: task.title,
      category: task.category,
      startTime: task.startTime.toISOString(),
      endTime: task.endTime ? task.endTime.toISOString() : null,
      duration: task.duration,
      status: task.status as TaskStatus,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
    }
  }
}
