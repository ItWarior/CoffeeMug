import express, { Application, NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import productRouter from './routers/product.router';
import log from './utils/logger.util';
import config from './config';
import HttpError from './errors/http.error';
import connect from './database/connection';

connect()
  .then(() => log.info('Connected to the database'))
  .catch(err => log.error(err));

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  log.error(err);
  log.error(err.stack);
  if (err instanceof HttpError) {
    return res.status(err.status || 500).json({ message: err.message || 'Unknown error' });
  }
  return res.status(500).json({ message: err.message });
});

app.listen(config.port, (): void => {
  log.info(`Listening port ${config.port}`);
});
