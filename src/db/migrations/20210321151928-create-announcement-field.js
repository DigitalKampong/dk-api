'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('HawkerCentres', 'announcement', {
      type: Sequelize.TEXT,
    });
  },

  down: async queryInterface => {
    await queryInterface.removeColumn('HawkerCentres', 'announcement');
  },
};
