'use strict'
module.exports = (sequelize, DataTypes) => {
  var workplace = sequelize.define('workplace', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    author: DataTypes.INTEGER
  }, {})
  workplace.associate = (models) => {
    // associations can be defined here
  }
  return workplace
}
