import express from 'express';
import {Request, Response, NextFunction} from 'express';
import cors from 'cors';

import {PORT} from './consts';
// import {testAuthenticate} from './db/dbUtil';
import './models'; // import for side effects

import regions from './routes/regions';
import hawkerCentres from './routes/hawkerCentres';
import stalls from './routes/stalls';
import products from './routes/products';
import search from './routes/search';

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
app.use('/search', search);

app.all('*', (req: Request, res: Response) => res.send('You are at the wrong place. Shoo!'));

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke! Please try again later.');
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Express server is listening on ${PORT}`);
  });
}

export default app;
