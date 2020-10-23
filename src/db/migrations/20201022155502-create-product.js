'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.DataTypes.STRING,
      },
      description: {
        type: Sequelize.DataTypes.STRING,
      },
      price: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false,
      },
      image: {
        type: Sequelize.DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      storeId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Stores',
          key: 'id',
        },
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('Products');
  },
};
