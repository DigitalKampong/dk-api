'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('HawkerCentres', 'latLng');

    await queryInterface.addColumn('HawkerCentres', 'lat', {
      type: Sequelize.DOUBLE,
    });

    await queryInterface.addColumn('HawkerCentres', 'lng', {
      type: Sequelize.DOUBLE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('HawkerCentres', 'latLng', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.removeColumn('HawkerCentres', 'lat');
    await queryInterface.removeColumn('HawkerCentres', 'lng');
  },
};
