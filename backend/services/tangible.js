const author = require('../models').author
const tangible = require('../models').tangible
const person = require('../models').person
const checkAuthor = require('../helper/checkAuthor')
const {header, body, validationResult} = require('express-validator/check')

module.exports = (app) => {
  app.get('/api/tangibles', [header('Authorization').custom((value, { req }) => {
    return author.find({where: {token: value.replace('Bearer ', '')}}).then((object) => {
      if (object === null) {
        throw new Error('Password confirmation does not match password')
      } else {
        req.author = object
      }
    })
  }).withMessage('Unauthorized user')], (req, res) => {
    console.log(tangible)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(401).json({ messages: errors.array() })
    }
    tangible.findAll().then((objects) => {
      if (objects === null) {
        res.json([])
      } else {
        res.json(objects)
      }
    })
  })

  app.post('/api/tangible/person/create', [header('Authorization').custom(checkAuthor).withMessage('Unauthorized user'), body('name').withMessage('Please provide a valid Name'), body('persona').withMessage('Please provide a valid Parsona'), body('detectable').withMessage('Please provide a valid Detectable')], (req, res) => {
    const errors = validationResult(req)
    console.log(req.author.id)
    if (!errors.isEmpty()) {
      res.status(401).json({ messages: errors.array() })
    }
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
}
