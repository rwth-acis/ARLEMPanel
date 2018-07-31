'use strict'
module.exports = (sequelize, DataTypes) => {
  var sensor = sequelize.define('sensor', {
    id_name: DataTypes.STRING,
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.STRING,
    author: DataTypes.INTEGER
  }, {})
  sensor.associate = (models) => {
    // associations can be defined here
  }
  return sensor
}
