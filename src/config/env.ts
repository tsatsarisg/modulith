import { z } from 'zod';

// Define the environment schema
const envSchema = z.object({
  // Node.js Configuration
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NODE_NO_WARNINGS: z.string().optional(),
  PORT_NUMBER: z.string().transform(Number).pipe(z.number().int().positive()).default(8080),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),

  // MongoDB Configuration
  DOCKER_MONGO_URL: z.string().url(),
  MONGO_INITDB_ROOT_USERNAME: z.string().min(1),
  MONGO_INITDB_ROOT_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1),

  // Collections
  FRANCHISE_COLLECTION_NAME: z.string().default('franchises'),
  USER_COLLECTION_NAME: z.string().default('users'),
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

// Legacy function for backward compatibility (deprecated)
/** @deprecated Use env object instead */
export function getEnv(key: keyof Env): string {
  return String(env[key]);
}

