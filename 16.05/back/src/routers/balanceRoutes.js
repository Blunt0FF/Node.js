import express from 'express'
import { setBalance, getTransactions, deleteTransaction} from '../controllers/setBalance.js'

const router = express.Router()

router.post('/set-balance', setBalance)
router.get('/transactions', getTransactions);
router.delete('/transactions/:id', deleteTransaction);

export default router
