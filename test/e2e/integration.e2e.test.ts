import request from 'supertest';
import { Express } from 'express';
import {
  createTestApp,
  setupTestDatabase,
  teardownTestDatabase,
  clearDatabase,
} from './setup';

describe('Integration Flow E2E Tests', () => {
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

  describe('Health Check', () => {
    it('should return healthy status', async () => {
      const response = await request(app)
        .get('/health');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('healthy');
      expect(response.body.timestamp).toBeDefined();
    });
  });

  describe('Full User Flow', () => {
    it('should complete full signup -> login -> get user flow', async () => {
      // Step 1: Signup
      const signupResponse = await request(app)
        .post('/auth/signup')
        .send({
          email: 'flow@example.com',
          password: 'FlowPassword123',
        });

      expect(signupResponse.status).toBe(201);
      const userId = signupResponse.body.user.id;

      // Step 2: Login with same credentials
      const loginResponse = await request(app)
        .post('/auth/login')
        .send({
          email: 'flow@example.com',
          password: 'FlowPassword123',
        });

      expect(loginResponse.status).toBe(200);
      const token = loginResponse.body.token;

      // Step 3: Get user with token from login
      const getUserResponse = await request(app)
        .get(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(getUserResponse.status).toBe(200);
      expect(getUserResponse.body.email).toBe('flow@example.com');
    });
  });

  describe('Full Franchise Flow', () => {
    it('should complete full auth -> create franchise -> get franchise flow', async () => {
      // Step 1: Signup
      const signupResponse = await request(app)
        .post('/auth/signup')
        .send({
          email: 'franchiseflow@example.com',
          password: 'FlowPassword123',
        });

      const token = signupResponse.body.token;

      // Step 2: Create franchise
      const createResponse = await request(app)
        .post('/franchises')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Flow Test Bakery',
          category: 'Bakery',
        });

      expect(createResponse.status).toBe(201);
      const franchiseId = createResponse.body._id;

      // Step 3: Get franchise (no auth needed)
      const getResponse = await request(app)
        .get(`/franchises/${franchiseId}`);

      expect(getResponse.status).toBe(200);
      expect(getResponse.body.name).toBe('Flow Test Bakery');
      expect(getResponse.body.category).toBe('Bakery');

      // Step 4: Verify in list
      const listResponse = await request(app)
        .get('/franchises');

      expect(listResponse.status).toBe(200);
      expect(listResponse.body.some((f: { name: string }) => f.name === 'Flow Test Bakery')).toBe(true);
    });
  });
});
