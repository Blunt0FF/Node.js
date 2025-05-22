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
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId; // из middleware

    console.log('Attempting to delete post:', postId);
    console.log('Authenticated user:', userId);

    const post = await Post.findById(postId);
    console.log('Post found:', post);

    if (!post) return res.status(404).json({ error: "Post not found" });
    // Log types and values for debugging
    console.log('Post user type:', typeof post.user, 'value:', post.user.toString());
    console.log('Request userId type:', typeof userId, 'value:', userId.toString());
    if (post.user.toString() !== userId.toString())
      return res.status(403).json({ error: "Access denied" });

    const deletionResult = await post.deleteOne();
    console.log('Deletion result:', deletionResult);
    res.json({ message: "Post deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Server error" });
  }
};