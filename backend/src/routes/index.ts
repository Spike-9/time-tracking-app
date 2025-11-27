import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { TaskService } from '../services/TaskService'
import { StatisticsService } from '../services/StatisticsService'
import { TaskController } from '../controllers/TaskController'
import { StatisticsController } from '../controllers/StatisticsController'

const prisma = new PrismaClient()
const taskService = new TaskService(prisma)
const statisticsService = new StatisticsService(prisma)
const taskController = new TaskController(taskService)
const statisticsController = new StatisticsController(statisticsService)

const router = Router()

// Task routes
router.post('/tasks/start', taskController.startTask)
router.put('/tasks/:id/stop', taskController.stopTask)
router.post('/tasks/manual', taskController.createManualTask)
router.get('/tasks', taskController.getTasks)
router.get('/tasks/current', taskController.getCurrentTask)

// Statistics routes
router.get('/stats/daily', statisticsController.getDailyStats)
router.get('/stats/weekly', statisticsController.getWeeklyStats)
router.get('/stats/top-tasks', statisticsController.getTopTasks)

export default router
