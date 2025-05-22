import express from "express";
import bcrypt from "bcrypt";
import User from "./models/user.js";
import sequelize from "./config/db.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.post("/register", async (req, res) => {
  const { email, username, name, password, age } = req.body;
  try {
    if (!email || !username || !name || !password) {
      return res.status(400).json({ message: "Submit email, username, name, and password" });
    }

    const existingUser = await User.findOne({ where: { email } });
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUser || existingUsername) {
      return res.status(400).json({ message: "Email or username already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      username,
      name,
      password: hashPassword,
      age
    });

    res.status(201).json({ message: "User was successfully created", newUser });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to the DB");
    console.log("Server is running on port: " + PORT);
  } catch (error) {
    console.error("unable to connect to the db: ", error);
  }
});