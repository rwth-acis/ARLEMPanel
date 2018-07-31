'use strict'
module.exports = (sequelize, DataTypes) => {
  var hazard = sequelize.define('hazard', {
    name: DataTypes.STRING,
    author: DataTypes.INTEGER
  }, {})
  hazard.associate = (models) => {
    // associations can be defined here
  }
  return hazard
}
