import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import routes from './routes';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.errorHandling();
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cors());
  }

  private routes(): void {
    this.app.use('/api', routes);
  }

  private errorHandling(): void {
    this.app.use(errorHandler);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  }
}

export default new Server();
