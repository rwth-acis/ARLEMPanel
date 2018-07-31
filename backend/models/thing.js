'use strict'
module.exports = (sequelize, DataTypes) => {
  var thing = sequelize.define('thing', {
    id_name: DataTypes.STRING,
    name: DataTypes.STRING,
    urn: DataTypes.STRING,
    detectable: DataTypes.INTEGER,
    author: DataTypes.INTEGER
  }, {})
  thing.associate = (models) => {
    // associations can be defined here
  }
  return thing
}
