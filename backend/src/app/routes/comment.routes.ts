import { Router } from "express";
import { validateComment } from "../middlewares/authComment.ts";
import { createComment, listCommentsByDocument } from "../controllers/commentController.ts";

export const commentRouter = Router();

commentRouter.post("/document/:documentId/comment", validateComment, createComment);

commentRouter.get("/document/:documentId/comment", listCommentsByDocument);
