const sequelizePaginate = require('sequelize-paginate')
module.exports = (sequelize, DataTypes) => {
  var workplace = sequelize.define('workplace', {
    name: DataTypes.STRING,
    authorId: DataTypes.INTEGER
  }, {})
  workplace.associate = (models) => {
    // associations can be defined here
    models.workplace.belongsTo(models.author, {foreignKey: 'authorId'})
    models.workplace.hasMany(models.workplaceResource, {foreignKey: 'workplaceId'})
  }
  sequelizePaginate.paginate(workplace)
  return workplace
}
