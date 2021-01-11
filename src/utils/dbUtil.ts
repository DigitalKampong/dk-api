import { ModelStatic } from '../types';
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
  Object.keys(models).forEach(async key => {
    // Cast to unknown then to StaticModel for tsc to work
    await (models[key] as ModelStatic).truncate({
      cascade: true,
      restartIdentity: true,
    });
  });
}
