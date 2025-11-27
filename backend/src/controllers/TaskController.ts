import { Request, Response } from 'express'
import { TaskService } from '../services/TaskService'

export class TaskController {
  private taskService: TaskService

  constructor(taskService: TaskService) {
    this.taskService = taskService
  }

  startTask = async (req: Request, res: Response) => {
    try {
      const task = await this.taskService.startTask(req.body)
      res.status(201).json(task)
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('已有任务正在运行')) {
          res.status(409).json({ error: { message: error.message } })
        } else {
          res.status(400).json({ error: { message: error.message } })
        }
      } else {
        res.status(500).json({ error: { message: '服务器错误' } })
      }
    }
  }

  stopTask = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const task = await this.taskService.stopTask(id)
      res.status(200).json(task)
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('不存在')) {
          res.status(404).json({ error: { message: error.message } })
        } else {
          res.status(400).json({ error: { message: error.message } })
        }
      } else {
        res.status(500).json({ error: { message: '服务器错误' } })
      }
    }
  }

  createManualTask = async (req: Request, res: Response) => {
    try {
      const task = await this.taskService.createManualTask(req.body)
      res.status(201).json(task)
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: { message: error.message } })
      } else {
        res.status(500).json({ error: { message: '服务器错误' } })
      }
    }
  }

  getTasks = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 20
      const category = req.query.category as string | undefined

      const result = await this.taskService.getTaskList({ page, limit, category })
      res.status(200).json(result)
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: { message: error.message } })
      } else {
        res.status(500).json({ error: { message: '服务器错误' } })
      }
    }
  }

  getCurrentTask = async (req: Request, res: Response) => {
    try {
      const task = await this.taskService.getCurrentTask()
      if (task) {
        res.status(200).json(task)
      } else {
        res.status(204).send()
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: { message: error.message } })
      } else {
        res.status(500).json({ error: { message: '服务器错误' } })
      }
    }
  }
}
