'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('viewports', [{
      name: 'actions',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'alerts',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('viewports', null, {})
  }
}
