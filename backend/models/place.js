'use strict'
module.exports = (sequelize, DataTypes) => {
  var place = sequelize.define('place', {
    name: DataTypes.STRING,
    detectableId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {})
  place.associate = (models) => {
    // associations can be defined here
    models.place.belongsTo(models.author, {foreignKey: 'authorId'})
    models.place.belongsTo(models.detectable, {foreignKey: 'detectableId'})
  }
  return place
}
