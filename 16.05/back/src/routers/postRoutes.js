import express from "express";
import { createPost } from "../controllers/postController.js";
import { authenticate } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.post("/", authenticate, createPost);

export default router;