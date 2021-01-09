import sequelize from '../db';
import models from '../models';

interface StaticModel {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  truncate(options: any): void;
}

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
    const clazz: unknown = models[key];
    await (clazz as StaticModel).truncate({
      cascade: true,
      restartIdentity: true,
    });
  });
}
