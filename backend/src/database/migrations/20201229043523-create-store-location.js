'use strict';
//yarn sequelize migration:create --name=update-storelocation 
//yarn sequelize db:migration
//yarn sequelize db:migration:undo
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('store_locations', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, 
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false, 
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      rua: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      numero: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      complemento: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      website: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      latitude: {
        type: Sequelize.DOUBLE,
        allowNull: false, 
      },
      longitude: {
        type: Sequelize.DOUBLE,
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
     * await queryInterface.dropTable('users');
     */
  }
};
