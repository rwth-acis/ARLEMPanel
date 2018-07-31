'use strict'
module.exports = (sequelize, DataTypes) => {
  var person = sequelize.define('person', {
    name: DataTypes.STRING,
    twitter: DataTypes.STRING,
    mbox: DataTypes.STRING,
    persona: DataTypes.STRING,
    detectable: DataTypes.INTEGER,
    author: DataTypes.INTEGER
  }, {})
  person.associate = (models) => {
    // associations can be defined here
  }
  return person
}
