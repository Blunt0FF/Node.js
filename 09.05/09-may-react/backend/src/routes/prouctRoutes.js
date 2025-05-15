import express from 'express'
import { addProductItem, deleteProduct, getAllProduct, updateProductById } from '../controllers/productController.js';

const router = express.Router()

router.post('/',addProductItem)
router.get('/',getAllProduct)
router.delete('/:id', deleteProduct)
router.put('/:id', updateProductById )


export default  router;