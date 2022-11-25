import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan'
import createError from 'http-errors'
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'

// import authRoute from './routes/auth.route';
import usersRoute from './routes/users.route';
import authRoute from './routes/auth.route';



const app: Application = express();
const port = 3000;

app.use(cors())
// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

dotenv.config()

//connect to db
import dbConfig from './config/db'
mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.db}`)



app.get('/', (req: Request, res: Response) => {
  return res.status(200).send({
    message: 'App running',
  });
});

app.use('/auth', authRoute)
app.use('/user', usersRoute)

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
})


app.listen(port, (): void => {
  console.log(`Connected successfully on port ${port}`);
});

