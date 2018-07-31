'use strict'
module.exports = (sequelize, DataTypes) => {
  var primitiveType = sequelize.define('primitiveType', {
    name: DataTypes.STRING
  }, {})
  primitiveType.associate = (models) => {
    // associations can be defined here
  }
  return primitiveType
}
