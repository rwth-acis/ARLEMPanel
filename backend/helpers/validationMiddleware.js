const Joi = require('joi')
const util = require('util')
const _ = require('lodash')
const checkAuthor = require('./checkAuthor')

var BadRequestError = function (errors, res) {
  res.status(401).json(errors)
}

util.inherits(BadRequestError, Error)

var validate = function (schema = {}, validateHeader = true) {
  return async function (req, res, next) {
    if (validateHeader === true) {
      const authorObject = await checkAuthor(req)
      if (authorObject === null) {
        res.status(401).json({messages: 'You are not authorized to perform this action.'})
      } else {
        req.author = authorObject
      }
    }

    var body = _.extend({}, req.body)
    delete body.access_token // remove access token for api calls

    Joi.validate(body, schema, {abortEarly: false}, function (err, schemaResult) {
      if (err) {
        var details = []
        err.details.forEach(function (d) {
          details.push({message: d.message, path: d.path})
        })

        return next(new BadRequestError(details, res))
      }

      req.schema = schemaResult
      return next()
    })
  }
}

module.exports = {
  validate: validate,
  BadRequestError: BadRequestError
}
