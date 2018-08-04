module.exports = (sequelize, DataTypes) => {
  var actionTrigger = sequelize.define('actionTrigger', {
    actionId: DataTypes.INTEGER,
    mode: DataTypes.STRING,
    operation: DataTypes.STRING,
    removeSelf: DataTypes.INTEGER,
    entityType: DataTypes.STRING,
    entityId: DataTypes.INTEGER,
    poiId: DataTypes.INTEGER,
    viewportId: DataTypes.STRING,
    primitiveId: DataTypes.INTEGER,
    option: DataTypes.STRING,
    value: DataTypes.STRING
  }, {})
  actionTrigger.associate = (models) => {
    // associations can be defined here
    models.actionTrigger.belongsTo(models.action, {foreignKey: 'actionId'})
    models.actionTrigger.belongsTo(models.viewport, {foreignKey: 'viewportId'})
    models.actionTrigger.belongsTo(models.primitive, {foreignKey: 'primitiveId'})
    models.actionTrigger.belongsTo(models.poi, {foreignKey: 'poiId'})
  }
  return actionTrigger
}
