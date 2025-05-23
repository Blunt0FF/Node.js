import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        rel: 'User'
    }
})

const Post = mongoose.model('Post', postSchema);

export default Post;