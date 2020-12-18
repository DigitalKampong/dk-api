import { Sequelize } from 'sequelize';

import { DATABASE_URL } from '../consts';

const logging = process.env.NODE_ENV === 'test' ? false : console.log;

const sequelize = new Sequelize(DATABASE_URL, {
  logging: logging,
});

export default sequelize;
