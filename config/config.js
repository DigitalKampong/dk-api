const ON_GAE = process.env.ON_GAE;
const DATABASE_URL = process.env.DATABASE_URL;
let productionConfig;

if (ON_GAE !== undefined && ON_GAE === 'true') {
  const {
    GCSQL_DB_USER,
    GCSQL_DB_PASS,
    GCSQL_DB_NAME,
    GCSQL_CONNECTION_NAME,
    GCSQL_DB_SOCKET_PATH,
  } = process.env;

  productionConfig = {
    username: GCSQL_DB_USER,
    password: GCSQL_DB_PASS,
    database: GCSQL_DB_NAME,
    dialect: 'postgres',
    dialectOptions: {
      ssl: false,
    },
    host: `${GCSQL_DB_SOCKET_PATH}/${GCSQL_CONNECTION_NAME}`,
  };
} else {
  productionConfig = {
    url: process.env.DATABASE_URL,
  };
}

module.exports = {
  development: {
    url: DATABASE_URL,
  },
  test: {
    url: DATABASE_URL,
  },
  production: productionConfig,
};
