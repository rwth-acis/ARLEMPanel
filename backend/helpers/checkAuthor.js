const author = require('../models').author

module.exports = (req) => {
  if (req.headers.authorization) {
    return author.find({where: {token: req.headers.authorization.replace('Bearer ', '')}})
  } else {
    return null
  }
}
