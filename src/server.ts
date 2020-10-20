import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import {testAuthenticate} from './db/dbUtil';

testAuthenticate();

import stores from './routes/stores';

const app = express();
const PORT = process.env.PORT || '3000';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/stores', stores);

app.listen(PORT, () => {
  console.log(`Express server is listening on ${PORT}`);
});
