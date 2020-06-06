function page (req, res) {
  require('../src/account_util').require_logged_in_user(req, res)

  require('fs').readFile('html/enter_game.html', 'utf8', function (err, html) {
    if (err) throw err

    const groupId = require('../src/account_util').get_group(req)
    html = html.replace(/§users§/g, require('../src/player_dropdown').create_dropdown_for_group(groupId))

    res.end(require('../src/html_creator').create_html(html, {
      title: 'Neues Spiel',
      js: ['jquery', 'jquery-ui', 'tokenize2', 'enter_game'],
      css: ['bootstrap', 'jquery-ui', 'tokenize2', 'styles_general'],
      nav: true,
      req: req
    }))
  })
}

module.exports = {
  page: page
}
