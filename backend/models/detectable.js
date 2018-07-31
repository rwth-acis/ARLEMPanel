'use strict'
module.exports = (sequelize, DataTypes) => {
  var detectable = sequelize.define('detectable', {
    sensor: DataTypes.INTEGER,
    type: DataTypes.STRING,
    url: DataTypes.STRING,
    message_id: DataTypes.INTEGER,
    author: DataTypes.INTEGER
  }, {})
  detectable.associate = (models) => {
    // associations can be defined here
  }
  return detectable
}
