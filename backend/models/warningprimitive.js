'use strict'
module.exports = (sequelize, DataTypes) => {
  var warningPrimitive = sequelize.define('warningPrimitive', {
    warning: DataTypes.INTEGER,
    primitive: DataTypes.INTEGER
  }, {})
  warningPrimitive.associate = (models) => {
    // associations can be defined here
  }
  return warningPrimitive
}
