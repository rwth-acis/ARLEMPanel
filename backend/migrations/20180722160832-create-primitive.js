'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('primitives', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      overlay: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      symbol: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
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
      queryInterface.addConstraint('primitives', ['authorId'], {
        type: 'foreign key',
        name: 'primitives_author_fk_constraint',
        references: {
          table: 'authors',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
      queryInterface.addConstraint('primitives', ['type'], {
        type: 'foreign key',
        name: 'primitives_type_fk_constraint',
        references: {
          table: 'primitiveTypes',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('primitives')
  }
}
