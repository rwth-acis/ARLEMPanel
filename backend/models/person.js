'use strict'
module.exports = (sequelize, DataTypes) => {
  var person = sequelize.define('person', {
    name: DataTypes.STRING,
    twitter: DataTypes.STRING,
    mbox: DataTypes.STRING,
    persona: DataTypes.STRING,
    detectableId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {})
  person.associate = (models) => {
    // associations can be defined here
    models.person.belongsTo(models.author, {foreignKey: 'authorId'})
    models.person.belongsTo(models.detectable, {foreignKey: 'detectableId'})
  }
  return person
}
