const tangible = require('../models').tangible
const author = require('../models').author
const validationMiddleware = require('../helpers/validationMiddleware')
const config = require('../../config/default.json')

module.exports = (app) => {
  app.get(config.baseUrl + '/api/tangible', validationMiddleware.validate(), (req, res) => {
    const options = {
      page: req.query.page && req.query.page > 0 ? req.query.page : 1,
      paginate: 25,
      include: [author],
      order: [['createdAt', 'DESC']]
    }
    tangible.paginate(options).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })
}
