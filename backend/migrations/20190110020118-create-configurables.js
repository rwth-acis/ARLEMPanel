const views = [
  {
    name: 'configurables',
    query: "select `apps`.`id` AS `id`,`apps`.`name` AS `name`,'app' AS `category`,`apps`.`type` AS `type`,`apps`.`authorId` AS `authorId`,`apps`.`createdAt` AS `createdAt`,`apps`.`updatedAt` AS `updatedAt` from `apps` union select `devices`.`id` AS `id`,`devices`.`name` AS `name`,'device' AS `category`,`devices`.`type` AS `type`,`devices`.`authorId` AS `authorId`,`devices`.`createdAt` AS `createdAt`,`devices`.`updatedAt` AS `updatedAt` from `devices`"
  }
]

module.exports = {
  up: function (queryInterface, Sequelize) {
    let query = ''
    for (let i = 0; i < views.length; i++) {
      query += `CREATE VIEW ${views[i].name} AS ${views[i].query};`
    }
    return queryInterface.sequelize.query(query)
  },
  down: function (queryInterface, Sequelize) {
    let query = ''
    for (let i = 0; i < views.length; i++) {
      query += `DROP VIEW ${views[i].name};`
    }
    return queryInterface.sequelize.query(query)
  }
}
