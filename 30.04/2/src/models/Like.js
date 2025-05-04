import mongoose from "mongoose";

// Лайк принадлежит пользователю и посту

const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
}, { timestamps: true });

const Like = mongoose.model("Like", likeSchema);
export default Like;