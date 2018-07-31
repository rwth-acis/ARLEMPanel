module.exports = (sequelize, DataTypes) => {
  var author = sequelize.define('author', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING
  }, {})
  author.associate = (models) => {
    // associations can be defined here
  }
  return author
}
