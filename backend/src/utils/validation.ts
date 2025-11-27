import { z } from 'zod'
import { Category } from '../types'

// Validation schemas
export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, '任务标题不能为空')
    .max(200, '任务标题不能超过 200 个字符'),
  category: z.nativeEnum(Category, {
    errorMap: () => ({ message: '分类必须是 work, study, entertainment 或 misc' }),
  }),
})

export const manualTaskSchema = z.object({
  title: z
    .string()
    .min(1, '任务标题不能为空')
    .max(200, '任务标题不能超过 200 个字符'),
  category: z.nativeEnum(Category, {
    errorMap: () => ({ message: '分类必须是 work, study, entertainment 或 misc' }),
  }),
  duration: z
    .number()
    .positive('时长必须为正数')
    .max(1440, '时长不能超过 1440 分钟（24 小时）'),
})

export const listOptionsSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  category: z.nativeEnum(Category).optional(),
})

// Validation functions
export function validateTaskTitle(title: string): { valid: boolean; error?: string } {
  if (!title || title.trim().length === 0) {
    return { valid: false, error: '任务标题不能为空' }
  }
  if (title.length > 200) {
    return { valid: false, error: '任务标题不能超过 200 个字符' }
  }
  return { valid: true }
}

export function validateCategory(category: string): { valid: boolean; error?: string } {
  const validCategories = Object.values(Category)
  if (!validCategories.includes(category as Category)) {
    return {
      valid: false,
      error: `分类必须是以下之一: ${validCategories.join(', ')}`,
    }
  }
  return { valid: true }
}

export function validateDuration(duration: number): { valid: boolean; error?: string } {
  if (duration <= 0) {
    return { valid: false, error: '时长必须为正数' }
  }
  if (duration > 1440) {
    return { valid: false, error: '时长不能超过 1440 分钟（24 小时）' }
  }
  return { valid: true }
}

// Helper function to validate with Zod schema
export function validateWithSchema<T>(schema: z.ZodSchema<T>, data: unknown): {
  success: boolean
  data?: T
  errors?: string[]
} {
  const result = schema.safeParse(data)
  if (result.success) {
    return { success: true, data: result.data }
  }
  const errors = result.error.errors.map(err => err.message)
  return { success: false, errors }
}
