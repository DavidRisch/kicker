const dotenv = require('dotenv')
const path = require('path')

if (dotenv.config({ path: path.resolve(__dirname, 'config', 'config.env') }).error) {
  console.warn('config/config.env not found, using dummy config at config/config.env.template')
  dotenv.config({ path: path.resolve(__dirname, 'config', 'config.env.template') })
}

const express = require('express')
const app = express()

app.use(require('cookie-parser')())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/css', express.static('css'))
app.use('/js', express.static('js'))
app.use('/images', express.static('images'))

app.use('/jquery', express.static('node_modules/jquery/dist'))
app.use('/chosen', express.static('node_modules/chosen-js'))
app.use('/dropzone', express.static('node_modules/dropzone/dist'))
app.use('/jquery-ui', express.static('node_modules/jquery-ui-dist'))
app.use('/hamburgers', express.static('node_modules/hamburgers/dist'))

app.get('/', function (req, res) {
  res.writeHead(302, { Location: 'choose_login_method' })
  res.end()
})

require('./page/page')(app)
require('./api/api')(app)

// enable to test database connection:
// console.log(require('./src/database').query('SELECT :abc,:def', { abc: 123, def: 'test' }))

app.listen(process.env.HTTP_PORT, function () {
  console.log('Listening on port ' + process.env.HTTP_PORT + '!')
})
