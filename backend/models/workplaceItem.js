'use strict'
module.exports = (sequelize, DataTypes) => {
  var resource = sequelize.define('workplaceItem', {
    entity: DataTypes.INTEGER,
    entity_type: DataTypes.STRING,
    workplace: DataTypes.INTEGER,
    author: DataTypes.INTEGER
  }, {})
  resource.associate = (models) => {
    // associations can be defined here
  }
  return resource
}
