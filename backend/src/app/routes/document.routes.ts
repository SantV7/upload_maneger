import { Router } from 'express'

import { analizyDoc, analizyExclusiveDoc, deleteDoc, sendDoc } from '../controllers/documentController.ts';

import { authAnalizyDoc, authAnalizySelectDoc, authDeleteDoc, authSendDoc } from '../middlewares/authDocument.ts';
import { uploadMiddleware } from '../middlewares/authUpload.ts';
authAnalizySelectDoc

export const documentRouter = Router();

documentRouter.get('/document', authAnalizyDoc, analizyDoc);

documentRouter.get('/document/:id', authAnalizySelectDoc, analizyExclusiveDoc);

documentRouter.post('/document', authSendDoc, uploadMiddleware.single('file'),sendDoc);

documentRouter.delete('/document/:id', authDeleteDoc, deleteDoc);

