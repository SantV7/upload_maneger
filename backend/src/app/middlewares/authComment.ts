import type { Request, Response, NextFunction } from "express";

export const validateComment = (req: Request, res: Response, next: NextFunction) => {
    const { text } = req.body;

    if (!text || text.trim() === "") {
        return res.status(400).json({ error: "O campo de comentário não pode estar vazio" });
    }

    next();
};