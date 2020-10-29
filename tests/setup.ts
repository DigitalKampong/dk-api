import sequelize from '../src/db';
import '../src/models'; // Import for side effects

beforeEach(async () => {
  // This resets all the tables before each test.
  await sequelize.sync({force: true});
});

afterAll(async () => {
  await sequelize.close();
});
