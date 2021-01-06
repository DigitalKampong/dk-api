'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('HawkerCentres', 'latLng', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async queryInterface => {
    await queryInterface.removeColumn('HawkerCentres', 'latLng');
  },
};
