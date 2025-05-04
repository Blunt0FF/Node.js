import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Если нет title или content — возвращаем ошибку
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    // Создаем новый пост, добавляем userId, который получаем из аутентификации
    const post = new Post({
      title,
      content,
      user: req.userId, // Привязываем к пользователю
    });

    // Сохраняем пост в базе данных
    await post.save();

    res.status(201).json({ message: "Post created", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};