import mongoose from "mongoose";

// Модель поста с автором, комментариями и лайками

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
export default Post;