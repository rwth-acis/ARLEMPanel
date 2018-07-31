const {validationResult} = require('express-validator/check')
module.exports = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(401).json({ messages: errors.array() })
  }
}
