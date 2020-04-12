const port = 8080

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'html')
app.set('views', __dirname + '/html')

app.use('/css', express.static('css'))
app.use('/js', express.static('js'))

app.get('/', function (req, res) {
  res.writeHead(302, { 'Location': 'example' })
  res.end()
})

require('./page/page')(app)
require('./api/api')(app)

app.listen(port, function () {
  console.log('Listening on port ' + port + '!')
})
