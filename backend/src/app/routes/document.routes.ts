import { Router } from 'express'

import { analizyDoc, analizyExclusiveDoc, deleteDoc, sendDoc } from '../controllers/documentController.ts';

import { authAnalizyDoc, authAnalizyExclusiveDoc, authDeleteDoc, authSendDoc } from '../middlewares/authDocument.ts';
import { uploadMiddleware } from '../middlewares/authUpload.ts';


export const documentRouter = Router();

documentRouter.get('/document', authAnalizyDoc, analizyDoc);

documentRouter.get('/document/:id', authAnalizyExclusiveDoc, analizyExclusiveDoc);

documentRouter.post('/document', authSendDoc, uploadMiddleware.single('file'),sendDoc);

documentRouter.delete('/document/:id', authDeleteDoc, deleteDoc);

