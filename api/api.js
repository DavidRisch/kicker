module.exports = init

function init (app) {
  const bodyParser = require('body-parser')

  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )

  app.use(bodyParser.json())

  app.post('/api', function (req, res) {
    const body = req.body
    let response = ''

    switch (body.action) {
      case 'add': {
        const result = require('./add_example').add(parseInt(body.a), parseInt(body.b))
        response = { sum: result }
        break
      }
      case 'registerCredentials': {
        require('./register_credentials').process(body.name, body.mail, body.password, body.phoneNumber)
        break
      }
      case 'login': {
        require('../src/login').process(body.userName, body.password)
        break
      }

      case 'validateInput': {
        var name = body.name
        var email = body.email
        var password = body.password

        var validator = require('../src/input_validator')

        response = {
          validEmail: validator.is_valid_email(email),
          validName: validator.is_valid_user_name(name),
          validPassword: validator.is_secure_password(password)
        }
        break
      }

      // ^^^ Insert new api calls here ^^^

      default:
      {
        throw Error('Unknown action: ' + body.action)
      }
    }

    res.writeHead(200, { 'Content-Type': 'text/json' })
    res.end(JSON.stringify(response))
  })
}
