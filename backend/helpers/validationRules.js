const Joi = require('joi')
module.exports = {
  auth: {
    signin: {
      email: Joi.string().email().required(),
      password: Joi.string().min(3).required()
    },
    signup: {
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(3).required()
    },
    forgot: {
      email: Joi.string().email().required()
    },
    change: {
      password: Joi.string().min(3).required(),
      repassword: Joi.string().min(3).required().valid(Joi.ref('password'))
    }
  },
  tangilbe: {
    person: {
      name: Joi.string().min(3).required(),
      persona: Joi.string().min(3).required(),
      detectable: Joi.number().integer().required(),
      twitter: Joi.string().allow(null),
      mbox: Joi.string().allow(null)
    },
    place: {
      name: Joi.string().min(3).required(),
      detectable: Joi.number().integer().required()
    },
    thing: {
      name: Joi.string().min(3).required(),
      urn: Joi.string().min(3).required(),
      detectable: Joi.number().integer().required(),
      poi: Joi.array().allow(null)
    }
  },
  trigger: {
    detectable: {
      name: Joi.string().min(3).required(),
      sensor: Joi.number().integer().allow(null),
      type: Joi.string().min(3).allow(null),
      url: Joi.string().min(3).allow(null)
    },
    primitive: {
      name: Joi.string().min(3).required(),
      category: Joi.string().min(3).allow(null),
      type: Joi.string().min(3).allow(null),
      symbol: Joi.string().min(3).allow(null),
      size: Joi.number().precision(3).allow(null),
      url: Joi.string().min(3).allow(null),
      option: Joi.string().allow(null)
    }
  },
  configurable: {
    app: {
      name: Joi.string().min(3).required(),
      manifest: Joi.string().min(3).allow(null),
      type: Joi.string().min(3).required()
    },
    device: {
      name: Joi.string().min(3).required(),
      type: Joi.string().min(3).required()
    }
  },
  workplace: {
    name: Joi.string().min(3).required(),
    items: Joi.array().required()
  }
}
