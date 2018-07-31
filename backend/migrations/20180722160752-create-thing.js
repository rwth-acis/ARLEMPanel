'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('things', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_name: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      urn: {
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
      queryInterface.addConstraint('things', ['authorId'], {
        type: 'foreign key',
        name: 'things_author_fk_constraint',
        references: {
          table: 'authors',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
      queryInterface.addConstraint('things', ['detectableId'], {
        type: 'foreign key',
        name: 'things_detectables_fk_constraint',
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
    return queryInterface.dropTable('things')
  }
}
