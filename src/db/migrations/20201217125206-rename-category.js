'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.renameTable('Category', 'Categories');
  },

  down: async queryInterface => {
    await queryInterface.renameTable('Categories', 'Category');
  },
};
