const author = require('../models').author
const md5 = require('md5')
const workplace = require('../models').workplace
const activity = require('../models').activity
const entity = require('../models').entity
const validationMiddleware = require('../helpers/validationMiddleware')
const validationRulues = require('../helpers/validationRules')

module.exports = (app) => {
  app.patch('/api/signin', validationMiddleware.validate(validationRulues.auth.signin, false), (req, res) => {
    author.findOne({where: {email: req.body.email, password: md5(req.body.password)}}).then(object => {
      if (object == null) {
        res.json({message: ['Invalid credentails. Please try again.']})
      } else {
        object.token = md5(Date())
        object.save()
        res.json(object)
      }
    })
  })

  app.post('/api/signup', validationMiddleware.validate(validationRulues.auth.signup, false), (req, res) => {
    author.create({name: req.body.name, email: req.body.email, password: md5(req.body.password)}).then(() => {
      res.json({data: {message: ['Welcome to ARLEM Panel. Please signin.']}})
    })
  })

  app.post('/api/forget', validationMiddleware.validate(validationRulues.auth.forgot, false), (req, res) => {
    author.findOne({where: {email: req.body.email}}).then(object => {
      if (object == null) {
        res.json({message: ['Account does not exists, please try again.']})
      } else {
        res.json({message: 'An email has been sent your email address with further instructions.'})
      }
    })
  })

  app.patch('/api/change/:code', validationMiddleware.validate(validationRulues.auth.change, false), (req, res) => {
    author.findById(req.params.code).then(object => {
      if (object == null) {
        res.json({message: ['Account does not exists, please try again.']})
      } else {
        object.password = md5(req.body.password)
        object.save()
        res.json({message: ['Password has been updated, try login now.']})
      }
    })
  })

  app.get('/api/dashboard', validationMiddleware.validate(), async (req, res) => {
    res.json({workplaces: await workplace.count(), activities: await activity.count(), entities: await entity.count()})
  })
}
