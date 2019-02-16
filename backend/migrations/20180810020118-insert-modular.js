'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('modulars', [{
      name: 'HAR',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'HGR',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('viewports', null, {})
  }
}
