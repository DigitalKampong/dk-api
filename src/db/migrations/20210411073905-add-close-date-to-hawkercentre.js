'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('HawkerCentres', 'closeStart', {
      type: Sequelize.DATE,
      defaultValue: null,
    });
    await queryInterface.addColumn('HawkerCentres', 'closeEnd', {
      type: Sequelize.DATE,
      defaultValue: null,
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.removeColumn('HawkerCentres', 'closeStart');
    await queryInterface.removeColumn('HawkerCentres', 'closeEnd');
  }
};
