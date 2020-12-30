'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.createTable('stores', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, 
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false, 
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * 
     */

    return queryInterface.dropTable('stores');
  }
};
