import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { UserRoutes } from './routes/user.routes.js';

export class Application {
  constructor() {
    dotenv.config();
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  initializeRoutes() {
    const userRoutes = new UserRoutes();
    this.app.use('/api/users', userRoutes.getRouter());
  }

  async connectToDatabase() {
    try {
      await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/user-api');
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  }

  async start() {
    await this.connectToDatabase();
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

// Start the application
const app = new Application();
app.start(); 
