import type { Request, Response, NextFunction } from "express";
import { prisma } from "../../../prisma/usePrisma.ts";

export const authUpdateDoc = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "ID do documento não fornecido" });
        }

        const documentExists = await prisma.document.findUnique({
            where: { id: String(id) }
        });

        if (!documentExists) {
            return res.status(404).json({ error: "Documento não encontrado para atualização" });
        }

        return next();
    } catch (err) {
        console.log("ERRO NO AUTH UPDATE DOC:", err);
        return res.status(500).json({ error: "Erro interno na validação do documento" });
    }
};