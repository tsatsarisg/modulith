import request from 'supertest';
import { Express } from 'express';
import {
  createTestApp,
  setupTestDatabase,
  teardownTestDatabase,
  clearDatabase,
} from './setup';

describe('User E2E Tests', () => {
  let app: Express;

  beforeAll(async () => {
    await setupTestDatabase();
    app = createTestApp();
  });

  afterAll(async () => {
    await teardownTestDatabase();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  describe('GET /users/:id', () => {
    let authToken: string;
    let userId: string;

    beforeEach(async () => {
      const signupResponse = await request(app)
        .post('/auth/signup')
        .send({
          email: 'user@example.com',
          password: 'Password123',
        });

      authToken = signupResponse.body.token;
      userId = signupResponse.body.user.id;
    });

    it('should get a user by ID with valid token', async () => {
      const response = await request(app)
        .get(`/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.email).toBe('user@example.com');
    });

    it('should return 401 without authentication token', async () => {
      const response = await request(app)
        .get(`/users/${userId}`);

      expect(response.status).toBe(401);
    });

    it('should return 401 with invalid token', async () => {
      const response = await request(app)
        .get(`/users/${userId}`)
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(401);
    });

    it('should return 404 for non-existent user', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .get(`/users/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
      expect(response.body.type).toBe('NOT_FOUND');
      expect(response.body.message).toContain('not found');
    });
  });

  describe('GET /users', () => {
    let authToken: string;

    beforeEach(async () => {
      const signupResponse = await request(app)
        .post('/auth/signup')
        .send({
          email: 'user@example.com',
          password: 'Password123',
        });

      authToken = signupResponse.body.token;
    });

    it('should get all users with valid token', async () => {
      const response = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    it('should return 401 without authentication token', async () => {
      const response = await request(app)
        .get('/users');

      expect(response.status).toBe(401);
    });
  });
});
