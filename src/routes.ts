import { Router } from 'express';

import mustInformId from './middlewares/mustInformId';

const router = Router();

router.get('/status', (_req, res) => {
  res.json({ message: 'API is running!' });
});

router.get('/tasks', (_req, res) => {
  res.json({ message: 'List all tasks' });
});

router.get('./tasks/:id', (_req, res) => {
  res.json({ message: `List task ${_req.params.id}` });
});

router.post('/tasks', (_req, res) => {
  res.json({ message: 'Create a task' });
});

router.put('/tasks', mustInformId);
router.put('/tasks/:id', (_req, res) => {
  res.json({ message: `Update task ${_req.params.id}` });
});

router.delete('/tasks', mustInformId);
router.delete('/tasks/:id', (_req, res) => {
  res.json({ message: `Delete task ${_req.params.id}` });
});

export default router;
