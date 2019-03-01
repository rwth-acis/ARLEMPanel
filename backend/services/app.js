const phoneApp = require('../models').app
const validationMiddleware = require('../helpers/validationMiddleware')
const validationRules = require('../helpers/validationRules')
const config = require('../../config/default.json')

module.exports = (app) => {
  app.get(config.baseUrl + '/api/configurable/app', validationMiddleware.validate(), (req, res) => {
    phoneApp.findAll({ order: [['id', 'DESC']] }).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })

  app.get(config.baseUrl + '/api/configurable/app/:id', validationMiddleware.validate(), (req, res) => {
    phoneApp.find({where: {id: req.params.id}}).then((object) => {
      if (object === null) {
        res.status(401).json({ messages: 'App does not exists' })
      } else {
        res.json(object)
      }
    })
  })

  app.post(config.baseUrl + '/api/configurable/app', validationMiddleware.validate(validationRules.configurable.app), (req, res) => {
    phoneApp.create({
      name: req.body.name,
      manifest: req.body.manifest,
      type: req.body.type,
      authorId: req.author.id
    }).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })

  app.put(config.baseUrl + '/api/configurable/app/:id', validationMiddleware.validate(validationRules.configurable.app), (req, res) => {
    phoneApp.find({where: {id: req.params.id}}).then((object) => {
      if (object !== null) {
        object.updateAttributes({
          name: req.body.name,
          manifest: req.body.manifest,
          type: req.body.type,
          authorId: req.author.id
        }).then((innerObject) => {
          if (innerObject !== null) {
            res.json(object)
          } else {
            res.status(500).json({ messages: 'An unexpected error occured' })
          }
        })
      } else {
        res.status(401).json({ messages: 'App does not exists' })
      }
    })
  })

  app.delete(config.baseUrl + '/api/configurable/app/:id', validationMiddleware.validate(), (req, res) => {
    phoneApp.find({where: {id: req.params.id}}).then((object) => {
      if (object !== null) {
        object.destroy().then((innerObject) => {
          if (innerObject !== null) {
            res.status(200).json({ messages: 'App has been deleted successfully' })
          } else {
            res.status(500).json({ messages: 'An unexpected error occured' })
          }
        })
      } else {
        res.status(401).json({ messages: 'App does not exists' })
      }
    })
  })
}
