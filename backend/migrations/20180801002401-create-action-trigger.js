module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('actionTriggers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      actionId: {
        type: Sequelize.INTEGER
      },
      mode: {
        type: Sequelize.STRING,
        defaultValue: 'detect'
      },
      operation: {
        type: Sequelize.STRING,
        defaultValue: 'activate'
      },
      removeSelf: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      entityType: {
        type: Sequelize.STRING,
        defaultValue: 'action'
      },
      entityId: {
        type: Sequelize.INTEGER
      },
      poiId: {
        type: Sequelize.INTEGER
      },
      viewportId: {
        type: Sequelize.STRING
      },
      predicateId: {
        type: Sequelize.INTEGER
      },
      option: {
        type: Sequelize.STRING
      },
      modularId: {
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('actionTriggers')
  }
}
