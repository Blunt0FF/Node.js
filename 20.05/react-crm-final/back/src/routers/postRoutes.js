import express from "express";
import { createPost, deletePost } from "../controllers/postController.js";
import { authenticate } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.post("/", authenticate, createPost);
router.delete("/:id", authenticate, deletePost);

export default router;