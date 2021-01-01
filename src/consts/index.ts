import dotenvFlow from 'dotenv-flow';
import process from 'process';
dotenvFlow.config({
  silent: true,
});

function convEnvToBool(val: string | undefined, defaultVal: boolean) {
  // convert env strings to boolean, i.e. 'true' -> true, will use defaultVal for any invalid val
  if (val !== 'false' && val !== 'true') {
    return defaultVal;
  }

  return val === 'true';
}

export const DATABASE_URL = process.env.DATABASE_URL || '';
export const PORT = process.env.PORT || 3000;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '';
export const ON_AUTH = convEnvToBool(process.env.ON_AUTH, true); // TODO: Remove once development is done

export const GCS_BUCKET = process.env.GCS_BUCKET || '';
export const GCS_CLIENT_EMAIL = process.env.GCS_CLIENT_EMAIL || '';
export const GCS_PRIVATE_KEY = process.env.GCS_PRIVATE_KEY || '';
export const GCS_BASE_URL = 'https://storage.googleapis.com';

export * from './upload';

const mustBePresent: { [key: string]: string | number } = {
  DATABASE_URL,
  ACCESS_TOKEN_SECRET,
  GCS_BUCKET,
  GCS_CLIENT_EMAIL,
  GCS_PRIVATE_KEY,
};

const missingKeys = Object.keys(mustBePresent).filter(k => mustBePresent[k] === '');
if (missingKeys.length > 0) {
  throw new Error(`Missing env variables: ${missingKeys.join(', ')}`);
}
