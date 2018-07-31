'use strict'
module.exports = (sequelize, DataTypes) => {
  var workplaceActivity = sequelize.define('workplaceActivity', {
    workplace_id: DataTypes.INTEGER,
    activities_id: DataTypes.INTEGER
  }, {})
  workplaceActivity.associate = (models) => {
    // associations can be defined here
  }
  return workplaceActivity
}
