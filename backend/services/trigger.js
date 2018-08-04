const trigger = require('../models').trigger
const author = require('../models').author
const validationMiddleware = require('../helpers/validationMiddleware')

module.exports = (app) => {
  app.get('/api/trigger', validationMiddleware.validate(), (req, res) => {
    trigger.findAll({order: [['createdAt', 'DESC']], include: [author]}).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })
}
