'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('detectables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      sensor: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING,
        defaultValue: 'module'
      },
      url: {
        type: Sequelize.STRING
      },
      authorId: {
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
    }).then(() => {
      queryInterface.addConstraint('detectables', ['authorId'], {
        type: 'foreign key',
        name: 'detectables_author_fk_constraint',
        references: {
          table: 'authors',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('detectables')
  }
}
