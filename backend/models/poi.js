'use strict'
module.exports = (sequelize, DataTypes) => {
  var poi = sequelize.define('poi', {
    name: DataTypes.STRING,
    thing: DataTypes.INTEGER,
    x: DataTypes.DECIMAL,
    y: DataTypes.DECIMAL,
    z: DataTypes.DECIMAL,
    relativeTo: DataTypes.INTEGER
  }, {})
  poi.associate = (models) => {
    // associations can be defined here
  }
  return poi
}
