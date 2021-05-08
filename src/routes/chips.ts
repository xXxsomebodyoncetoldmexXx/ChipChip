import { CommonRoutes } from './commonRoutes';
import { Application, Router, Request, Response } from 'express';

import debug from 'debug';

const debugLog: debug.IDebugger = debug('app:chips');

export default class ChipRoute extends CommonRoutes {
  constructor(app: Application, path: string) {
    super('ChipRoute', path);
    app.use(this.path, this.configureRoute());
  }

  configureRoute() {
    this.route.get('/', (req: Request, res: Response) => {
      res.send('Show chips');
    });

    this.route.post('/', (req: Request, res: Response) => {
      debugLog(req.body);
      // res.send(validateInput(req.body));
    });

    return this.route;
  }
}
