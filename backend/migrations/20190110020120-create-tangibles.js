const views = [
  {
    name: 'tangibles',
    query: "select `places`.`id` AS `id`,`places`.`name` AS `name`,'place' AS `type`,'' AS `urn`,`places`.`detectableId` AS `detectableId`,`places`.`authorId` AS `authorId`,`places`.`createdAt` AS `createdAt`,`places`.`updatedAt` AS `updatedAt` from `places` union select `people`.`id` AS `id`,`people`.`name` AS `name`,'person' AS `type`,`people`.`persona` AS `urn`,`people`.`detectableId` AS `detectableId`,`people`.`authorId` AS `authorId`,`people`.`createdAt` AS `createdAt`,`people`.`updatedAt` AS `updatedAt` from `people` union select `things`.`id` AS `id`,`things`.`name` AS `name`,'thing' AS `type`,`things`.`urn` AS `urn`,`things`.`detectableId` AS `detectableId`,`things`.`authorId` AS `authorId`,`things`.`createdAt` AS `createdAt`,`things`.`updatedAt` AS `updatedAt` from `things`"
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
