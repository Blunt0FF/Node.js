import express from 'express'
import dotenv from 'dotenv/config'
import sequelize from './config/db.js'
import User from './models/user.js'
import bcrypt from 'bcrypt'
import cors from 'cors'

const app = express() 

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

const PORT = process.env.PORT || 3333

app.get('/', (req, res) => {
  res.send('Hi sequelize')
})

app.post('/register', async (req, res) => {
  try {
    const { name, username, email, password } = req.body
    if (!name || !username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      name,
      username,
      email,
      password: hashedPassword
    })

    res.status(201).json({
      message: 'User was successfully created',
      user: newUser
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' })
    }

    res.status(200).json({ message: 'Login successful', user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ Successfully connected to the database.')
    console.log(`🚀 Server running on port ${PORT}`)
  } catch (error) {
    console.error('❌ Unable to connect to the DB:', error)
  }
})