import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express, { Express, json } from 'express';
import helmet from 'helmet';

// Set up test environment variables before importing other modules
process.env.NODE_ENV = 'test';
process.env.DOCKER_MONGO_URL = 'mongodb://localhost:27017';
process.env.MONGO_INITDB_ROOT_USERNAME = 'testuser';
process.env.MONGO_INITDB_ROOT_PASSWORD = 'testpassword';
process.env.DB_NAME = 'test_db';
process.env.JWT_SECRET = 'test-jwt-secret-key-that-is-at-least-32-characters-long';
process.env.JWT_EXPIRES_IN = '86400';

// Now import modules that depend on env
import routes from '../../src/routes';
import errorHandler from '../../src/web/middlewares/errorHandler';

let mongoServer: MongoMemoryServer;

export const createTestApp = (): Express => {
  const app = express();
  
  app.use(helmet());
  app.use(json());
  
  app.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
    });
  });
  
  app.use(routes());
  
  app.use((_req, res) => {
    res.status(404).json({ error: 'Not Found' });
  });
  
  app.use(errorHandler);
  
  return app;
};

export const setupTestDatabase = async (): Promise<void> => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
};

export const teardownTestDatabase = async (): Promise<void> => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongoServer) {
    await mongoServer.stop();
  }
};

export const clearDatabase = async (): Promise<void> => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    if (collection !== undefined) {
      await collection.deleteMany({});
    }
  }
};
