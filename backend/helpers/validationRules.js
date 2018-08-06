const Joi = require('joi')
module.exports = {
  auth: {
    signin: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    },
    signup: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    },
    forgot: {
      email: Joi.string().email().required()
    },
    change: {
      password: Joi.string().required(),
      repassword: Joi.string().required().valid(Joi.ref('password'))
    }
  },
  tangilbe: {
    person: {
      name: Joi.string().required(),
      persona: Joi.string().required(),
      detectable: Joi.number().integer().required(),
      twitter: Joi.string().allow(null),
      mbox: Joi.string().allow(null)
    },
    place: {
      name: Joi.string().required(),
      detectable: Joi.number().integer().required()
    },
    thing: {
      name: Joi.string().required(),
      urn: Joi.string().required(),
      detectable: Joi.number().integer().required(),
      poi: Joi.array().allow(null)
    }
  },
  trigger: {
    detectable: {
      name: Joi.string().required(),
      sensor: Joi.number().integer().allow(null),
      type: Joi.string().allow(null),
      url: Joi.string().allow(null)
    },
    primitive: {
      name: Joi.string().required(),
      category: Joi.string().allow(null),
      type: Joi.string().allow(null),
      symbol: Joi.string().allow(null),
      size: Joi.number().precision(3).allow(null),
      url: Joi.string().allow(null),
      option: Joi.string().allow(null)
    }
  },
  configurable: {
    app: {
      name: Joi.string().required(),
      manifest: Joi.string().allow(null),
      type: Joi.string().required()
    },
    device: {
      name: Joi.string().required(),
      type: Joi.string().required()
    }
  },
  sensor: {
    name: Joi.string().required(),
    url: Joi.string().required(),
    type: Joi.string().required(),
    username: Joi.string().allow(null),
    password: Joi.string().allow(null)
  },
  workplace: {
    name: Joi.string().required(),
    items: Joi.array().required()
  },
  activity: {
    name: Joi.string().required(),
    description: Joi.string().allow(null),
    language: Joi.string().required(),
    workplace: Joi.number().integer().required(),
    start: Joi.number().integer().allow(null),
    actions: Joi.array().items(Joi.object({
      name: Joi.string().required(),
      type: Joi.string().required(),
      viewport: Joi.number().integer().allow(null),
      instructionTitle: Joi.string().allow(null),
      instructionDescription: Joi.string().allow(null),
      triggers: Joi.array().items(Joi.object({
        mode: Joi.string().required(),
        removeSelf: Joi.number().integer().allow(null),
        operation: Joi.string().allow(null),
        entityType: Joi.string().allow(null),
        entityId: Joi.number().integer().allow(null),
        poi: Joi.allow(null),
        viewportId: Joi.number().integer().allow(null),
        primitiveId: Joi.number().integer().allow(null),
        option: Joi.string().allow(null)
      }))
    })).required()
  }
}
