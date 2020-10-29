import dotenvFlow from 'dotenv-flow';
// import {testAuthenticate} from '../src/db/dbUtil';

dotenvFlow.config();

import {Sequelize} from 'sequelize';
const sequelize = new Sequelize(process.env.DATABASE_URL || '');

const database = 'dk-api-test';
sequelize.query(`CREATE DATABASE IF NOT EXISTS "${database}"`).then(() => console.log("database created"));

export default async function setup() {
  try {
    await sequelize.authenticate();
  } catch (err) {
    console.log('unable', err);
  }
  console.log('Running init tests');
}
