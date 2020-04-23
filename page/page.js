module.exports = init

function init (app) {
  app.get('/example', function (req, res) {
    require('./example').page(req, res)
  })

  app.get('/input_validator', function (req, res) {
    require('./input_validator').page(req, res)
  })

  app.get('/choose_login_method', function (req, res) {
    require('./choose_login_method').page(req, res)
  })

  app.get('/register_credentials', function (req, res) {
    require('./register_credentials').page(req, res)
  })

  app.get('/login', function (req, res) {
    require('./login').page(req, res)
  })

  // ^^^ Insert new pages here ^^^
}
