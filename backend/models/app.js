module.exports = (sequelize, DataTypes) => {
  var app = sequelize.define('app', {
    name: DataTypes.STRING,
    manifest: DataTypes.STRING,
    type: DataTypes.STRING,
    authorId: DataTypes.INTEGER
  }, {})
  app.associate = (models) => {
    // associations can be defined here
    models.app.belongsTo(models.author, {foreignKey: 'authorId'})
  }
  return app
}
