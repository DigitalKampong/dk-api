'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.removeColumn('Products', 'category');
  },

  down: async queryInterface => {
    await queryInterface.addColumn('Products', 'category');
  },
};
