import { Sequelize } from 'sequelize';

import { DATABASE_URL, ON_GAE } from '../consts';

let sequelize: Sequelize;
const logging = process.env.NODE_ENV === 'test' ? false : console.log;

if (ON_GAE) {
  const {
    GCSQL_DB_USER,
    GCSQL_DB_PASS,
    GCSQL_DB_NAME,
    GCSQL_CONNECTION_NAME,
    GCSQL_DB_SOCKET_PATH,
  } = process.env;

  sequelize = new Sequelize(GCSQL_DB_NAME!, GCSQL_DB_USER!, GCSQL_DB_PASS!, {
    logging,
    dialect: 'postgres',
    host: `${GCSQL_DB_SOCKET_PATH!}/${GCSQL_CONNECTION_NAME!}`,
  });
} else if (process.env.NODE_ENV === 'production') {
  // See https://github.com/sequelize/sequelize/issues/956 for more info
  sequelize = new Sequelize(DATABASE_URL, {
    logging,
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  });
} else {
  // Local development
  sequelize = new Sequelize(DATABASE_URL, {
    logging,
  });
}

export default sequelize;
