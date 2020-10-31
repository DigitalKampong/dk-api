'use strict';

module.exports = {
  up: async queryInterface => {
    await [
      queryInterface.renameColumn('Stalls', 'id', 'stallId'),
      queryInterface.renameColumn('Products', 'id', 'productId'),
      queryInterface.renameColumn('HawkerCentres', 'id', 'hawkerCentreId'),
      queryInterface.renameColumn('Regions', 'id', 'regionId'),
    ];
  },

  down: async queryInterface => {
    await [
      queryInterface.renameColumn('Stalls', 'stallId', 'id'),
      queryInterface.renameColumn('Products', 'productId', 'id'),
      queryInterface.renameColumn('HawkerCentres', 'hawkerCentreId', 'id'),
      queryInterface.renameColumn('Regions', 'regionId', 'id'),
    ];
  },
};
