module.exports = (sequelize, DataTypes) => {
  var entity = sequelize.define('entity', {
    name: DataTypes.STRING,
    type: DataTypes.STRING
  }, {})
  return entity
}
