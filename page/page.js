module.exports = init

function init (app) {
  app.get('/example', function (req, res) {
    require('./example').page(req, res)
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

  app.get('/dump_db', function (req, res) {
    require('./dump_db').page(req, res)
  })

  app.get('/front_page', function (req, res) {
    require('./front_page').page(req, res)
  })

  app.get('/group_selection', function (req, res) {
    require('./group_selection').page(req, res)
  })

  app.get('/group_creation', function (req, res) {
    require('./group_creation').page(req, res)
  })

  app.get('/imprint', function (req, res) {
    require('./imprint').page(req, res)
  })
  // ^^^ Insert new pages here ^^^
}
