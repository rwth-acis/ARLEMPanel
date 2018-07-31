'use strict'
module.exports = (sequelize, DataTypes) => {
  var module = sequelize.define('module', {
    name: DataTypes.STRING,
    authorId: DataTypes.INTEGER
  }, {})
  module.associate = (models) => {
    // associations can be defined here
  }
  return module
}
