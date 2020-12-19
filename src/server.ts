import express from 'express';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import { PORT } from './consts';
// import {testAuthenticate} from './db/dbUtil';
import './models'; // import for side effects

import { HTTPError, NotFoundError } from './errors/httpErrors';
import { fmtErrorResp } from './errors/errorUtil';

import regions from './routes/regions';
import hawkerCentres from './routes/hawkerCentres';
import stalls from './routes/stalls';
import products from './routes/products';
import search from './routes/search';
import categories from './routes/categories';
import categoryStalls from './routes/categoryStalls';

const app = express();

// testAuthenticate();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/regions', regions);
app.use('/hawkerCentres', hawkerCentres);
app.use('/stalls', stalls);
app.use('/products', products);
app.use('/categories', categories);
app.use('/categoryStalls', categoryStalls);
app.use('/search', search);

app.all('*', (req: Request, res: Response) => {
  const err = new NotFoundError('You are at the wrong place. Page cannot be found. Shoo!');
  res.status(404).json(fmtErrorResp(err));
});

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof HTTPError) {
    res.status(err.status).json(fmtErrorResp(err));
  } else {
    next(err);
  }
});

// Handle all non-user related errors here (e.g. cannot connect to db)
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json(fmtErrorResp(err));
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Express server is listening on ${PORT}`);
  });
}

export default app;
