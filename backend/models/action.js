module.exports = (sequelize, DataTypes) => {
  var action = sequelize.define('action', {
    activityId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    viewportId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    deviceId: DataTypes.INTEGER,
    placeId: DataTypes.INTEGER,
    primitiveId: DataTypes.INTEGER,
    instructionTitle: DataTypes.STRING,
    instructionDescription: DataTypes.STRING
  }, {})
  action.associate = (models) => {
    // associations can be defined here
    models.action.belongsTo(models.activity, {foreignKey: 'activityId'})
    models.action.belongsTo(models.viewport, {foreignKey: 'viewportId'})
    models.action.belongsTo(models.device, {foreignKey: 'deviceId'})
    models.action.belongsTo(models.place, {foreignKey: 'placeId'})
    models.action.belongsTo(models.primitive, {foreignKey: 'primitiveId'})
    models.action.hasMany(models.actionTrigger, {foreignKey: 'actionId'})
  }
  return action
}
