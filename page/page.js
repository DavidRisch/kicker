module.exports = init

function init (app) {
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

  app.get('/group_edit', function (req, res) {
    require('./group_edit').page(req, res)
  })

  app.get('/tournament_creation', function (req, res) {
    require('./tournament_creation').page(req, res)
  })

  app.get('/imprint', function (req, res) {
    require('./imprint').page(req, res)
  })

  app.get('/create_join_link', function (req, res) {
    require('./create_join_link').page(req, res)
  })

  app.get('/join_group', function (req, res) {
    require('./join_group').page(req, res)
  })

  app.get('/enter_game', function (req, res) {
    require('./enter_game').page(req, res)
  })

  app.get('/running_tournament', function (req, res) {
    require('./running_tournament').page(req, res)
  })

  app.get('/achievements', function (req, res) {
    require('./achievements').page(req, res)
  })

  app.get('/tournaments_overview', function (req, res) {
    require('./tournaments_overview').page(req, res)
  })

  app.get('/account', function (req, res) {
    require('./account').page(req, res)
  })

  app.get('/statistics', function (req, res) {
    require('./statistics').page(req, res)
  })

  app.get('/matches', function (req, res) {
    require('./matches').page(req, res)
  })

  app.get('/dummy_db', function (req, res) {
    require('./dummy_db').page(req, res)
  })

  app.get('/faq', function (req, res) {
    require('./faq').page(req, res)
  })
}
