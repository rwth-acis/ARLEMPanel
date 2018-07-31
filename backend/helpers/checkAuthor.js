const author = require('../models').author

module.exports = (req) => {
  return author.find({where: {token: req.headers.authorization.replace('Bearer ', '')}})
}
