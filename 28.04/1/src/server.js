import express from 'express'
import cors from 'cors'
import connectDb from './db/config.js'
import mongoose from 'mongoose'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// === Mongoose схема и модель ===
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
})

const User = mongoose.model('User', userSchema)

// === Роуты ===
app.get('/', (req, res) => {
  res.json({ message: 'hello home page' })
})

app.post('/users', async (req, res) => {
  try {
    const { name, email, age } = req.body
    if (!name || !email || !age) {
      return res.status(400).json({ error: 'Name, email and age are required' })
    }

    const newUser = new User({ name, email, age })
    await newUser.save()

    res.status(201).json({
      message: 'User was created',
      user: newUser,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create user' })
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json({ message: 'User updated', user: updatedUser })
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' })
  }
})

app.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' })
  }
})

// === Запуск после подключения к базе ===
app.listen(PORT, async () => {
  try {
    await connectDb()
    console.log(`Server is running on port ${PORT}`)
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
  }
})