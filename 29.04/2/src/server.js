import express from "express";
import "dotenv/config";
import connectDb from "./config/db.js";
import userRoutes from "./routers/userRoutes.js";
import { authenticate } from "./middleware/authMiddleWare.js"; 
import groupRoutes from "./routers/groupRoutes.js";
import postRoutes from "./routers/postRoutes.js";
import Post from "./models/Post.js"


const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/groups", authenticate, groupRoutes);
app.use("/posts", authenticate, postRoutes); 

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Home page" });
});


app.get("/posts", async (req, res) => {
  try {
    // Получаем все посты и заполняем информацию о пользователе
    const posts = await Post.find().populate("user", "name email");
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error:", error); // Выводим ошибку в консоль
    res.status(500).json({ error: "Server error" });
  }
});


app.listen(PORT, async () => {
  try {
    await connectDb();
    console.log(`server is listening on port: ${PORT}`);
  } catch (error) {
    console.log("server doesn't work");
  }
});