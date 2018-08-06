const thing = require('../models').thing
const poi = require('../models').poi
const author = require('../models').author
const detectable = require('../models').detectable
const validationMiddleware = require('../helpers/validationMiddleware')
const validationRules = require('../helpers/validationRules')

module.exports = (app) => {
  app.get('/api/tangible/thing', validationMiddleware.validate(), (req, res) => {
    thing.findAll({ include: [poi], order: [['id', 'DESC']] }).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })

  app.get('/api/tangible/thing/:id', validationMiddleware.validate(), (req, res) => {
    thing.find({include: [poi, author, detectable], where: {id: req.params.id}}).then((object) => {
      if (object === null) {
        res.status(401).json({ messages: 'Thing does not exists' })
      } else {
        res.json(object)
      }
    })
  })

  app.post('/api/tangible/thing', validationMiddleware.validate(validationRules.tangilbe.thing), (req, res) => {
    thing.create({
      name: req.body.name,
      urn: req.body.urn,
      detectableId: req.body.detectable,
      authorId: req.author.id
    }).then(async (object) => {
      if (object === null) {
        res.json([])
      } else {
        if (req.body.poi.length > 0) {
          for (var i = 0; i < req.body.poi.length; i++) {
            await poi.create({
              name: req.body.poi[i].name,
              x: req.body.poi[i].x,
              y: req.body.poi[i].y,
              z: req.body.poi[i].z,
              thingId: object.id
            })
          }
          object.pois = await poi.findAll({where: {thingId: object.id}})
        }
        res.json(object)
      }
    })
  })

  app.put('/api/tangible/thing/:id', validationMiddleware.validate(validationRules.tangilbe.thing), (req, res) => {
    thing.find({where: {id: req.params.id}}).then((object) => {
      if (object !== null) {
        object.updateAttributes({
          name: req.body.name,
          id_name: req.body.id_name,
          urn: req.body.urn,
          detectableId: req.body.detectable,
          authorId: req.author.id
        }).then(async (innerObject) => {
          if (innerObject !== null) {
            poi.destroy({where: {thingId: object.id}})
            if (req.body.poi.length > 0) {
              for (var i = 0; i < req.body.poi.length; i++) {
                await poi.create({
                  name: req.body.poi[i].name,
                  x: req.body.poi[i].x,
                  y: req.body.poi[i].y,
                  z: req.body.poi[i].z,
                  relativeTo: req.body.poi[i].relativeTo,
                  thingId: object.id
                })
              }
              object.pois = await poi.findAll({where: {thingId: object.id}})
            }
            res.json(object)
          } else {
            res.status(500).json({ messages: 'An unexpected error occured' })
          }
        })
      } else {
        res.status(401).json({ messages: 'Thing does not exists' })
      }
    })
  })

  app.delete('/api/tangible/thing/:id', validationMiddleware.validate(), (req, res) => {
    thing.find({where: {id: req.params.id}}).then((object) => {
      if (object !== null) {
        object.destroy().then((innerObject) => {
          if (innerObject !== null) {
            res.status(200).json({ messages: 'Thing has been deleted successfully' })
          } else {
            res.status(500).json({ messages: 'An unexpected error occured' })
          }
        })
      } else {
        res.status(401).json({ messages: 'Thing does not exists' })
      }
    })
  })
}
