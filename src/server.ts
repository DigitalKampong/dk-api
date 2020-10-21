import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import {Request, Response, NextFunction} from 'express';
import cors from 'cors';

// import {testAuthenticate} from './db/dbUtil';

// testAuthenticate();

import stores from './routes/stores';

const app = express();
const PORT = process.env.PORT || '3000';

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/stores', stores);

app.all('*', (req: Request, res: Response) => res.send('You are at the wrong place. Shoo!'));

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke! Please try again later.');
});

app.listen(PORT, () => {
  console.log(`Express server is listening on ${PORT}`);
});
