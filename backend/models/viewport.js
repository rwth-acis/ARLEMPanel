'use strict'
module.exports = (sequelize, DataTypes) => {
  var viewport = sequelize.define('viewport', {
    name: DataTypes.STRING
  }, {})
  viewport.associate = (models) => {
    // associations can be defined here
  }
  return viewport
}
