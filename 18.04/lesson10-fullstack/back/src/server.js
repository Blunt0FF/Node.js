import bcrypt from 'bcrypt'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import sequelize from './config/db.js'
import User from './models/user.js'

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('HOME')
})
app.post('/register', async (req, res) => {
  try {
    const { name, email, username, password } = req.body
    if (!name || !email || !username || !password) {
      res.status(400).json({ error: "Haven't all req data" })
      return
    }
    const newUser = await User.create({
      name,
      email,
      username,
      password,
    })
    res.status(201).json({ message: 'Successfully create', user: newUser })
  } catch (error) {
    res.status(500).json({ error })
  }
})
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const existUser = await User.findOne({ where: { email } })
    if (!existUser) {
      return res.status(404).json({ error: 'Users not found' })
    }

    const validPass = await bcrypt.compare(password, existUser.password)
    if (!validPass) {
      return res.status(401).json({ error: 'Access denied. Wrong password!' })
    }

    res.json({ message: 'Access approved', userId: existUser.id })
  } catch (error) {
    res.status(500).json({ error })
  }
})
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    res.status(404).json(error)
  }
})

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate()
    console.log('Server create')
    console.log(`Server is listening: http://127.0.0.1:${PORT}`)
  } catch (error) {
    console.error(`Error: ${error}`)
  }
})
