import type { Request, Response } from "express";
import fs from 'fs';
import path from 'path';
import { prisma } from "../../../prisma/usePrisma.ts";

export const analizyDoc = async (req: Request, res: Response) => {
    try {
        const documents = await prisma.document.findMany({
            include: {
                comments: {
                    orderBy: { createdAt: "desc" }
                }
            }
        });
        
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
            where: { id: String(id) },
            include: {
                comments: {
                    orderBy: { createdAt: "desc" }
                }
            }
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

        if (!title || !String(title).trim()) {
            return res.status(400).json({ error: "O título do documento é obrigatório" });
        }

        if (!file) {
            return res.status(400).json({ error: "Nenhum arquivo enviado" });
        }

        const newDocument = await prisma.document.create({
            data: {
                title: String(title).trim(),
                description: description?.trim() || null,
                filePath: file.filename,
                mimeType: file.mimetype
            }
        });

        return res.status(201).json(newDocument);
    } catch (err) {
        console.log("ERRO DE UPLOAD:", err);
        return res.status(500).json({ error: "Erro ao salvar o documento" });
    }
};

export const updateDoc = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const documentExists = await prisma.document.findUnique({
      where: { id: String(id) },
    });

    if (!documentExists) {
      return res.status(404).json({ error: "Documento não encontrado" });
    }

    const updatedDocument = await prisma.document.update({
      where: { id: String(id) },
      data: {
        title,
        description,
      },
    });

    return res.status(200).json(updatedDocument);
  } catch (err) {
    console.log("ERRO AO ATUALIZAR:", err);
    return res.status(500).json({ error: "Erro ao atualizar documento" });
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

export const downloadDoc = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const document = await prisma.document.findUnique({ where: { id: String(id) } });

        if (!document) {
            return res.status(404).json({ error: "Documento não encontrado" });
        }

        const fileName = path.basename(document.filePath);
        const filePath = path.resolve(process.cwd(), 'uploads', fileName);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: "Arquivo não encontrado no servidor" });
        }

        return res.download(filePath, fileName);
    } catch (err) {
        console.log("ERRO AO BAIXAR:", err);
        return res.status(500).json({ error: "Erro ao baixar documento" });
    }
};
