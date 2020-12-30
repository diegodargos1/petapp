'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn('stores',
      'user_id',
      {
        type: Sequelize.INTEGER,
        allowNull: false, 
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * 
     */

    return queryInterface.removeColumn('stores', 'userId');
  }
};
