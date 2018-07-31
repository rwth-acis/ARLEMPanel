module.exports = (sequelize, DataTypes) => {
  var trigger = sequelize.define('triggers', {
    name: DataTypes.STRING,
    manifest: DataTypes.STRING,
    type: DataTypes.INTEGER,
    author: DataTypes.INTEGER
  }, {})
  trigger.associate = (models) => {
    // associations can be defined here
  }
  return trigger
}
