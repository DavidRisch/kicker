module.exports = init

function init (app) {

  app.post('/api', function (req, res) {
    let body = req.body
    let response = ''

    switch (body.action) {
      case 'add':
        let result = require('./add_example').add(parseInt(body.a), parseInt(body.b))
        response = { 'sum': result }
        break

      case 'validateInput':
        var name = body.name
        var email = body.email
        var password = body.password

        var validator = require('../src/inputvalidator')

        response = {
          'valid-email': validator.isValidEmail(email),
          'valid-name': validator.isValidUserName(name),
          'secure-password': validator.isSecurePassword(password)
        }
        break

      // ^^^ Insert new api calls here ^^^

      default:
        throw Error('Unknown action: ' + body.action)
    }

    res.writeHead(200, { 'Content-Type': 'text/json' })
    res.end(JSON.stringify(response))

  })
}
