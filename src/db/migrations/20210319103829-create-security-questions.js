'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SecurityQuestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('SecurityQuestions');
  },
};
