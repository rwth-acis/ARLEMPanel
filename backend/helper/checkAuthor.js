const author = require('../models').author

module.exports = (value, {req}) => {
  return author.find({where: {token: value.replace('Bearer ', '')}}).then((object) => {
    if (object === null) {
      throw new Error('Password confirmation does not match password')
    } else {
      req.author = object
    }
  })
}
