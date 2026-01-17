import mongoose from 'mongoose';
import { env } from '../../config/env';

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(env.DOCKER_MONGO_URL, {
      dbName: env.DB_NAME,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export const closeDatabase = async (): Promise<void> => {
  await mongoose.connection.close();
};
