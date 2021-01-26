import sequelize from '../src/db';
import '../src/models'; // Import for side effects
import { truncateClazzes } from '../src/utils/dbUtil';

beforeEach(async () => {
  // This resets all the tables before each test.
  await truncateClazzes();
});

afterAll(async () => {
  await sequelize.close();
});
