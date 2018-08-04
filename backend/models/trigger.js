module.exports = (sequelize, DataTypes) => {
  var trigger = sequelize.define('trigger', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    type: DataTypes.STRING,
    authorId: DataTypes.INTEGER
  }, {})
  trigger.associate = (models) => {
    // associations can be defined here
    models.trigger.belongsTo(models.author, {foreignKey: 'authorId'})
  }
  return trigger
}
