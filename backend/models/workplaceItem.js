'use strict'
module.exports = (sequelize, DataTypes) => {
  var workplaceResource = sequelize.define('workplaceResource', {
    entityId: DataTypes.INTEGER,
    entityType: DataTypes.STRING,
    workplaceId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {})
  workplaceResource.associate = (models) => {
    // associations can be defined here
    models.workplaceResource.belongsTo(models.workplace, {foreignKey: 'workplaceId'})
    models.workplaceResource.belongsTo(models.entity, {foreignKey: 'entityId'})
  }
  return workplaceResource
}
