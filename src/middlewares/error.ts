import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  e: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error(e);

  res.status(500)
    .json({ message: 'Something went wrong here, please try again later' });

  next(e);
};

export const againstDefaultExport = '';