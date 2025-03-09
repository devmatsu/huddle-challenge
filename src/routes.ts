import { Router } from 'express';

import TaskController from './controllers/TaskController';
import mustInformId from './middlewares/mustInformId';

const router = Router();

router.get('/status', (_req, res) => {
  res.json({ message: 'API is running!' });
});

router.get('/tasks', TaskController.list);
router.get('/tasks/:id', TaskController.get);

router.post('/tasks', TaskController.create);

router.put('/tasks', mustInformId);
router.put('/tasks/:id', TaskController.update);

router.delete('/tasks', mustInformId);
router.delete('/tasks/:id', TaskController.delete);

export default router;
