import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import debug from 'debug';
import sqlite3 from 'sqlite3';
import { CommonRoutes } from './common/commonRoutes';
import { HomeRoute } from './routes/home';

// Enviroment variable
dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 8000;
const debugLog: debug.IDebugger = debug('app:index');
const routes: Array<CommonRoutes> = [];

// 3rd middleware
app.use(express.json());
app.use(cors());

// routes list
routes.push(new HomeRoute(app, '/'));

// start server
app.listen(PORT, () =>
  debugLog(`Server is running at http://localhost:${PORT}`)
);
