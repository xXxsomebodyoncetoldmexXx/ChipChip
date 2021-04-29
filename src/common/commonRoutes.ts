import express, { Application, Router } from 'express';

export abstract class CommonRoutes {
  route: Router;
  name: string;
  path: string;

  constructor(name: string, path: string) {
    this.route = express.Router();
    this.name = name;
    this.path = path;
  }

  getName(): string {
    return this.name;
  }

  getPath(): string {
    return this.path;
  }

  abstract configureRoute(): Router;
}
