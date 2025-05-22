// Создать схему и модель пользователя (User)

// Создайте схему `User`, включающую поля `name` (строка, обязательное), `email` (строка, обязательное, уникальное), и `password` (строка, обязательное).
// Создайте модель `User` на основе этой схемы.

// Создать документ пользователя (User)

// Создайте новый документ пользователя, например, с именем "Charlie", email "charlie@example.com" и паролем "supersecret".
// Попробуйте сохранить этот документ в базу данных, используя модель `User`.
// Убедитесь, что данные проходят валидацию и пользователь успешно сохраняется.

import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import User from "../src/models/User.js";
import Post from "./models/Post.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3003;

connectDB();

const newUser = new User({
  name: "Charlie",
  email: "charlie@example.com",
  password: "supersecret",
});
const newPost = new Post({
  title: "My first post",
  content: "This is the content of my first post",
  author: newUser._id,
})
try {
 
  // await newUser.save();
  // console.log("User was created");
  // await newPost.save();
  // console.log("Post was created", newPost);

  //   Найдите пользователя по его уникальному идентификатору (`_id`). Обновите его email на новый.
  // Используйте метод `findByIdAndUpdate()`, установите опцию `runValidators: true`, чтобы убедиться, что новые данные проходят валидацию.

  // const updatedUser = await User.findByIdAndUpdate("6811df89be079b7b5e65198c", {
  //   email: "qwer@ty.net"
  // }
  // , { new: true, runValidators: true });
  // if(!updatedUser) {
  //   console.log("User not found");

// Используйте метод `findByIdAndDelete()`, чтобы найти пользователя по его уникальному идентификатору (`_id`) и удалить его.
// Проверьте, что удаленный пользователь больше не существует в базе данных, выполнив соответствующий запрос на чтение
const deletedUser = await User.findByIdAndDelete("68109161b1096d5cd291d9d6");
  if (!deletedUser) {
    console.log("User not found");
  } else {
    // console.log("Updated user:", updatedUser);
    console.log("Deleted user:", deletedUser);
    
  }
} catch (error) {
  console.error(error);
}
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Используйте метод `User.find({})`, чтобы найти всех пользователей.
// Отсортируйте пользователей по имени в алфавитном порядке.

// Попробуйте популировать данные о постах, связанных с каждым пользователем
// Используйте метод `Post.find({}).populate('author')`, чтобы получить все посты с информацией о пользователях, которые их создали.

const users = await User.find().sort({ name: 1 });
console.log("Users:", users);

const posts = await Post.find().sort({ createdAt: -1 }).populate("author", "name");
console.log("Posts:", posts);

