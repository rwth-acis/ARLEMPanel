'use strict'
module.exports = (sequelize, DataTypes) => {
  var warning = sequelize.define('warning', {
    name: DataTypes.STRING,
    author: DataTypes.INTEGER
  }, {})
  warning.associate = (models) => {
    // associations can be defined here
  }
  return warning
}
