import express, { Request, Response } from 'express';
const app = express();
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notfound';
import router from './app/routes';

//parsers
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }));
// // application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('server is running.');
});

app.use(globalErrorHandler);

//not found
app.use(notFound);

export default app;
