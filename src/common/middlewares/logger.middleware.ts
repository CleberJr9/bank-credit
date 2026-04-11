import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class loggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers['authorization'];

    if (auth) {
      req['user'] = {
        token: auth,
      };
    }
    next();
  }
}
