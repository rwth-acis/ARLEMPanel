const configurable = require('../models').configurable
const author = require('../models').author
const validationMiddleware = require('../helpers/validationMiddleware')

module.exports = (app) => {
  app.get('/api/configurable', validationMiddleware.validate(), (req, res) => {
    const options = {
      page: req.query.page && req.query.page > 0 ? req.query.page : 1,
      paginate: 25,
      include: [author],
      order: [['createdAt', 'DESC']]
    }
    configurable.paginate(options).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })
}
