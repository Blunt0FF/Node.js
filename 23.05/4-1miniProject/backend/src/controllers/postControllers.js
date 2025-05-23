import 'dotenv/config'
import { Post } from '../models/Post.js'

const addPost = async (req, res) => {
  try {
    const { title, description } = req.body
    if (!title || !description) {
      return res.status(400).json({ error: "haven't all req data" })
    }
    const newPost = await Post.create({
      title,
      description,
      author: req.user.userId,
    })
    console.log(req.user)
    res.status(201).json({ message: 'Post was created', newPost })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const getPosts = async (req, res) => {
  try {
    const userPosts = await Post.find()
    if (!userPosts) {
      return res.status(404).json({ error: 'Posts not found' })
    }
    res.status(200).json({ message: 'Post found', userPosts })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Post was deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export { addPost, deletePost, getPosts }
