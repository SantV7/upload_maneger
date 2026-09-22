import { Router } from 'express'

import { analizyDoc, analizyExclusiveDoc, deleteDoc, downloadDoc, updateDoc, sendDoc } from '../controllers/documentController.ts';

import { uploadMiddleware } from '../middlewares/authUpload.ts';
import { authUpdateDoc } from '../middlewares/authUpdateDoc.ts';


export const documentRouter = Router();

documentRouter.get('/documents', analizyDoc);
documentRouter.get('/documents/:id/download', downloadDoc);
documentRouter.get('/documents/:id', analizyExclusiveDoc);
documentRouter.post('/documents', uploadMiddleware.single('file'), sendDoc);
documentRouter.put("/documents/:id", authUpdateDoc,updateDoc);
documentRouter.delete('/documents/:id', deleteDoc);

