var fs = require('fs')

module.exports = (app) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') {
      return
    }
    var name = file.substr(0, file.indexOf('.'))
    console.log(name)
    require('./' + name)(app)
  })
}
