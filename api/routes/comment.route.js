import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createComment,
  getpostComments,
  likeComment,
  editComment,
  deleteComment,
  getPostComments,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getPostComments/:postId", verifyToken, getpostComments);
router.put("/likeComment/:commentId", verifyToken, likeComment);
router.put("/editComment/:commentId", verifyToken, editComment);
router.delete("/deleteComment/:commentId", verifyToken, deleteComment);
router.get("/getComments", verifyToken,getPostComments);

export default router;
