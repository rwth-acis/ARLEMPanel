'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('workplaceItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      entity: {
        type: Sequelize.INTEGER
      },
      entity_type: {
        type: Sequelize.STRING
      },
      workplaceId: {
        type: Sequelize.INTEGER
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
      queryInterface.addConstraint('workplaceItems', ['authorId'], {
        type: 'foreign key',
        name: 'workplaceitems_author_fk_constraint',
        references: {
          table: 'authors',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
      queryInterface.addConstraint('workplaceItems', ['workplaceId'], {
        type: 'foreign key',
        name: 'workplaceitems_workplace_fk_constraint',
        references: {
          table: 'workplaceItems',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('workplaceItems')
  }
}
