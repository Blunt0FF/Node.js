import express from "express"
import 'dotenv/config'
import connectDb from "./config/db.js"
import productRoutes from './routes/prouctRoutes.js'



const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3333

app.get('/', (req,res) => {
    res.send('hello world')
})

app.use('/api/products', productRoutes)

connectDb()
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})

