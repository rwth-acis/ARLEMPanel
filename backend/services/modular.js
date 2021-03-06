const modular = require('../models').modular
const validationMiddleware = require('../helpers/validationMiddleware')
const validationRules = require('../helpers/validationRules')
const config = require('../../config/default.json')

module.exports = (app) => {
  app.get(config.apiBaseUrl + '/module', validationMiddleware.validate(), (req, res) => {
    modular.findAll({ order: [['id', 'DESC']] }).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })

  app.post(config.apiBaseUrl + '/module', validationMiddleware.validate(validationRules.tangilbe.person), (req, res) => {
    modular.create({
      name: req.body.name,
      authorId: req.author.id
    }).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })

  app.put(config.apiBaseUrl + '/module/:id', validationMiddleware.validate(validationRules.tangilbe.person), (req, res) => {
    modular.find({where: {id: req.params.id}}).then((object) => {
      if (object !== null) {
        object.updateAttributes({
          name: req.body.name,
          authorId: req.author.id
        }).then((innerObject) => {
          if (innerObject !== null) {
            res.json(object)
          } else {
            res.status(500).json({ messages: 'An unexpected error occured' })
          }
        })
      } else {
        res.status(401).json({ messages: 'Person does not exists' })
      }
    })
  })

  app.delete(config.apiBaseUrl + '/module/:id', validationMiddleware.validate(), (req, res) => {
    modular.find({where: {id: req.params.id}}).then((object) => {
      if (object !== null) {
        object.destroy().then((innerObject) => {
          if (innerObject !== null) {
            res.status(200).json({ messages: 'Person has been deleted successfully' })
          } else {
            res.status(500).json({ messages: 'An unexpected error occured' })
          }
        })
      } else {
        res.status(401).json({ messages: 'Person does not exists' })
      }
    })
  })
}
