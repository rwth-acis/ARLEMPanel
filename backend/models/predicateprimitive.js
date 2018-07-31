'use strict'
module.exports = (sequelize, DataTypes) => {
  var predicatePrimitive = sequelize.define('predicatePrimitive', {
    predicate: DataTypes.INTEGER,
    primitive: DataTypes.INTEGER,
    tmp: DataTypes.INTEGER
  }, {})
  predicatePrimitive.associate = (models) => {
    // associations can be defined here
  }
  return predicatePrimitive
}
