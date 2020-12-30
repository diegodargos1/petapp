'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn('store_locations',
      'store_id',
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

    return queryInterface.removeColumn('store_locations', 'storeId');
  }
};