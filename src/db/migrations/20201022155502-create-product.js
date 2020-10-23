'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      category: {
        type: Sequelize.DataTypes.STRING
      },
      productname: {
        type: Sequelize.DataTypes.STRING
      },
      price: {
        type: Sequelize.DataTypes.DOUBLE
      },
      pic: {
        type: Sequelize.DataTypes.STRING
      },
      store_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'Stores',
          key: 'id'
        }
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};