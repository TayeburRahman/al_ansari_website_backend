import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import { NotFoundHandler } from './errors/NotFoundHandler';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

export const app: Application = express();

app.use(
  cors({
    origin: [
      'http://192.168.10.16:3000',
      "http://localhost:3000",
      "http://10.10.20.70:3001",
      "http://10.10.20.72:4173",
      "https://www.alansarilaw.com",
      "https://alansarilaw.com",
      "https://dashboard.alansarilaw.com",
      "https://www.dashboard.alansarilaw.com",
      "dashboard.alansarilaw.com",
      "http://10.0.60.52:3000",
      'http://13.62.48.83:5173',
      "http://13.62.48.83:3000",
      "http://10.0.60.199:3000",
      "http://localhost:4173",
      'https://dashboard.alansarilaw.com'
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('uploads'));

app.use('/', routes);

app.get('/', async (req: Request, res: Response) => {
  res.json('Welcome to- al ansari website backend');
});

app.use(globalErrorHandler);

app.use(NotFoundHandler.handle);
