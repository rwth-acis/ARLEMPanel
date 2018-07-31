'use strict'
module.exports = (sequelize, DataTypes) => {
  var hazardPrimitive = sequelize.define('hazardPrimitive', {
    hazard: DataTypes.INTEGER,
    primitive: DataTypes.INTEGER
  }, {})
  hazardPrimitive.associate = (models) => {
    // associations can be defined here
  }
  return hazardPrimitive
}
