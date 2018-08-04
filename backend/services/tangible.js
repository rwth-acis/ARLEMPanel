const tangible = require('../models').tangible
const author = require('../models').author
const validationMiddleware = require('../helpers/validationMiddleware')

module.exports = (app) => {
  app.get('/api/tangible', validationMiddleware.validate(), (req, res) => {
    tangible.findAll({ order: [['createdAt', 'DESC']], include: [author] }).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })
}
