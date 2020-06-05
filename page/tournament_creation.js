function page (req, res) {
  // get user and group
  const user = require('../src/account_util').get_current_user(req)
  if (!user) {
    // not auth --> redirect to auth
    res.cookie('redirect', req.url)
    res.writeHead(302, { Location: '/login' })
    res.end()
    return
  }

  // get group from cookie
  const groupID = require('../src/account_util').get_group(req)
  if (!groupID) {
    // TODO page needs proper error handling
  }

  require('fs').readFile('html/tournament_creation.html', 'utf8', function (err, html) {
    if (err) throw err

    html = html.replace('§users§', require('../src/player_dropdown').create_dropdown_for_group(groupID))

    res.end(require('../src/html_creator').create_html(html, {
      title: 'Turnier erstellen',
      js: ['jquery', 'tokenize2', 'tournament_creation'],
      css: ['bootstrap', 'tokenize2', 'styles_general'],
      nav: true,
      req: req
    }))
  })
}

module.exports = {
  page: page
}
