module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('actions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      activityId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      viewportId: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING,
        defaultValue: 'action'
      },
      deviceId: {
        type: Sequelize.INTEGER
      },
      placeId: {
        type: Sequelize.INTEGER
      },
      primitiveId: {
        type: Sequelize.INTEGER
      },
      instructionTitle: {
        type: Sequelize.STRING
      },
      instructionDescription: {
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
    return queryInterface.dropTable('actions')
  }
}
