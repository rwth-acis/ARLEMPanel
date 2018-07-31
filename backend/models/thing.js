'use strict'
module.exports = (sequelize, DataTypes) => {
  var thing = sequelize.define('thing', {
    name: DataTypes.STRING,
    urn: DataTypes.STRING,
    detectableId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {})
  thing.associate = (models) => {
    // associations can be defined here
    models.thing.belongsTo(models.author, {foreignKey: 'authorId'})
    models.thing.belongsTo(models.detectable, {foreignKey: 'detectableId'})
    models.thing.hasMany(models.poi, {foreignKey: 'thingId'})
  }
  return thing
}
