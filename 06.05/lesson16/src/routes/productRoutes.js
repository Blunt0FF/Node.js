import express from 'express'
import { addProductItem } from '../controllers/productController.js'

const router = express.Router()

router.post('/', addProductItem)

export default router