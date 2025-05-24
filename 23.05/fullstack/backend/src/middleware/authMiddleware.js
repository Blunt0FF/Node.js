import 'dotenv/config'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET // Replace with your actual secret key

export const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization']
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    console.log(decoded)

    req.user = decoded
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Error' })
  }
}
