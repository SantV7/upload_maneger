import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import { documentRouter } from './app/routes/document.routes.ts';
import { commentRouter } from './app/routes/comment.routes.ts';

export const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(documentRouter);
app.use(commentRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! Testing is running');
});