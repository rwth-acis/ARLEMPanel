const trigger = require('../models').trigger
const validationMiddleware = require('../helpers/validationMiddleware')

module.exports = (app) => {
  app.get('/api/trigger', validationMiddleware.validate(), (req, res) => {
    trigger.findAll({ order: [['createdAt', 'DESC']] }).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })
}
