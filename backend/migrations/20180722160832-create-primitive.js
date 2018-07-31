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
        allowNull: false,
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING,
        defaultValue: 'predicates'
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'visual'
      },
      symbol: {
        type: Sequelize.STRING,
        defaultValue: 'default'
      },
      size: {
        type: Sequelize.DECIMAL
      },
      url: {
        type: Sequelize.STRING
      },
      option: {
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
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('primitives')
  }
}
