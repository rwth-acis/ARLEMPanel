'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('apps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      manifest: {
        type: Sequelize.STRING
      },
      type: {
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
      queryInterface.addConstraint('apps', ['authorId'], {
        type: 'foreign key',
        name: 'apps_author_fk_constraint',
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
    return queryInterface.dropTable('apps')
  }
}
