import type { Request, Response } from "express";
import { prisma } from "../../../prisma/usePrisma.ts";


export const createComment = async (req: Request, res: Response) => {
    try {
        const { documentId } = req.params;
        
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: "O texto do comentário é obrigatório" });
        }

        const documentExists = await prisma.document.findUnique({
            where: { id: String(documentId) }
        });

        if (!documentExists) {
            return res.status(404).json({ error: "Documento não encontrado" });
        }

        const comment = await prisma.comment.create({
            data: {
                text,
                documentId: String(documentId)
            }
        });

        return res.status(201).json(comment);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar comentário" });
    }
};

export const listCommentsByDocument = async (req: Request, res: Response) => {
    try {
        const { documentId } = req.params;

        const comments = await prisma.comment.findMany({
            where: { documentId: String(documentId) },
            orderBy: { createdAt: "desc" }
        });

        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao listar comentários" });
    }
};