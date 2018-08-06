'use strict'
module.exports = (sequelize, DataTypes) => {
  var primitive = sequelize.define('primitive', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    type: DataTypes.STRING,
    symbol: DataTypes.STRING,
    size: DataTypes.STRING,
    url: DataTypes.STRING,
    option: DataTypes.STRING,
    authorId: DataTypes.INTEGER
  }, {})
  primitive.associate = (models) => {
    // associations can be defined here
    models.primitive.belongsTo(models.author, {foreignKey: 'authorId'})
  }
  return primitive
}
