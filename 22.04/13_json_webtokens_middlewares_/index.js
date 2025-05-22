import express from "express"
import "dotenv/config"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

const users = [
    {
        id: '1',
        email: 'test@test.com',
        password: await bcrypt.hash('qwerty123', 10)
    }
]

app.get("/", (req, res) => {
    res.send("Hello World!")
})



app.post('/login', async (req, res) => {
    const {email, password} = req.body
    try {
        const user = users.find(item => item.email == email)
        if(!user) res.status(404).json({error: "User not found"})

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch) res.status(401).json({error: "Password is incorrect"})

        const token = jwt.sign(
            {userId: user.id, email: user.email}, 
            process.env.JWT_SECRET, 
            {expiresIn: '1h'}
        )
        res.json({token})
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({error: "Error logging", errorDesc: error})
    }
})

app.listen(PORT, () => {
    try {
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error("Error starting server:", error)
    }
})