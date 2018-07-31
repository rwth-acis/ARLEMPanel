'use strict'
module.exports = (sequelize, DataTypes) => {
  var place = sequelize.define('place', {
    id_name: DataTypes.STRING,
    name: DataTypes.STRING,
    detectable: DataTypes.INTEGER,
    author: DataTypes.INTEGER
  }, {})
  place.associate = (models) => {
    // associations can be defined here
  }
  return place
}
