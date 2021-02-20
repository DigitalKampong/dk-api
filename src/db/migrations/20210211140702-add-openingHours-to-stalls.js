'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Stalls', 'openingHours', {
      type: Sequelize.JSON,
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.removeColumn('Stalls', 'openingHours');
  },
};
