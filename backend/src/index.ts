import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import router from './routes/index'

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Root path
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Time Tracking API' })
})

// API routes
app.use('/api', router)

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({
    error: {
      message: process.env.NODE_ENV === 'production' ? '服务器错误' : err.message,
    },
  })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})
