import express, { type ErrorRequestHandler, type Express, type Request, type Response } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { documentRouter } from './app/routes/document.routes.ts';
import { commentRouter } from './app/routes/comment.routes.ts';

export const app: Express = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));
app.use(documentRouter);
app.use(commentRouter);

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'O arquivo deve ter no máximo 10 MB.' });
  }

  if (error.message === 'Formato inválido. Envie um arquivo PDF, JPG ou PNG.') {
    return res.status(400).json({ error: error.message });
  }

  console.error(error);
  return res.status(500).json({ error: 'Erro interno do servidor.' });
};

app.use(errorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! Testing is running');
});
