import { Models } from '../types';
import sequelize from '../db';
import models from '../models';

export async function testAuthenticate() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully');
  } catch (err) {
    console.error('Unable to connect to db:', err);
  }
}

export async function truncateClazzes() {
  const modelszz = models as Models; // force typecast so can index into models using string

  Object.keys(modelszz).forEach(async key => {
    await modelszz[key].truncate({
      cascade: true,
      restartIdentity: true,
    });
  });
}
