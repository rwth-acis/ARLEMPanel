const person = require('../models').person
const validationMiddleware = require('../helpers/validationMiddleware')
const validationRules = require('../helpers/validationRules')
const config = require('../../config/default.json')

module.exports = (app) => {
  app.get(config.baseUrl + '/api/tangible/person', validationMiddleware.validate(), (req, res) => {
    person.findAll({ order: [['id', 'DESC']] }).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })

  app.get(config.baseUrl + '/api/tangible/person/:id', validationMiddleware.validate(), (req, res) => {
    person.find({where: {id: req.params.id}}).then((object) => {
      if (object === null) {
        res.status(401).json({ messages: 'Person does not exists' })
      } else {
        res.json(object)
      }
    })
  })

  app.post(config.baseUrl + '/api/tangible/person', validationMiddleware.validate(validationRules.tangilbe.person), (req, res) => {
    person.create({
      name: req.body.name,
      twitter: req.body.twitter,
      mbox: req.body.mbox,
      detectableId: req.body.detectable,
      persona: req.body.persona,
      authorId: req.author.id
    }).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })

  app.put(config.baseUrl + '/api/tangible/person/:id', validationMiddleware.validate(validationRules.tangilbe.person), (req, res) => {
    person.find({where: {id: req.params.id}}).then((object) => {
      if (object !== null) {
        object.updateAttributes({
          name: req.body.name,
          twitter: req.body.twitter,
          mbox: req.body.mbox,
          detectableId: req.body.detectable,
          persona: req.body.persona,
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

  app.delete(config.baseUrl + '/api/tangible/person/:id', validationMiddleware.validate(), (req, res) => {
    person.find({where: {id: req.params.id}}).then((object) => {
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
