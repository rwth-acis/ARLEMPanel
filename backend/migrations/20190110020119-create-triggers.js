const views = [
  {
    name: 'triggers',
    query: "select `primitives`.`id` AS `id`,`primitives`.`name` AS `name`,`primitives`.`authorId` AS `authorId`,`primitives`.`category` AS `category`,`primitives`.`type` AS `type`,`primitives`.`createdAt` AS `createdAt`,`primitives`.`updatedAt` AS `updatedAt` from `primitives` union select `detectables`.`id` AS `id`,`detectables`.`name` AS `name`,`detectables`.`authorId` AS `authorId`,'detectable' AS `category`,`detectables`.`type` AS `type`,`detectables`.`createdAt` AS `createdAt`,`detectables`.`updatedAt` AS `updatedAt` from `detectables`"
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
