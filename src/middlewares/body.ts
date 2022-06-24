import { NextFunction, Request, Response } from 'express';
import { TBodyValidator } from '../types';

export const validateBody = (bodyValidator: TBodyValidator) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = bodyValidator(req.body);

    if (error) {
      const [code, message] = error.message.split('|');

      if (!message) return next(error);

      return res.status(+code).json({ message });
    }

    req.body = value;

    return next();
  };

export const againstDefaultExport2 = '';