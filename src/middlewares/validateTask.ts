import { Request, Response, NextFunction } from 'express';

const validateTask = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title } = req.body;

  if (!title || typeof title !== 'string') {
    res
      .status(400)
      .json({ message: 'Title is mandatory and must be a string' });

    return;
  }

  next();
};

export default validateTask;
