import { NextFunction, Request, Response } from 'express';

export const validatePathId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.params.id.length !== 24) {
    return res.status(400)
      .json({ error: 'Id must have 24 hexadecimal characters' });
  }

  return next();
};

export const againstDefaultExport3 = '';