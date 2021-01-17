'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('HawkerCentres', 'bus', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('HawkerCentres', 'mrt', {
      type: Sequelize.STRING,
    });
  },

  down: async queryInterface => {
    await queryInterface.removeColumn('HawkerCentres', 'bus');
    await queryInterface.removeColumn('HawkerCentres', 'mrt');
  },
};
