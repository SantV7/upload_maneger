import express, { type Express, type Request, type Response } from 'express';
import { documentRouter } from './app/routes/document.routes.ts';

export const app: Express = express();

app.use(express.json())
app.use(documentRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! Testing is running');
});