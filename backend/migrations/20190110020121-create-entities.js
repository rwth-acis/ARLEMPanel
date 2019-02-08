const views = [
  {
    name: 'entities',
    query: "select `triggers`.`id` AS `id`,`triggers`.`name` AS `name`,`triggers`.`category` AS `type`,`triggers`.`createdAt` AS `createdAt`,`triggers`.`updatedAt` AS `updatedAt` from `triggers` union select `configurables`.`id` AS `id`,`configurables`.`name` AS `name`,`configurables`.`category` AS `type`,`configurables`.`createdAt` AS `createdAt`,`configurables`.`updatedAt` AS `updatedAt` from `configurables` union select `tangibles`.`id` AS `id`,`tangibles`.`name` AS `name`,`tangibles`.`type` AS `type`,`tangibles`.`createdAt` AS `createdAt`,`tangibles`.`updatedAt` AS `updatedAt` from `tangibles` union select `sensors`.`id` AS `id`,`sensors`.`name` AS `name`,'sensor' AS `type`,`sensors`.`createdAt` AS `createdAt`,`sensors`.`updatedAt` AS `updatedAt` from `sensors`"
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
