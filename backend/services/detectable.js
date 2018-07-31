const detectable = require('../models').detectable
const validationMiddleware = require('../helpers/validationMiddleware')
const validationRules = require('../helpers/validationRules')

module.exports = (app) => {
  app.get('/api/trigger/detectable', validationMiddleware.validate(), (req, res) => {
    detectable.findAll({ order: [['id', 'DESC']] }).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })

  app.get('/api/trigger/detectable/:id', validationMiddleware.validate(), (req, res) => {
    detectable.find({where: {id: req.params.id}}).then((object) => {
      if (object === null) {
        res.status(401).json({ messages: 'Detectable does not exists' })
      } else {
        res.json(object)
      }
    })
  })

  app.post('/api/trigger/detectable', validationMiddleware.validate(validationRules.trigger.detectable), (req, res) => {
    detectable.create({
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

  app.put('/api/trigger/detectable/:id', validationMiddleware.validate(validationRules.trigger.detectable), (req, res) => {
    detectable.find({where: {id: req.params.id}}).then((object) => {
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

  app.delete('/api/trigger/detectable/:id', validationMiddleware.validate(), (req, res) => {
    detectable.find({where: {id: req.params.id}}).then((object) => {
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
