const device = require('../models').device
const validationMiddleware = require('../helpers/validationMiddleware')
const validationRules = require('../helpers/validationRules')

module.exports = (app) => {
  app.get('/api/configurable/device', validationMiddleware.validate(), (req, res) => {
    device.findAll({ order: [['id', 'DESC']] }).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })

  app.get('/api/configurable/device/:id', validationMiddleware.validate(), (req, res) => {
    device.find({where: {id: req.params.id}}).then((object) => {
      if (object === null) {
        res.status(401).json({ messages: 'Person does not exists' })
      } else {
        res.json(object)
      }
    })
  })

  app.post('/api/configurable/device', validationMiddleware.validate(validationRules.configurable.device), (req, res) => {
    device.create({
      name: req.body.name,
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

  app.put('/api/configurable/device/:id', validationMiddleware.validate(validationRules.configurable.device), (req, res) => {
    device.find({where: {id: req.params.id}}).then((object) => {
      if (object !== null) {
        object.updateAttributes({
          name: req.body.name,
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
        res.status(401).json({ messages: 'Person does not exists' })
      }
    })
  })

  app.delete('/api/configurable/device/:id', validationMiddleware.validate(), (req, res) => {
    device.find({where: {id: req.params.id}}).then((object) => {
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
