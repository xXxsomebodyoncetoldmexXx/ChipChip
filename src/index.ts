import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import debug from 'debug';
import { CommonRoutes } from './routes/commonRoutes';
import HomeRoute from './routes/home';
import ChipRoute from './routes/chips';
import { Database } from 'sqlite3';
import initDatabase from './db/dbDAO';
import { nanoid } from 'nanoid';

// Enviroment variable
dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 8000;
const debugLog: debug.IDebugger = debug('app:index');
const routes: Array<CommonRoutes> = [];

// 3rd middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes list
routes.push(new HomeRoute(app, '/'));
routes.push(new ChipRoute(app, '/api/chips'));

// Database
const db: Database = initDatabase('db.sqlite');
// db.run(`insert into users(id, name) values ('${nanoid(48)}', 'steve')`);

// start server
app.listen(PORT, () =>
  debugLog(`Server is running at http://localhost:${PORT}`)
);
