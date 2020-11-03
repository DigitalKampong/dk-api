import dotenvFlow from 'dotenv-flow';
dotenvFlow.config({
  silent: true,
});

export const DATABASE_URL = process.env.DATABASE_URL || '';
export const PORT = process.env.PORT || 3000;
