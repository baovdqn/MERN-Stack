import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan'
import createError from 'http-errors'
import bodyParse from 'body-parser'

// import authRoute from './routes/auth.route';
import usersRoute from './routes/users.route';



const app: Application = express();
const port = 3000;

app.use(cors())
// Body parsing Middleware
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));
app.use(morgan('dev'));



app.get('/', (req: Request, res: Response) => {
  return res.status(200).send({
    message: 'App running',
  });
});

// app.use('/auth', authRoute)
app.use('/user', usersRoute)

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
})


app.listen(port, (): void => {
  console.log(`Connected successfully on port ${port}`);
});

