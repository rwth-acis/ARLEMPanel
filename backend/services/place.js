const place = require('../models').place
const validationMiddleware = require('../helpers/validationMiddleware')
const validationRules = require('../helpers/validationRules')
const config = require('../../config/default.json')

module.exports = (app) => {
  app.get(config.apiBaseUrl + '/tangible/place', validationMiddleware.validate(), (req, res) => {
    place.findAll({ order: [['id', 'DESC']] }).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })

  app.get(config.apiBaseUrl + '/tangible/place/:id', validationMiddleware.validate(), (req, res) => {
    place.find({where: {id: req.params.id}}).then((object) => {
      if (object === null) {
        res.status(401).json({ messages: 'Place does not exists' })
      } else {
        res.json(object)
      }
    })
  })

  app.post(config.apiBaseUrl + '/tangible/place', validationMiddleware.validate(validationRules.tangilbe.place), (req, res) => {
    place.create({
      name: req.body.name,
      detectableId: req.body.detectable,
      authorId: req.author.id
    }).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })

  app.put(config.apiBaseUrl + '/tangible/place/:id', validationMiddleware.validate(validationRules.tangilbe.place), (req, res) => {
    place.find({where: {id: req.params.id}}).then((object) => {
      if (object !== null) {
        object.updateAttributes({
          name: req.body.name,
          detectableId: req.body.detectable,
          authorId: req.author.id
        }).then((innerObject) => {
          if (innerObject !== null) {
            res.json(object)
          } else {
            res.status(500).json({ messages: 'An unexpected error occured' })
          }
        })
      } else {
        res.status(401).json({ messages: 'Place does not exists' })
      }
    })
  })

  app.delete(config.apiBaseUrl + '/tangible/place/:id', validationMiddleware.validate(), (req, res) => {
    place.find({where: {id: req.params.id}}).then((object) => {
      if (object !== null) {
        object.destroy().then((innerObject) => {
          if (innerObject !== null) {
            res.status(200).json({ messages: 'Place has been deleted successfully' })
          } else {
            res.status(500).json({ messages: 'An unexpected error occured' })
          }
        })
      } else {
        res.status(401).json({ messages: 'Place does not exists' })
      }
    })
  })
}
