import express, { Application, Router } from 'express';

export abstract class CommonRoutes {
  route: Router;
  name: string;
  path: string;

  constructor(name: string, uri: string) {
    this.route = express.Router();
    this.name = name;
    this.path = uri;
  }

  getName(): string {
    return this.name;
  }

  getPath(): string {
    return this.path;
  }

  abstract configureRoute(): void;
}
