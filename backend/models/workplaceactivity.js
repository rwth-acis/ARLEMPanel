'use strict'
module.exports = (sequelize, DataTypes) => {
  var workplaceActivity = sequelize.define('workplaceActivity', {
    workplaceId: DataTypes.INTEGER,
    activitiesId: DataTypes.INTEGER
  }, {})
  workplaceActivity.associate = (models) => {
    // associations can be defined here
  }
  return workplaceActivity
}
