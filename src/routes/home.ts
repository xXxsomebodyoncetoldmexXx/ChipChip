import { CommonRoutes } from '../common/commonRoutes';
import { Application, Request, Response } from 'express';

export class HomeRoute extends CommonRoutes {
  constructor(app: Application, path: string) {
    super('HomeRoute', path);
    this.configureRoute();
    app.use(this.path, this.route);
  }

  configureRoute(): void {
    this.route.get('/', (req: Request, res: Response) => {
      res.send('<h1>Chíp Chíp Home Page</h1>');
    });
  }
}
