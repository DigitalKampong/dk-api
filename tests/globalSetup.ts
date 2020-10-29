import sequelize from '../src/db';
import {testAuthenticate} from '../src/db/dbUtil';

// import {Sequelize} from 'sequelize';
// const sequelize = new Sequelize(process.env.DATABASE_URL || '');

export default async function setup() {
  // try {
  //   console.log('Running sequelize sync');
  //   await sequelize.sync({force: true});
  // } catch (err) {
  //   console.error('Sequelize sync unable to run:', err);
  //   // eslint-disable-next-line no-process-exit
  //   process.exit(1);
  // }

  // testAuthenticate();
}
