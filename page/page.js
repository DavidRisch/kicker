module.exports = init

function init (app) {
  app.get('/example', function (req, res) {
    require('./example').page(req, res)
  })

  app.get('/register_credentials', function (req, res) {
    require('./register_credentials').page(req, res)
  })

  // ^^^ Insert new pages here ^^^
}
