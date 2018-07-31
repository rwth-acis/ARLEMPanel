module.exports = (sequelize, DataTypes) => {
  var tangible = sequelize.define('tangible', {
    name: DataTypes.STRING,
    urn: DataTypes.STRING,
    type: DataTypes.STRING,
    detectableId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {})
  tangible.associate = (models) => {
    // associations can be defined here
  }
  return tangible
}
