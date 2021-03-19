'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.addConstraint('UserAnswers', {
      fields: ['userId', 'securityQuestionId'],
      type: 'unique',
      name: 'Question_Unique_Per_User_constraint',
    });
  },

  down: async queryInterface => {
    await queryInterface.removeConstraint('UserAnswers', 'Question_Unique_Per_User_constraint');
  },
};
