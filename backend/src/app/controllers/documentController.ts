import type { Request, Response } from "express";
import { prisma } from "../../../prisma/usePrisma.ts";

export const analizyDoc = async (req: Request, res: Response) => {
    try {
        const documents = await prisma.document.findMany();
        
        return res.status(200).json(documents);
    } catch (err) {
        console.log("ERRO AO LISTAR:", err);
        return res.status(500).json({ error: "Erro ao listar documentos" });
    }
};

export const analizyExclusiveDoc = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const document = await prisma.document.findUnique({
            where: { id: String(id) }
        });

        if (!document) {
            return res.status(404).json({ error: "Documento não encontrado" });
        }

        return res.status(200).json(document);
    } catch (err) {
        console.log("ERRO DE BUSCA:", err);
        return res.status(500).json({ error: "Erro ao buscar documento" });
    }
};

export const sendDoc = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "Nenhum arquivo enviado" });
        }

        const newDocument = await prisma.document.create({
            data: {
                title,
                description,
                filePath: file.path,
                mimeType: file.mimetype
            }
        });

        return res.status(201).json(newDocument);
    } catch (err) {
        console.log("ERRO DE UPLOAD:", err);
        return res.status(500).json({ error: "Erro ao salvar o documento" });
    }
};

export const deleteDoc = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        await prisma.document.delete({
            where: { id: String(id) }
        });

        return res.status(204).send();
    } catch (err) {
        console.log("ERRO AO DELETAR:", err);
        return res.status(500).json({ error: "Erro ao deletar documento" });
    }
};