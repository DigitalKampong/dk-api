import { doesNotMatch } from 'assert';
import sequelize from '../src/db';

export default async function teardown() {
  try {
    await sequelize.close();
  } catch (err) {
    console.error('Sequelize unable to close:', err);
  }
}
