'use strict'
module.exports = (sequelize, DataTypes) => {
  var deviceType = sequelize.define('deviceType', {
    name: DataTypes.STRING
  }, {})
  deviceType.associate = (models) => {
    // associations can be defined here
  }
  return deviceType
}
