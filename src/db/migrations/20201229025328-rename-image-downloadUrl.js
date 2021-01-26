'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.renameColumn('Images', 'downloadUrl', 'fileName');
  },

  down: async queryInterface => {
    await queryInterface.renameColumn('Images', 'fileName', 'downloadUrl');
  },
};
