import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Category from './models/Category.js'
import Product from './models/Product.js'

dotenv.config()
const app = express()
app.use(express.json())

// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Подключено к MongoDB'))
.catch((err) => console.error('❌ Ошибка подключения к MongoDB:', err))

// POST /categories - создать категорию
app.post('/categories', async (req, res) => {
  try {
    const category = new Category(req.body)
    const saved = await category.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: 'Ошибка при создании категории' })
  }
})

// POST /products - создать продукт
app.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body)
    const saved = await product.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: 'Ошибка при создании продукта' })
  }
})

// GET /products - получить все продукты с популированной категорией
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('category')
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении продуктов' })
  }
})

// Старт сервера
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`)
})