'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Favourites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      stallId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Stalls',
          key: 'id',
        },
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

    await queryInterface.addConstraint('Favourites', {
      fields: ['userId', 'stallId'],
      type: 'unique',
      name: 'Favourite_unique_per_stall_constraint',
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('Favourites');
    await queryInterface.removeConstraint('Favourites', 'Favourite_unique_per_stall_constraint');
  },
};
