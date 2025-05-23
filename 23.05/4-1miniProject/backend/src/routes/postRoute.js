import express from 'express'
import {
  addPost,
  deletePost,
  getPosts,
} from '../controllers/postControllers.js'
import { authenticate } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/getPosts', authenticate, getPosts)
router.post('/addPost', authenticate, addPost)
router.delete('/deletePost/:id', authenticate, deletePost)

export default router
