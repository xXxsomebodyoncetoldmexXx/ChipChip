import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import debug from 'debug';

dotenv.config();

const app: Application = express();
const port: number = Number(process.env.PORT) || 8000;
const debugLog: debug.IDebugger = debug('app');

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

app.listen(port);
