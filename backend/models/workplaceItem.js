'use strict'
module.exports = (sequelize, DataTypes) => {
  var resource = sequelize.define('workplaceResource', {
    entityId: DataTypes.INTEGER,
    entityType: DataTypes.STRING,
    workplaceId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {})
  resource.associate = (models) => {
    // associations can be defined here
  }
  return resource
}
