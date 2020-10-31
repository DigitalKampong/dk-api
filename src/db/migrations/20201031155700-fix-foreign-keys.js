'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await [
      queryInterface.changeColumn('HawkerCentres', 'regionId', {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Regions',
          key: 'regionId',
        },
      }),
      queryInterface.changeColumn('Stalls', 'hawkerCentreId', {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'HawkerCentres',
          key: 'hawkerCentreId',
        },
      }),
      queryInterface.changeColumn('Products', 'stallId', {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Regions',
          key: 'regionId',
        },
      }),
    ];
  },

  down: async (queryInterface, Sequelize) => {
    await [
      queryInterface.changeColumn('HawkerCentres', 'regionId', {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Regions',
          key: 'id',
        },
      }),
      queryInterface.changeColumn('Stalls', 'hawkerCentreId', {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'HawkerCentres',
          key: 'id',
        },
      }),
      queryInterface.changeColumn('Products', 'stallId', {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Stalls',
          key: 'id',
        },
      }),
    ];
  },
};
