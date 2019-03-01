const sensor = require('../models').sensor
const author = require('../models').author
const validationMiddleware = require('../helpers/validationMiddleware')
const validationRules = require('../helpers/validationRules')
const config = require('../../config/default.json')

module.exports = (app) => {
  app.get(config.baseUrl + '/api/sensor', validationMiddleware.validate(), (req, res) => {
    const options = {
      page: req.query.page && req.query.page > 0 ? req.query.page : 1,
      paginate: 25,
      include: [author],
      order: [['createdAt', 'DESC']]
    }
    sensor.paginate(options).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })

  app.get(config.baseUrl + '/api/sensor/select', validationMiddleware.validate(), (req, res) => {
    const options = {
      include: [author],
      order: [['createdAt', 'DESC']]
    }
    sensor.findAll(options).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })

  app.get(config.baseUrl + '/api/sensor/:id', validationMiddleware.validate(), (req, res) => {
    sensor.find({where: {id: req.params.id}}).then((object) => {
      if (object === null) {
        res.status(401).json({ messages: 'Detectable does not exists' })
      } else {
        res.json(object)
      }
    })
  })

  app.post(config.baseUrl + '/api/sensor', validationMiddleware.validate(validationRules.sensor), (req, res) => {
    sensor.create({
      name: req.body.name,
      sensor: req.body.sensor,
      type: req.body.type,
      url: req.body.url,
      authorId: req.author.id
    }).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })

  app.put(config.baseUrl + '/api/sensor/:id', validationMiddleware.validate(validationRules.sensor), (req, res) => {
    sensor.find({where: {id: req.params.id}}).then((object) => {
      if (object !== null) {
        object.updateAttributes({
          name: req.body.name,
          sensor: req.body.sensor,
          type: req.body.type,
          url: req.body.url,
          authorId: req.author.id
        }).then((innerObject) => {
          if (innerObject !== null) {
            res.json(object)
          } else {
            res.status(500).json({ messages: 'An unexpected error occured' })
          }
        })
      } else {
        res.status(401).json({ messages: 'Detectable does not exists' })
      }
    })
  })

  app.delete(config.baseUrl + '/api/sensor/:id', validationMiddleware.validate(), (req, res) => {
    sensor.find({where: {id: req.params.id}}).then((object) => {
      if (object !== null) {
        object.destroy().then((innerObject) => {
          if (innerObject !== null) {
            res.status(200).json({ messages: 'Detectable has been deleted successfully' })
          } else {
            res.status(500).json({ messages: 'An unexpected error occured' })
          }
        })
      } else {
        res.status(401).json({ messages: 'Detectable does not exists' })
      }
    })
  })
}
