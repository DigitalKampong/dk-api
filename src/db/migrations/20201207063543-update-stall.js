'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Stalls', 'rating', {
      type: Sequelize.DOUBLE,
      allowNull: true,
    });
  },
  down: async queryInterface => {
    await queryInterface.removeColumn('Stalls', 'rating');
  },
};
