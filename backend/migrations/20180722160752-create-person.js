'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('people', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      twitter: {
        type: Sequelize.STRING
      },
      mbox: {
        type: Sequelize.STRING
      },
      persona: {
        type: Sequelize.STRING
      },
      detectableId: {
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
      queryInterface.addConstraint('people', ['authorId'], {
        type: 'foreign key',
        name: 'persons_author_fk_constraint',
        references: {
          table: 'authors',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
      queryInterface.addConstraint('people', ['detectableId'], {
        type: 'foreign key',
        name: 'places_detectables_fk_constraint',
        references: {
          table: 'detectables',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('people')
  }
}
