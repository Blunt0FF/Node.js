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
import User from "./models/User.js";
import Post from "./models/Post.js";
import Comment from "./models/Comment.js";
import Like from "./models/Like.js";
import Group from "./models/Group.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3003;

connectDB();

async function main() {
  try {
    // Создание нового пользователя
    const newUser = new User({
      name: "Charlie",
      email: "chupp@lean.com",
      password: "supersecret",
    });
    await newUser.save();
    console.log("User was created:", newUser);

    // Создать пост
    const newPost = new Post({
      title: "My first post",
      content: "This is the content of my first post",
      author: newUser._id,
    });
    await newPost.save();
    console.log("Post was created:", newPost);

    // Добавить комментарий
    const comment = new Comment({
      content: "Nice post!",
      post: newPost._id,
      author: newUser._id,
    });
    await comment.save();
    console.log("Comment added:", comment);

    // Лайк поста
    const like = new Like({
      user: newUser._id,
      post: newPost._id,
    });
    await like.save();
    console.log("Post liked:", like);

    // Создать группу
    const group = new Group({
      name: "Developers",
      members: [newUser._id],
    });
    await group.save();
    console.log("Group created:", group);

    // Найдите пользователя по его уникальному идентификатору (`_id`). Обновите его email на новый.
    // Используйте метод `findByIdAndUpdate()`, установите опцию `runValidators: true`, чтобы убедиться, что новые данные проходят валидацию.

    const updatedUser = await User.findByIdAndUpdate(
      newUser._id,
      { email: "charlie.new@example.com" },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      console.log("User not found");
    } else {
      console.log("Updated user:", updatedUser);
    }

    // Используйте метод `findByIdAndDelete()`, чтобы найти пользователя по его уникальному идентификатору (`_id`) и удалить его.
    // const deletedUser = await User.findByIdAndDelete(newUser._id);
    // if (!deletedUser) {
    //   console.log("User not found");
    // } else {
    //   console.log("Deleted user:", deletedUser);
    // }

    // Используйте метод `User.find({})`, чтобы найти всех пользователей.
    // Отсортируйте пользователей по имени в алфавитном порядке.

    const users = await User.find().sort({ name: 1 });
    console.log("Users:", users);

    // Попробуйте популировать данные о постах, связанных с каждым пользователем
    // Используйте метод `Post.find({}).populate('author')`, чтобы получить все посты с информацией о пользователях, которые их создали.

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "name");
    console.log("Posts:", posts);

  } catch (error) {
    console.error("Error occurred:", error);
  }
}

main();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});