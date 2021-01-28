'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Images', 'hawkerCentreId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'HawkerCentres',
        key: 'id',
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.removeColumn('Images', 'hawkerCentreId');
  },
};
