import { Router } from 'express'

import { analizyDoc, analizyExclusiveDoc, deleteDoc, sendDoc } from '../controllers/documentController.ts';

import { authAnalizyDoc, authAnalizyExclusiveDoc, authDeleteDoc, authSendDoc } from '../middlewares/authDocument.ts';
import { uploadMiddleware } from '../middlewares/authUpload.ts';


export const documentRouter = Router();

documentRouter.get('/documents', authAnalizyDoc, analizyDoc);

documentRouter.get('/documents/:id', authAnalizyExclusiveDoc, analizyExclusiveDoc);

documentRouter.post('/documents', uploadMiddleware.single('file'), authSendDoc, sendDoc);

documentRouter.delete('/documents/:id', authDeleteDoc, deleteDoc);

