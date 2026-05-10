import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { connectDB } from './config/db.js'
import { mountSwagger } from './config/swagger.js'

import User from './models/User.js'

import authRouter from './routes/auth.js'
import usersRouter from './routes/users.js'
import categoriesRouter from './routes/categories.js'
import productsRouter from './routes/products.js'
import ordersRouter from './routes/orders.js'

import errorHandler from './middlewares/errorHandler.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({
    message: 'eCommerce API',
    docs: '/api/docs',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      categories: '/api/categories',
      products: '/api/products',
      orders: '/api/orders',
    },
  })
})

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/products', productsRouter)
app.use('/api/orders', ordersRouter)

mountSwagger(app)

app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' })
})

app.use(errorHandler)

await connectDB(process.env.MONGO_URI)

if (process.env.ADMIN_EMAIL) {
  const result = await User.updateOne(
    { email: process.env.ADMIN_EMAIL.toLowerCase() },
    { $set: { role: 'admin' } }
  )
  if (result.matchedCount > 0) {
    console.log(`Пользователь ${process.env.ADMIN_EMAIL} назначен администратором`)
  }
}

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`)
})
