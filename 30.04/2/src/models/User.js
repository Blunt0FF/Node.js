import mongoose from "mongoose";

// Создать схему и модель пользователя (User)
// Создайте схему `User`, включающую поля `name` (строка, обязательное), `email` (строка, обязательное, уникальное), и `password` (строка, обязательное).
// Создайте модель `User` на основе этой схемы.

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
});

const User = mongoose.model("User", userSchema);
export default User;