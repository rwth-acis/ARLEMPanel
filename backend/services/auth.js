const author = require('../models').author
const md5 = require('md5')
const workplace = require('../models').workplace
const activity = require('../models').activity
const entity = require('../models').entity
const validationMiddleware = require('../helpers/validationMiddleware')
const validationRulues = require('../helpers/validationRules')
const config = require('../../config/default.json')

module.exports = (app) => {
  app.patch(config.apiBaseUrl + '/signin', validationMiddleware.validate(validationRulues.auth.signin, false), (req, res) => {
    author.findOne({where: {email: req.body.email, password: md5(req.body.password)}}).then(object => {
      if (object == null) {
        res.status(401).json(['Invalid credentails. Please try again'])
      } else {
        object.token = md5(Date())
        object.save()
        res.json(object)
      }
    })
  })

  app.post(config.apiBaseUrl + '/signup', validationMiddleware.validate(validationRulues.auth.signup, false), (req, res) => {
    author.findOne({where: {email: req.body.email}}).then(object => {
      if (object == null) {
        author.create({name: req.body.name, email: req.body.email, password: md5(req.body.password)}).then(() => {
          res.json({data: 'Welcome to ARLEM Panel. Please signin.'})
        })
      } else {
        res.status(401).json(['Email already exists. Please try login.'])
      }
    })
  })

  app.post(config.apiBaseUrl + '/forget', validationMiddleware.validate(validationRulues.auth.forgot, false), (req, res) => {
    author.findOne({where: {email: req.body.email}}).then(object => {
      if (object == null) {
        res.status(401).json(['Account does not exists, please try again.'])
      } else {
        res.json({message: 'An email has been sent your email address with further instructions.'})
      }
    })
  })

  app.patch(config.apiBaseUrl + '/change/:code', validationMiddleware.validate(validationRulues.auth.change, false), (req, res) => {
    author.findById(req.params.code).then(object => {
      if (object == null) {
        res.status(401).json(['Account does not exists, please try again.'])
      } else {
        object.password = md5(req.body.password)
        object.save()
        res.json({message: ['Password has been updated, try login now.']})
      }
    })
  })

  app.get(config.apiBaseUrl + '/dashboard', validationMiddleware.validate(), async (req, res) => {
    res.json({workplaces: await workplace.count(), activities: await activity.count(), entities: await entity.count()})
  })
}
