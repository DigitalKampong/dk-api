import dotenvFlow from 'dotenv-flow';
dotenvFlow.config({
  silent: true,
});

export const DATABASE_URL = process.env.DATABASE_URL || '';
export const PORT = process.env.PORT || 3000;

export const GCS_BUCKET = process.env.GCS_BUCKET || '';
export const GCS_CLIENT_EMAIL = process.env.GCS_CLIENT_EMAIL || '';
export const GCS_PRIVATE_KEY = process.env.GCS_PRIVATE_KEY || '';

export * from './upload';
