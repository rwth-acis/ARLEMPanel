const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')

const indexHTML = (() => {
  return fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8')
})()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/dist', express.static(path.resolve(__dirname, './dist')))

require('./build/dev-server')(app)
require('./backend/services')(app)

app.get('*', (req, res) => {
  res.write(indexHTML)
  res.end()
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server started at http://127.0.0.1:${port}`)
})
