const sequelizePaginate = require('sequelize-paginate')
module.exports = (sequelize, DataTypes) => {
  var activity = sequelize.define('activity', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    language: DataTypes.STRING,
    workplaceId: DataTypes.INTEGER,
    start: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {})
  activity.associate = (models) => {
    // associations can be defined here
    models.activity.belongsTo(models.author, {foreignKey: 'authorId'})
    models.activity.belongsTo(models.workplace, {foreignKey: 'workplaceId'})
    models.activity.hasMany(models.action, {foreignKey: 'activityId'})
  }
  sequelizePaginate.paginate(activity)
  return activity
}
