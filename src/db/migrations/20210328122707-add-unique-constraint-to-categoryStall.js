'use strict';

module.exports = {
  up: async queryInterface => {
    queryInterface.addConstraint('CategoryStalls', {
      fields: ['stallId', 'categoryId'],
      type: 'unique',
      name: 'categoryStall_unique_constraint',
    });
  },

  down: async queryInterface => {
    queryInterface.removeConstraint('CategoryStalls', 'categoryStall_unique_constraint');
  },
};
