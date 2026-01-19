import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NODE_NO_WARNINGS: z.string().optional(),
  PORT_NUMBER: z.string().transform(Number).pipe(z.number().int().positive()).default(8080),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),

  DOCKER_MONGO_URL: z.string().url(),
  MONGO_INITDB_ROOT_USERNAME: z.string().min(1),
  MONGO_INITDB_ROOT_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1),

  FRANCHISE_COLLECTION_NAME: z.string().default('franchises'),
  USER_COLLECTION_NAME: z.string().default('users'),

  JWT_SECRET: z.string().min(32, 'JWT secret must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().transform(Number).pipe(z.number().int().positive()).default(86400),
});

// Parse and validate environment variables
const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Environment validation failed:');
      console.error(error.message);
      throw new Error('Invalid environment variables');
    }
    throw error;
  }
};

// Export validated environment variables
export const env = parseEnv();

// Export type for TypeScript
export type Env = z.infer<typeof envSchema>;

