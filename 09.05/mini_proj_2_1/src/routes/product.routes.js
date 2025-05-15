//это маршруты запросов

import express from 'express';
import {addProduct} from '../controllers/product.controller.js'

const router = express.Router();

router.post('/products', addProduct);

export default router;