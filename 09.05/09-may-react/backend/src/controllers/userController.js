import User from "../models/User.js";


export const userRegister = async (req,res) => {
    try{
const {name, email,password} = req.body
if(!name || !email || !password){
    res.status(400).json({error: 'all fields are required'})
}
const hashPassword = await bcrypt.hash(password,10)
const user = await User.create({name,email,password: hashPassword})

res.status(201).json({message : 'User is successfully created' , user})
    }catch(error) {
        console.error(error);
        res.status(500).json({error: error.message})
    }
}
