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
export const ON_AUTH = true; // convEnvToBool(process.env.ON_AUTH, true); // TODO: Remove once development is done

export const ON_GAE = convEnvToBool(process.env.ON_GAE, false);

export const GCS_BUCKET = process.env.GCS_BUCKET || '';
export const GCS_CLIENT_EMAIL = process.env.GCS_CLIENT_EMAIL || '';
export const GCS_PRIVATE_KEY = process.env.GCS_PRIVATE_KEY || '';
export const GCS_BASE_URL = 'https://storage.googleapis.com';

export const GMAPS_API_KEY = process.env.GMAPS_API_KEY || '';

export * from './upload';
