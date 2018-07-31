'use strict'
module.exports = (sequelize, DataTypes) => {
  var device = sequelize.define('device', {
    name: DataTypes.STRING,
    type: DataTypes.INTEGER,
    author: DataTypes.INTEGER
  }, {})
  device.associate = (models) => {
    // associations can be defined here
  }
  return device
}
