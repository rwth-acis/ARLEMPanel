const trigger = require('../models').trigger
const author = require('../models').author
const validationMiddleware = require('../helpers/validationMiddleware')
const config = require('../../config/default.json')

module.exports = (app) => {
  app.get(config.baseUrl + '/api/trigger', validationMiddleware.validate(), (req, res) => {
    const options = {
      page: req.query.page && req.query.page > 0 ? req.query.page : 1,
      paginate: 5,
      include: [author],
      order: [['createdAt', 'DESC']]
    }
    trigger.paginate(options).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })
}
