const primitive = require('../models').primitive
const validationMiddleware = require('../helpers/validationMiddleware')
const validationRules = require('../helpers/validationRules')
const config = require('../../config/default.json')

module.exports = (app) => {
  app.get(config.baseUrl + '/api/trigger/primitive', validationMiddleware.validate(), (req, res) => {
    primitive.findAll({ order: [['id', 'DESC']] }).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })

  app.get(config.baseUrl + '/api/trigger/primitive/:id', validationMiddleware.validate(), (req, res) => {
    primitive.find({where: {id: req.params.id}}).then((object) => {
      if (object === null) {
        res.status(401).json({ messages: 'Primitive does not exists' })
      } else {
        res.json(object)
      }
    })
  })

  app.post(config.baseUrl + '/api/trigger/primitive', validationMiddleware.validate(validationRules.trigger.primitive), (req, res) => {
    primitive.create({
      name: req.body.name,
      category: req.body.category,
      type: req.body.type,
      symbol: req.body.symbol,
      size: req.body.size,
      url: req.body.url,
      option: req.body.option,
      authorId: req.author.id
    }).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })

  app.put(config.baseUrl + '/api/trigger/primitive/:id', validationMiddleware.validate(validationRules.trigger.primitive), (req, res) => {
    primitive.find({where: {id: req.params.id}}).then((object) => {
      if (object !== null) {
        object.updateAttributes({
          name: req.body.name,
          category: req.body.category,
          type: req.body.type,
          symbol: req.body.symbol,
          size: req.body.size,
          url: req.body.url,
          option: req.body.option,
          authorId: req.author.id
        }).then((innerObject) => {
          if (innerObject !== null) {
            res.json(object)
          } else {
            res.status(500).json({ messages: 'An unexpected error occured' })
          }
        })
      } else {
        res.status(401).json({ messages: 'Primitive does not exists' })
      }
    })
  })

  app.delete(config.baseUrl + '/api/trigger/primitive/:id', validationMiddleware.validate(), (req, res) => {
    primitive.find({where: {id: req.params.id}}).then((object) => {
      if (object !== null) {
        object.destroy().then((innerObject) => {
          if (innerObject !== null) {
            res.status(200).json({ messages: 'Primitive has been deleted successfully' })
          } else {
            res.status(500).json({ messages: 'An unexpected error occured' })
          }
        })
      } else {
        res.status(401).json({ messages: 'Primitive does not exists' })
      }
    })
  })
}
