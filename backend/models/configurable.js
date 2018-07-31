module.exports = (sequelize, DataTypes) => {
  var configurable = sequelize.define('configurables', {
    name: DataTypes.STRING,
    manifest: DataTypes.STRING,
    type: DataTypes.INTEGER,
    author: DataTypes.INTEGER
  }, {})
  configurable.associate = (models) => {
    // associations can be defined here
  }
  return configurable
}
