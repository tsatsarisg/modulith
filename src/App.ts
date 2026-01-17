import express, { Express, json } from 'express';
import routes from './routes';
import errorHandler from './web/middlewares/errorHandler';
import { connectDatabase, closeDatabase } from './infrastructure/database/database';
import { env } from './config/env';
import helmet from 'helmet';
import { Server } from 'http';

export default class Application {
  private app: Express;
  private server?: Server;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
  }

  private setupMiddlewares() {
    this.app.use(helmet());
    this.app.use(json());

    // Health check
    this.app.get('/health', (_req, res) => {
      res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: env.NODE_ENV,
      });
    });
  }

  async start(): Promise<void> {
    try {
      await connectDatabase();
      
      // Setup routes
      this.app.use(routes());
      
      // 404 handler
      this.app.use((_req, res) => {
        res.status(404).json({ error: 'Not Found' });
      });
      
      // Error handler (must be last)
      this.app.use(errorHandler);

      // Start server
      await new Promise<void>((resolve, reject) => {
        this.server = this.app.listen(env.PORT_NUMBER, () => {
          console.log(`⚡️ Server is running at http://localhost:${env.PORT_NUMBER}`);
          resolve();
        }).on('error', reject);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    console.log('Shutting down gracefully...');
    
    if (this.server) {
      await new Promise<void>((resolve, reject) => {
        this.server!.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }
    
    await closeDatabase();
    console.log('Server stopped');
  }
}
