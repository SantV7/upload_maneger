import { Router } from "express";
import { validateComment } from "../middlewares/authComment.ts";
import { createComment, listCommentsByDocument } from "../controllers/commentController.ts";

export const commentRouter = Router();

commentRouter.post("/documents/:documentId/comments", validateComment, createComment);

commentRouter.get("/documents/:documentId/comments", listCommentsByDocument);
