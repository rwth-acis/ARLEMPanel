module.exports = (sequelize, DataTypes) => {
  var modular = sequelize.define('modular', {
    name: DataTypes.STRING
  }, {})
  modular.associate = (models) => {
    // associations can be defined here
  }
  return modular
}
