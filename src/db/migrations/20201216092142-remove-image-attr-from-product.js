'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.removeColumn('Products', 'image');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'image', {
      type: Sequelize.STRING,
    });
  },
};
