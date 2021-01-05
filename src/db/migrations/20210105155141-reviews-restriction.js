'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.addConstraint('Reviews', {
      fields: ['userId', 'stallId'],
      type: 'unique',
      name: 'Review_unique_per_stall_constraint',
    });
  },

  down: async queryInterface => {
    await queryInterface.removeConstraint('Reviews', "'Review_unique_per_stall_constraint");
  },
};
