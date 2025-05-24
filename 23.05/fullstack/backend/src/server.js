import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import postRoutes from './routes/postRoute.js'
import userRoutes from './routes/userRoute.js'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth', userRoutes)
app.use('/api/user', postRoutes)
const port = process.env.PORT || 3000
const uri = process.env.MONGO_URI

app.get('/', (req, res) => {
  res.json({ message: 'Hello world' })
})

mongoose
  .connect(uri, {})
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error', err))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
