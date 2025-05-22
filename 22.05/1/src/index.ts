import express, {Application, Request, Response, NextFunction} from 'express';
import "dotenv/config";
import connectDB from './config/db';
import taskRoutes from './routes/taskRoutes';
import { errorHandler } from './middleware/errorHandler.middleware';


const app = express();
app.use (errorHandler)
app.use(express.json());
const PORT:number|string = process.env.PORT || 3000;
connectDB()
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, ():void => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err))

app.use('/tasks', taskRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});