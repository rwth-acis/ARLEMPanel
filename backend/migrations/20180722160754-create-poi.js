'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pois', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      thing: {
        type: Sequelize.INTEGER
      },
      x: {
        type: Sequelize.DECIMAL
      },
      y: {
        type: Sequelize.DECIMAL
      },
      z: {
        type: Sequelize.DECIMAL
      },
      relativeTo: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('pois')
  }
}
