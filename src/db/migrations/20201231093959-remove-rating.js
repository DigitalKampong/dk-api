'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.removeColumn('Stalls', 'rating');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Stalls', 'rating', { type: Sequelize.FLOAT });
  },
};
