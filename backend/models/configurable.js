module.exports = (sequelize, DataTypes) => {
  var configurable = sequelize.define('configurable', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    category: DataTypes.STRING,
    authorId: DataTypes.INTEGER
  }, {})
  configurable.associate = (models) => {
    // associations can be defined here
  }
  return configurable
}
