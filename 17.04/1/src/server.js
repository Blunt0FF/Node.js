import express from 'express'
import bcrypt from 'bcrypt'
const app = express()
app.use(express.json())
const users = []
app.use((req, res, next) => {
    req.user = {id: 1}
    next()
})

app.get('/', (req, res) => {
    res.send('hello bcrypt!')
})


app.get('/profile/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10)
    if(req.user.id !== userId) {
        res.status(403).json({error: 'Access denied'})
        return
    }
    const user = users.find(item => item.id === userId)
    if(!user) {
        res.status(404).json('User was not found')
    }

    res.status(200)
        .json({
            username: user.username,
            email: user.email,
            name: user.name
        })
})

app.put('profile/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10)

    if(req.user.id !== userId) {
        res.status(403).json({error: 'Access denied'})
        return
    }

    const user = users.find(item => item.id === userId)

    if(!user) {
        res.status(404).json({error: 'User was not found'})
        return
    }

    const {email, name} =req.body

    if(!email && !name) {
        res.status(400).json({error: 'At least one param should be specified'})
    }

    if(email) user.email = email
    if(name) user.name = name

    res.send({message: 'Profile was updated'})
})

app.post('/register', async (req, res) => {
    try {
        const {username, name, password} = req.body
        if(!username || !password) {
            res.status(400).json({error: 'all fields are required'})
            return
        }
        //число отвечающее за сложность хеширование
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        users.push({id: users.length + 1,username,name, password: hashedPassword})
        res.status(201).json({message: 'User was successfully created', users})
    } catch(error) {
        console.error('Error creating user: '+ error)
        res.status(500).json({error})
    }
})

app.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body

        const user = users.find(item => item.username === username)
        if(!user) {
            res.status(400).json({error: 'user was not found'})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) {
            return res.status(400).json({error: 'incorrect password'})
        }

        res.status(200).json({message: 'Successfully logged in'})
    } catch(error) {
        res.status(500).json({error})
    }
})

app.listen(3000, () => {
    console.log('server is listening on port http://localhost:'+3000)
})