'use strict'
module.exports = (sequelize, DataTypes) => {
  var detectable = sequelize.define('detectable', {
    name: DataTypes.STRING,
    sensor: DataTypes.INTEGER,
    type: DataTypes.STRING,
    url: DataTypes.STRING,
    authorId: DataTypes.INTEGER
  }, {})
  detectable.associate = (models) => {
    // associations can be defined here
  }
  return detectable
}
