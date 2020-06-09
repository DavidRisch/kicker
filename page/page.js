module.exports = init

const pageCollection = {
  '/choose_login_method': './choose_login_method',
  '/register_credentials': './register_credentials',
  '/login': './login',
  '/dump_db': './dump_db',
  '/front_page': './front_page',
  '/group_selection': './group_selection',
  '/group_creation': './group_creation',
  '/group_edit': './group_edit',
  '/tournament_creation': './tournament_creation',
  '/imprint': './imprint',
  '/create_join_link': './create_join_link',
  '/join_group': './join_group',
  '/enter_game': './enter_game',
  '/running_tournament': './running_tournament',
  '/tournaments_overview': './tournaments_overview',
  '/account': './account',
  '/statistics': './statistics',
  '/matches': './matches',
  '/dummy_db': './dummy_db',
  '/faq': './faq'
}

function handlePage (pageName, req, res) {
  try {
    require(pageCollection[pageName]).page(req, res)
  } catch (error) {
    const errorText = error.name + ': ' + error.message
    res.writeHead(500)
    res.end(errorText)
  }
}

function init (app) {
  for (const pageName in pageCollection) {
    app.get(pageName, function (req, res) {
      handlePage(pageName, req, res)
    })
  }
}
