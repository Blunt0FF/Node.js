import express from 'express'
import 'dotenv/config'
import sequelize from './config/db.js'
import User from './models/User.js'
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3333
app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello, sequelize!'})
})

const createUser = async () => {
    try {
        const newUser = await User.create({
            name: 'John Snow',
            username: 'johnyboy228',
            email: 'jjalen@gmail.com'
        })
        console.log(newUser)
    } catch(error) {
        console.error('Error creating user: ', error)
    }
}
createUser()

const getAllUsers = async () => {
    try {
        const users = await User.findAll()
        console.log('All users: ', users)
    } catch(error) {
        console.error('Error fetching users: ', error)
    }
}

getAllUsers()

app.listen(PORT, async () => {
    try{
        await sequelize.authenticate() 
        console.log('Successfully connected to DB');
        console.log('Server is running on port:', PORT);
        
    } catch(error){
        console.error('Unable to connect to DB');
        
    }
})