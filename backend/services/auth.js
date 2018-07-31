const author = require('../models').author
const md5 = require('md5')
const {check, validationResult} = require('express-validator/check')

module.exports = (app) => {
  app.patch('/api/signin', [check('email').withMessage('Please provide a valid Email'), check('password').withMessage('Please provide a valid Password')], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(401).json({ messages: errors.array() })
    }
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

  app.post('/api/signup', [check('name').withMessage('Please provide a valid Name'), check('email').withMessage('Please provide a valid Email'), check('password').withMessage('Please provide a valid Password')], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(401).json({ messages: errors.array() })
    }

    author.create({name: req.body.name, email: req.body.email, password: md5(req.body.password)}).then(() => {
      res.json({data: {message: ['Welcome to ARLEM Panel. Please signin.']}})
    })
  })

  app.post('/api/forget', [check('email').withMessage('Please provide a valid Email')], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(401).json({ messages: errors.array() })
    }

    author.findOne({where: {email: req.body.email}}).then(object => {
      if (object == null) {
        res.json({message: ['Account does not exists, please try again.']})
      } else {
        res.json({message: 'An email has been sent your email address with further instructions.'})
      }
    })
  })

  app.patch('/api/change/:code', [check('password').withMessage('Please provide same password in both fields'), check('repassword').withMessage('Please provide same password in both fields')], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(401).json({ messages: errors.array() })
    }

    if (req.body.password !== req.body.repassword) {
      res.status(401).json({ message: ['Please enter correct password in both fields'] })
    }

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
}
