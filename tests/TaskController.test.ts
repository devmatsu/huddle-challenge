import request from 'supertest';
import server from '../src/server';
import prisma, { resetDatabase } from './utils/prismaTestClient';

beforeAll(async () => {
  resetDatabase();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Task API Endpoints', () => {
  let taskId: number;

  it('should return API status', async () => {
    const response = await request(server.app).get('/api/status');
    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('message', 'API is running!');
  });

  it('should create a task', async () => {
    const response = await request(server.app)
      .post('/api/tasks')
      .send({ title: 'Test Task', description: 'Testing task creation' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Test Task');

    taskId = response.body.id;
  });

  it('should return 400 if title is missing', async () => {
    const response = await request(server.app)
      .post('/api/tasks')
      .send({ description: 'Missing title' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'Title is mandatory and must be a string'
    );
  });

  it('should return a list of tasks', async () => {
    const response = await request(server.app).get('/api/tasks');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should return a specific task', async () => {
    const response = await request(server.app).get(`/api/tasks/${taskId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', taskId);
    expect(response.body).toHaveProperty('title', 'Test Task');
  });

  it('should return 404 if task does not exist', async () => {
    const response = await request(server.app).get('/api/tasks/99999');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Task not found');
  });

  it('should update a task', async () => {
    const response = await request(server.app)
      .put(`/api/tasks/${taskId}`)
      .send({ title: 'Updated Task', completed: true });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', 'Updated Task');
    expect(response.body.completed).toBe(true);
  });

  it('should return 404 if updating non-existent task', async () => {
    const response = await request(server.app)
      .put('/api/tasks/99999')
      .send({ title: 'Does not exist' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Task with ID 99999 does not exist.');
  });

  it('should delete a task', async () => {
    const response = await request(server.app).delete(`/api/tasks/${taskId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      'message',
      `Task ${taskId} deleted successfully`
    );
  });

  it('should return 404 if deleting non-existent task', async () => {
    const response = await request(server.app).delete('/api/tasks/99999');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Task with ID 99999 does not exist.');
  });
});
