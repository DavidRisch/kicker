module.exports = init

function init (app) {
  app.post('/api', function (req, res) {
    const body = req.body
    let response = ''

    switch (body.action) {
      case 'add':
        const result = require('./add_example').add(parseInt(body.a), parseInt(body.b))
        response = { sum: result }
        break
      case 'registerCredentials':
        require('../src/register_credentials').process(body.name, body.mail, body.password, body.phoneNumber)
        break

        // ^^^ Insert new api calls here ^^^

      default:
        throw Error('Unknown action: ' + body.action)
    }

    res.writeHead(200, { 'Content-Type': 'text/json' })
    res.end(JSON.stringify(response))
  })
}
