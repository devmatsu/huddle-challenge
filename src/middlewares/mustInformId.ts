import { Request, Response } from 'express';

const mustInformId = (req: Request, res: Response) => {
  res.status(405).json({ error: 'This method requires an ID in the route' });
};

export default mustInformId;
