module.exports = (sequelize, DataTypes) => {
  var app = sequelize.define('app', {
    name: DataTypes.STRING,
    manifest: DataTypes.STRING,
    type: DataTypes.INTEGER,
    author: DataTypes.INTEGER
  }, {})
  app.associate = (models) => {
    // associations can be defined here
  }
  return app
}
