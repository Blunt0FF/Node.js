import bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' })
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      posts: [],
    })
    res.status(201).json({ message: 'User registered', user: user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required' })
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }
    const checkPass = await bcrypt.compare(password, user.password)
    if (!checkPass) {
      return res.status(400).json({ error: 'Invalid password' })
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
    res.status(200).json({ message: 'Login successfully', token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
