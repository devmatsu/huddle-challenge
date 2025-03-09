import { Router } from 'express';

import TaskController from './controllers/TaskController';

import mustInformId from './middlewares/mustInformId';
import validateTask from './middlewares/validateTask';

const router = Router();

router.get('/status', (_req, res) => {
  res.json({ message: 'API is running!' });
});

router.get('/tasks', TaskController.list);
router.get('/tasks/:id', TaskController.get);

router.post('/tasks', validateTask, TaskController.create);

router.put('/tasks', mustInformId);
router.put('/tasks/:id', validateTask, TaskController.update);

router.delete('/tasks', mustInformId);
router.delete('/tasks/:id', TaskController.delete);

export default router;
