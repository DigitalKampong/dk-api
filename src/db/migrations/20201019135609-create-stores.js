'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Stores', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      createdAt: {
        type: Sequelize.DataTypes.DATE,
      },

      updatedAt: {
        type: Sequelize.DataTypes.DATE,
      },

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

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('stores');
  },
};
