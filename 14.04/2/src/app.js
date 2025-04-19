import express from 'express'
import sequelize from './config/db.js'
import User from './models/User.js'
// import Product from './models/Product.js'
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3333
app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello, sequelize!'})
})


// const createProduct = async () =>{
//   try {
//     const newProduct = await Product.create({
//         name: 'Snow',
//         price: 339,
//         description: 'Sehr gut Snee',
//     })
//     console.log(newProduct)
// } catch(error) {
//     console.error('Error creating product: ', error)
// }
// }

// const createUser = async () => {
//     try {
//         const newUser = await User.create({
//             name: 'John Snow',
//             age: 228,
//             username: 'johnyboy228',
//             email: 'jjalen@gmail.com'
//         })
//         console.log(newUser)
//     } catch(error) {
//         console.error('Error creating user: ', error)
//     }
// }

// const getAllUsers = async () => {
//     try {
//         const users = await User.findAll()
//         console.log('All users: ', users)
//     } catch(error) {
//         console.error('Error fetching users: ', error)
//     }
// }
// const getAllProducts = async () => {
//     try {
//         const products = await Product.findAll()
//         console.log('All products: ', products)
//     } catch(error) {
//         console.error('Error fetching products: ', error)
//     }
// }

app.post('/users', async (req, res) => {
   try {
    const {name, age, username, email} = req.body
    const newUser = await User.create({
      name, age, username, email
    })
    res.status(201).json({message: 'User was successfully created', newUser})
   } catch(error) {
    console.error('Error: ', error);
    res.status(500).json({error: 'Error creating user', errorDesc: error})
   }
})

app.get('/users', async (req, res) => {
  try {
    const allUsers = await User.findAll()
    res.status(200).json({message: 'All users are here', allUsers})
  } catch (error) {
    console.error('Error receiving users: ', error)
    res.status(500).json({error: 'Error receiving users', errorDesc: error})
  }
})


app.listen(PORT, async () => {
    try{
        await sequelize.authenticate() 
        // createUser()
        // createProduct()

        // getAllUsers()
        // getAllProduct()
        console.log('Successfully connected to DB');
        console.log('Server is running on port:', PORT);
        
    } catch(error){
        console.error('Unable to connect to DB');
        
    }
})