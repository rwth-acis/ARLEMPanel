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
      twitter: Joi.string().allow(null).allow(""),
      mbox: Joi.string().allow(null).allow("")
    },
    place: {
      name: Joi.string().required(),
      detectable: Joi.number().integer().required()
    },
    thing: {
      name: Joi.string().required(),
      urn: Joi.string().required(),
      detectable: Joi.number().integer().required(),
      poi: Joi.array().allow(null).allow("")
    }
  },
  trigger: {
    detectable: {
      name: Joi.string().required(),
      sensor: Joi.number().integer().allow(null).allow(""),
      type: Joi.string().allow(null).allow(""),
      url: Joi.string().allow(null).allow("")
    },
    primitive: {
      name: Joi.string().required(),
      category: Joi.string().allow(null).allow(""),
      type: Joi.string().allow(null).allow(""),
      symbol: Joi.string().allow(null).allow(""),
      size: Joi.number().precision(3).allow(null).allow("").allow(""),
      url: Joi.string().allow(null).allow("").allow(""),
      option: Joi.string().allow(null).allow("").allow("")
    }
  },
  configurable: {
    app: {
      name: Joi.string().required(),
      manifest: Joi.string().allow(null).allow(""),
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
    username: Joi.string().allow(null).allow(""),
    password: Joi.string().allow(null).allow("")
  },
  workplace: {
    name: Joi.string().required(),
    items: Joi.array().required()
  },
  activity: {
    name: Joi.string().required(),
    description: Joi.string().allow(null).allow(""),
    language: Joi.string().required(),
    workplace: Joi.number().integer().required(),
    start: Joi.number().integer().allow(null).allow(""),
    actions: Joi.array().items(Joi.object({
      name: Joi.string().required(),
      type: Joi.string().required(),
      viewport: Joi.number().integer().allow(null).allow(""),
      instructionTitle: Joi.string().allow(null).allow(""),
      instructionDescription: Joi.string().allow(null).allow(""),
      triggers: Joi.array().items(Joi.object({
        mode: Joi.string().required(),
        removeSelf: Joi.number().integer().allow(null).allow(""),
        operation: Joi.string().allow(null).allow(""),
        entityType: Joi.string().allow(null).allow(""),
        entityId: Joi.number().integer().allow(null).allow(""),
        poi: Joi.allow(null).allow(""),
        viewportId: Joi.number().integer().allow(null).allow(""),
        primitiveId: Joi.number().integer().allow(null).allow(""),
        option: Joi.string().allow(null).allow("")
      }))
    })).required()
  }
}
