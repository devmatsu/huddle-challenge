import { Request, Response } from 'express';

class TaskController {
  static async list(_req: Request, res: Response) {
    res.json({ message: 'List all tasks' });
  }

  static async get(req: Request, res: Response) {
    res.json({ message: `List task ${req.params.id}` });
  }

  static async create(_req: Request, res: Response) {
    res.json({ message: 'Create a task' });
  }

  static async update(req: Request, res: Response) {
    res.json({ message: `Update task ${req.params.id}` });
  }

  static async delete(req: Request, res: Response) {
    res.json({ message: `Delete task ${req.params.id}` });
  }
}

export default TaskController;
