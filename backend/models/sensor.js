'use strict'
module.exports = (sequelize, DataTypes) => {
  var sensor = sequelize.define('sensor', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.STRING,
    authorId: DataTypes.INTEGER
  }, {})
  sensor.associate = (models) => {
    // associations can be defined here
    models.sensor.belongsTo(models.author, {foreignKey: 'authorId'})
  }
  return sensor
}
