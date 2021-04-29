import { CommonRoutes } from '../common/commonRoutes';
import { Application, Router, Request, Response } from 'express';
import Joi, { Schema } from 'joi';
import { ConsoleTransportOptions } from 'winston/lib/winston/transports';
import debug from 'debug';

const validateInput = (
  body: Request['body']
): ReturnType<Schema['validate']> => {
  const Svalid: Schema = Joi.object({
    author: Joi.string().min(3).max(100).alphanum().required(),
    content: Joi.string().max(300).required(),
  });

  return Svalid.validate(body);
};

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
      res.send(validateInput(req.body));
    });

    return this.route;
  }
}
