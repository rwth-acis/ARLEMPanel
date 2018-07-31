const configurable = require('../models').configurable
const validationMiddleware = require('../helpers/validationMiddleware')

module.exports = (app) => {
  app.get('/api/configurable', validationMiddleware.validate(), (req, res) => {
    configurable.findAll({ order: [['createdAt', 'DESC']] }).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })
}
