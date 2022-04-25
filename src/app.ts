import express from 'express';
import connectToDatabase from './connection';
import { carRouter } from './factory';
import { errorHandler } from './middlewares';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.init();
  }

  public startServer(PORT: string | number = 3001): void {
    connectToDatabase();
    this.app.listen(
      PORT,
      () => console.log(`Server running here 👉 http://localhost:${PORT}`),
    );
  }

  public init() {
    this.app.use('/cars', carRouter);
  }

  private errorHandler() {
    this.app.use(errorHandler);
  }

  public getApp() {
    return this.app;
  }
}

export default App;