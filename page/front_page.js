function page (req, res) {
  const user = require('../src/account_util').require_logged_in_user(req, res)

  require('fs').readFile('html/front_page.html', 'utf8', function (err, html) {
    if (err) throw err

    const matches = require('../src/db/match').involving_user(user.id)
    html = html.replace('§played_games§', matches.length)
    html = html.replace('§elo§', 1000)

    let playedMatchesRows = ''
    let i = 0
    for (const match of matches) {
      i++
      playedMatchesRows += require('../src/match_row').create_row(match)
      if (i >= 2)
        break
    }
    html = html.replace('§matches§', playedMatchesRows)

    res.end(require('../src/html_creator').create_html(html, {
      title: user.name,
      css: ['styles_general', 'row', 'front_page'],
      nav: true,
      req: req
    }))
  })
}

module.exports = {
  page: page
}
