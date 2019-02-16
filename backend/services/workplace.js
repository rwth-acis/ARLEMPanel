const workplace = require('../models').workplace
const entity = require('../models').entity
const viewport = require('../models').viewport
const activity = require('../models').activity
const detectable = require('../models').detectable
const workplaceResource = require('../models').workplaceResource
const pois = require('../models').poi
const author = require('../models').author
const action = require('../models').action
const actionTrigger = require('../models').actionTrigger
const primitive = require('../models').primitive
const device = require('../models').device
const place = require('../models').place
const modular = require('../models').modular
const validationMiddleware = require('../helpers/validationMiddleware')
const validationRules = require('../helpers/validationRules')
const xmlGenerator = require('../helpers/xmlGenerator')

module.exports = (app) => {
  app.get('/api/entity', validationMiddleware.validate(), (req, res) => {
    if (req.params.term !== '') {
      entity.findAll({ where: { name: { $like: '%' + req.query.term + '%' } }, order: [['id', 'DESC']] }).then((objects) => {
        if (objects === null) {
          res.json([])
        } else {
          res.json(objects)
        }
      })
    } else {
      entity.findAll({ order: [['id', 'DESC']] }).then((objects) => {
        if (objects === null) {
          res.json([])
        } else {
          res.json(objects)
        }
      })
    }
  })

  app.get('/api/entity/:type', validationMiddleware.validate(), (req, res) => {
    entity.findAll({ where: {type: req.params.type}, order: [['id', 'DESC']] }).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })

  app.get('/api/entity/:type/:workplace', validationMiddleware.validate(), (req, res) => {
    workplaceResource.findAll({attributes: [], where: {entityType: req.params.type, workplaceId: req.params.workplace}, include: [{model: entity, where: {type: req.params.type}, required: true}]}).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects.map(object => object.entity))
      }
    })
  })

  app.get('/api/viewport', validationMiddleware.validate(), (req, res) => {
    viewport.findAll({ order: [['id', 'DESC']] }).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })

  app.get('/api/workplace', validationMiddleware.validate(), (req, res) => {
    const options = {
      page: req.query.page && req.query.page > 0 ? req.query.page : 1,
      paginate: 25,
      include: [author],
      order: [['id', 'DESC']]
    }
    if (req.query.select === 'true') {
      workplace.findAll({include: [author], order: [['id', 'DESC']]}).then((objects) => {
        if (objects === null) {
          res.json([])
        } else {
          res.json(objects)
        }
      })
    } else {
      workplace.paginate(options).then((objects) => {
        if (objects === null) {
          res.json([])
        } else {
          res.json(objects)
        }
      })
    }
  })

  app.get('/api/workplace/:id', validationMiddleware.validate(), (req, res) => {
    workplace.find({where: {id: req.params.id}, include: [{model: author}, {model: workplaceResource}]}).then(async (object) => {
      if (object === null) {
        res.status(401).json({ messages: 'Workplace does not exists' })
      } else {
        var workplace = {
          id: object.id,
          name: object.name,
          createdAt: object.createdAt,
          updatedAt: object.updatedAt,
          author: object.author
        }
        for (var i = 0; i < object.workplaceResources.length; i++) {
          if (object.workplaceResources[i].entityId !== null && object.workplaceResources[i].entityType != null) {
            if (object.workplaceResources[i].entityType === 'person') {
              if (!workplace.tangibles) {
                workplace.tangibles = {}
              }
              if (!workplace.tangibles.persons) {
                workplace.tangibles.persons = []
              }
              let entity = await require('../models')[object.workplaceResources[i].entityType].find({where: {id: object.workplaceResources[i].entityId}, include: [author, detectable]})
              if (entity && entity !== null) {
                workplace.tangibles.persons.push(entity)
              }
            } else if (object.workplaceResources[i].entityType === 'place') {
              if (!workplace.tangibles) {
                workplace.tangibles = {}
              }
              if (!workplace.tangibles.places) {
                workplace.tangibles.places = []
              }
              let entity = await require('../models')[object.workplaceResources[i].entityType].find({where: {id: object.workplaceResources[i].entityId}, include: [author, detectable]})
              if (entity && entity !== null) {
                workplace.tangibles.places.push(entity)
              }
            } else if (object.workplaceResources[i].entityType === 'thing') {
              if (!workplace.tangibles) {
                workplace.tangibles = {}
              }
              if (!workplace.tangibles.things) {
                workplace.tangibles.things = []
              }
              let entity = await require('../models')[object.workplaceResources[i].entityType].find({where: {id: object.workplaceResources[i].entityId}, include: [author, pois, detectable]})
              if (entity && entity !== null) {
                workplace.tangibles.things.push(entity)
              }
            } else if (object.workplaceResources[i].entityType === 'warning') {
              if (!workplace.triggers) {
                workplace.triggers = {}
              }
              if (!workplace.triggers.warnings) {
                workplace.triggers.warnings = []
              }
              let entity = await require('../models')['primitive'].find({where: {id: object.workplaceResources[i].entityId}, include: [author]})
              if (entity && entity !== null) {
                workplace.triggers.warnings.push(entity)
              }
            } else if (object.workplaceResources[i].entityType === 'hazard') {
              if (!workplace.triggers) {
                workplace.triggers = {}
              }
              if (!workplace.triggers.hazards) {
                workplace.triggers.hazards = []
              }
              let entity = await require('../models')['primitive'].find({where: {id: object.workplaceResources[i].entityId}, include: [author]})
              if (entity && entity !== null) {
                workplace.triggers.hazards.push(entity)
              }
            } else if (object.workplaceResources[i].entityType === 'predicate') {
              if (!workplace.triggers) {
                workplace.triggers = {}
              }
              if (!workplace.triggers.predicates) {
                workplace.triggers.predicates = []
              }

              let entity = await require('../models')['primitive'].find({where: {id: object.workplaceResources[i].entityId}, include: [author]})
              if (entity && entity !== null) {
                workplace.triggers.predicates.push(entity)
              }
            } else if (object.workplaceResources[i].entityType === 'app') {
              if (!workplace.configurables) {
                workplace.configurables = {}
              }
              if (!workplace.configurables.apps) {
                workplace.configurables.apps = []
              }
              let entity = await require('../models')['app'].find({where: {id: object.workplaceResources[i].entityId}, include: [author]})
              if (entity && entity !== null) {
                workplace.triggers.apps.push(entity)
              }
            } else if (object.workplaceResources[i].entityType === 'device') {
              if (!workplace.configurables) {
                workplace.configurables = {}
              }
              if (!workplace.configurables.devices) {
                workplace.configurables.devices = []
              }
              let entity = await require('../models')['device'].find({where: {id: object.workplaceResources[i].entityId}, include: [author]})
              if (entity && entity !== null) {
                workplace.triggers.devices.push(entity)
              }
            } else if (object.workplaceResources[i].entityType === 'sensor') {
              if (!workplace.sensors) {
                workplace.sensors = []
              }
              let entity = await require('../models')['sensor'].find({where: {id: object.workplaceResources[i].entityId}, include: [author]})
              if (entity && entity !== null) {
                workplace.sensors.push(entity)
              }
            }
          }
        }
        var activities = await activity.findAll({where: {workplaceId: req.params.id}})
        if (activities !== null && activities.length > 0) {
          activities = await activity.findAll({where: {workplaceId: req.params.id}, include: [{model: author}, {model: action, include: [{model: device}, {model: place}, {model: primitive}, {model: viewport}, {model: actionTrigger, include: [viewport, primitive, pois, modular]}]}]})
          activities = JSON.parse(JSON.stringify(activities))
          for (var h = 0; h < activities.length; h++) {
            for (i = 0; i < activities[h].actions.length; i++) {
              for (var j = 0; j < activities[h].actions[i].actionTriggers.length; j++) {
                if (activities[h].actions[i].actionTriggers[j].entityId !== null && activities[h].actions[i].actionTriggers[j].entityType != null) {
                  activities[h].actions[i].actionTriggers[j].entity = await require('../models')[activities[h].actions[i].actionTriggers[j].entityType].find({where: {id: activities[h].actions[i].actionTriggers[j].entityId}})
                }
              }
            }
          }
          workplace.activities = activities
        }
        var contype = req.headers['content-type']
        if (!contype || contype.indexOf('application/json') !== 0) {
          res.set('Content-Type', 'text/xml')
          res.send(xmlGenerator(workplace, 'workplace').end({ pretty: true }))
        } else {
          res.json(workplace)
        }
      }
    })
  })

  app.post('/api/workplace', validationMiddleware.validate(validationRules.workplace), (req, res) => {
    workplace.create({
      name: req.body.name,
      authorId: req.author.id
    }).then(async (object) => {
      if (object === null) {
        res.json([])
      } else {
        if (req.body.items.length > 0) {
          for (var i = 0; i < req.body.items.length; i++) {
            await workplaceResource.create({
              entityId: req.body.items[i].id,
              entityType: req.body.items[i].type,
              workplaceId: object.id,
              authorId: req.author.id
            })
          }
          object.pois = await workplaceResource.findAll({where: {workplaceId: object.id}})
        }
        res.json(object)
      }
    })
  })

  app.put('/api/workplace/:id', validationMiddleware.validate(validationRules.workplace), (req, res) => {
    workplace.find({where: {id: req.params.id}}).then((object) => {
      if (object !== null) {
        object.updateAttributes({
          name: req.body.name,
          authorId: req.author.id
        }).then(async (innerObject) => {
          if (innerObject !== null) {
            workplaceResource.destroy({where: {workplaceId: object.id}})
            if (req.body.items.length > 0) {
              for (var i = 0; i < req.body.items.length; i++) {
                await workplaceResource.create({
                  entityId: req.body.items[i].id,
                  entityType: req.body.items[i].type,
                  workplaceId: object.id,
                  authorId: req.author.id
                })
              }
              object.pois = await workplaceResource.findAll({where: {workplaceId: object.id}})
            }
            res.json(object)
          } else {
            res.status(500).json({ messages: 'An unexpected error occured' })
          }
        })
      } else {
        res.status(401).json({ messages: 'Workplace does not exists' })
      }
    })
  })

  app.delete('/api/workplace/:id', validationMiddleware.validate(), (req, res) => {
    workplace.find({where: {id: req.params.id}}).then((object) => {
      if (object !== null) {
        object.destroy().then((innerObject) => {
          if (innerObject !== null) {
            res.status(200).json({ messages: 'Workplace has been deleted successfully' })
          } else {
            res.status(500).json({ messages: 'An unexpected error occured' })
          }
        })
      } else {
        res.status(401).json({ messages: 'Workplace does not exists' })
      }
    })
  })
}
