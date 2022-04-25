import { NextFunction, Request, Response } from 'express';
import { TBodyValidator } from '../types';

type TErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

type TValidateBody = (
  bodyValidator: TBodyValidator
) => (req: Request, res: Response, next: NextFunction) => Response | void;

type TValidatePathId = (
  req: Request,
  res: Response,
  next: NextFunction
) => Response | void;

export interface Middlewares {
  errorHandler: TErrorHandler;
  validateBody: TValidateBody;
  validatePathId: TValidatePathId;
}
