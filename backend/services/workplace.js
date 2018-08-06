const workplace = require('../models').workplace
const entity = require('../models').entity
const viewport = require('../models').viewport
const workplaceResource = require('../models').workplaceResource
const author = require('../models').author
const validationMiddleware = require('../helpers/validationMiddleware')
const validationRules = require('../helpers/validationRules')

module.exports = (app) => {
  app.get('/api/entity', validationMiddleware.validate(), (req, res) => {
    if (req.params.term === '') {
      entity.findAll({ order: [['id', 'DESC']] }).then((objects) => {
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
    workplace.paginate(options).then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })

  app.get('/api/workplace/:id', validationMiddleware.validate(), (req, res) => {
    workplace.find({where: {id: req.params.id}}).then((object) => {
      if (object === null) {
        res.status(401).json({ messages: 'Workplace does not exists' })
      } else {
        res.json(object)
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
