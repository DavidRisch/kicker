function page (req, res) {
  try {
    require('../src/account_util').require_logged_in_user(req, res)
  } catch (e) {
    // account_util handles redirect
    return
  }

  // get group from cookie
  const groupId = require('../src/account_util').get_group(req)

  require('fs').readFile('html/tournament_creation.html', 'utf8', function (err, html) {
    if (err) throw err

    if (groupId) {
      html = html.replace('§users§', require('../src/player_dropdown').create_dropdown_for_group(groupId))
    }

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
