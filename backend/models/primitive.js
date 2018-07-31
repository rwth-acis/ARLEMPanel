'use strict'
module.exports = (sequelize, DataTypes) => {
  var primitive = sequelize.define('primitive', {
    name: DataTypes.STRING,
    overlay: DataTypes.INTEGER,
    type: DataTypes.STRING,
    symbol: DataTypes.STRING,
    size: DataTypes.STRING,
    url: DataTypes.STRING
  }, {})
  primitive.associate = (models) => {
    // associations can be defined here
  }
  return primitive
}
