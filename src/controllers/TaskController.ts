import { Request, Response } from 'express';
import prisma from '../config/database';

class TaskController {
  static async list(_req: Request, res: Response) {
    try {
      const tasks = await prisma.task.findMany();
      res.json(tasks);
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: 'Error listing tasks', error: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  }

  static async get(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const task = await prisma.task.findUnique({ where: { id: Number(id) } });
      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.json(task);
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: 'Error retrieving task', error: error.message });
      }
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { title, description } = req.body;
      if (!title) {
        res.status(400).json({ message: 'title is mandatory' });
        return;
      }

      const task = await prisma.task.create({ data: { title, description } });
      res.status(201).json(task);
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: 'Error creating task', error: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, completed } = req.body;

      const task = await prisma.task.findUnique({
        where: { id: Number(id) },
      });

      if (!task) {
        res.status(404).json({ message: `Task with ID ${id} does not exist.` });
        return;
      }

      const updatedTask = await prisma.task.update({
        where: { id: Number(id) },
        data: { title, description, completed },
      });
      res.json(updatedTask);
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: 'Error updating task', error: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const task = await prisma.task.findUnique({
        where: { id: Number(id) },
      });

      if (!task) {
        res.status(404).json({ message: `Task with ID ${id} does not exist.` });
        return;
      }

      await prisma.task.delete({ where: { id: Number(id) } });
      res.json({ message: `Task ${id} deleted successfully` });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: 'Error deleting task', error: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  }
}

export default TaskController;
