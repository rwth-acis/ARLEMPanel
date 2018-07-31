'use strict'
module.exports = (sequelize, DataTypes) => {
  var predicate = sequelize.define('predicate', {
    name: DataTypes.STRING,
    author: DataTypes.INTEGER
  }, {})
  predicate.associate = (models) => {
    // associations can be defined here
  }
  return predicate
}
