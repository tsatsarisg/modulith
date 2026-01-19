import request from 'supertest';
import { Express } from 'express';
import {
  createTestApp,
  setupTestDatabase,
  teardownTestDatabase,
  clearDatabase,
} from './setup';

describe('Franchise E2E Tests', () => {
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

  describe('GET /franchises/:id', () => {
    let authToken: string;
    let franchiseId: string;

    beforeEach(async () => {
      const signupResponse = await request(app)
        .post('/auth/signup')
        .send({
          email: 'franchise@example.com',
          password: 'Password123',
        });

      authToken = signupResponse.body.token;

      const franchiseResponse = await request(app)
        .post('/franchises')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Test Franchise',
          category: 'Carwash',
        });

      franchiseId = franchiseResponse.body._id;
    });

    it('should get a franchise by ID (no auth required)', async () => {
      const response = await request(app)
        .get(`/franchises/${franchiseId}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Test Franchise');
      expect(response.body.category).toBe('Carwash');
    });

    it('should return 404 for non-existent franchise', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .get(`/franchises/${fakeId}`);

      expect(response.status).toBe(404);
      expect(response.body.type).toBe('NOT_FOUND');
      expect(response.body.message).toContain('not found');
    });
  });

  describe('GET /franchises', () => {
    let authToken: string;

    beforeEach(async () => {
      const signupResponse = await request(app)
        .post('/auth/signup')
        .send({
          email: 'franchise@example.com',
          password: 'Password123',
        });

      authToken = signupResponse.body.token;

      await request(app)
        .post('/franchises')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Test Franchise',
          category: 'Carwash',
        });
    });

    it('should get all franchises (no auth required)', async () => {
      const response = await request(app)
        .get('/franchises');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    it('should return empty array when no franchises exist', async () => {
      await clearDatabase();

      const response = await request(app)
        .get('/franchises');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('POST /franchises', () => {
    let authToken: string;

    beforeEach(async () => {
      const signupResponse = await request(app)
        .post('/auth/signup')
        .send({
          email: 'franchise@example.com',
          password: 'Password123',
        });

      authToken = signupResponse.body.token;
    });

    it('should create a franchise with valid token', async () => {
      const response = await request(app)
        .post('/franchises')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'New Bakery',
          category: 'Bakery',
        });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('New Bakery');
      expect(response.body.category).toBe('Bakery');
      expect(response.body._id).toBeDefined();
    });

    it('should return 401 without authentication token', async () => {
      const response = await request(app)
        .post('/franchises')
        .send({
          name: 'Unauthorized Franchise',
          category: 'Carwash',
        });

      expect(response.status).toBe(401);
    });

    it('should return 400 for missing name', async () => {
      const response = await request(app)
        .post('/franchises')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          category: 'Carwash',
        });

      expect(response.status).toBe(400);
    });

    it('should return 400 for missing category', async () => {
      const response = await request(app)
        .post('/franchises')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Incomplete Franchise',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /franchises/:id', () => {
    let authToken: string;
    let franchiseId: string;

    beforeEach(async () => {
      const signupResponse = await request(app)
        .post('/auth/signup')
        .send({
          email: 'franchise@example.com',
          password: 'Password123',
        });

      authToken = signupResponse.body.token;

      const franchiseResponse = await request(app)
        .post('/franchises')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Test Franchise',
          category: 'Carwash',
        });

      franchiseId = franchiseResponse.body._id;
    });

    it('should delete a franchise with valid token', async () => {
      const response = await request(app)
        .delete(`/franchises/${franchiseId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(204);

      // Verify deletion
      const getResponse = await request(app)
        .get(`/franchises/${franchiseId}`);

      expect(getResponse.status).toBe(404);
      expect(getResponse.body.type).toBe('NOT_FOUND');
    });

    it('should return 401 without authentication token', async () => {
      const response = await request(app)
        .delete(`/franchises/${franchiseId}`);

      expect(response.status).toBe(401);
    });
  });
});
