import { CommonRoutes } from './commonRoutes';
import { Application, Request, Response, Router } from 'express';

export default class HomeRoute extends CommonRoutes {
  constructor(app: Application, path: string) {
    super('HomeRoute', path);
    app.use(this.path, this.configureRoute());
  }

  configureRoute() {
    this.route.get('/', (req: Request, res: Response) => {
      res.send('<h1>Chíp Chíp Home Page</h1>');
    });

    return this.route;
  }
}
