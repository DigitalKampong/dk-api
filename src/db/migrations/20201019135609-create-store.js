'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('stores', {
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: Sequelize.DataTypes.TEXT,
      },

      contactNo: {
        type: Sequelize.DataTypes.STRING,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('stores');
  },
};
