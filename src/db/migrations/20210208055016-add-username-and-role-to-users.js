'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'username', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user',
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.removeColumn('Users', 'username');
    await queryInterface.removeColumn('Users', 'role');
    await queryInterface.dropEnum('enum_Users_role');
  },
};
