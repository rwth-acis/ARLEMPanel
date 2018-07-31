'use strict'
module.exports = (sequelize, DataTypes) => {
  var appType = sequelize.define('appType', {
    name: DataTypes.STRING
  }, {})
  appType.associate = (models) => {
    // associations can be defined here
  }
  return appType
}
