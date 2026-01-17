import express, { Express, json } from 'express';
import cors from 'cors';
import routes from './routes';
import errorHandler from './utils/middlewares/errorHandler';
import { MongoAdapter } from './utils/MongoDBAdapter';
import { getEnv } from './utils/env';
import helmet from 'helmet';
import { Server } from 'http';
import buildComponents, { Components } from './components';

export default class Application {
  private port: string;
  private app: Express;
  private server!: Server;
  public mongoAdapter: MongoAdapter;
  private components!: Components;

  constructor() {
    this.app = express();
    this.port = getEnv('PORT_NUMBER');
    this.mongoAdapter = new MongoAdapter(getEnv('DOCKER_MONGO_URL'));
  }

  build() {
    // Security middleware
    this.app.use(helmet());
    this.app.use(
      cors({
        origin: process.env.NODE_ENV === 'production' ? false : `http://localhost:${this.port}`,
        credentials: true,
      })
    );

    // Body parsing
    this.app.use(json());

    // Health check endpoint (before routes)
    this.app.get('/health', (_req, res) => {
      res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
      });
    });
  }

  async start() {
    await this.mongoAdapter.connect();
    this.components = buildComponents(this.mongoAdapter);
    this.setRoutes();
    this.server = this.app
      .listen(this.port)
      .on('listening', () => {
        console.log(`⚡️ Server is running at http://localhost:${this.port}`);
      })
      .on('error', (err) => {
        console.error('Error starting server');
        console.error(err);
        process.exit(1);
      });
  }

  async stop() {
    await this.mongoAdapter.close();
    this.server.close((err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log('Server stopped');
    });
  }

  private setRoutes() {
    this.app.use('/api', Object.values(routes(this.components)));

    // 404 handler
    this.app.use((_req, res) => {
      res.status(404).json({ error: 'Not Found' });
    });

    // Error handler (must be last)
    this.app.use(errorHandler);
  }

  public getComponents() {
    return this.components;
  }
}
