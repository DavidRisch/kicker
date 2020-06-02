function page (req, res) {
  const user = require('../src/account_util').require_logged_in_user(req, res)
  const groupId = require('../src/account_util').get_group(req)

  require('fs').readFile('html/matches.html', 'utf8', function (err, html) {
    if (err) throw err

    const matches = require('../src/db/match').involving_user_and_group(user.id, groupId)
    html = html.replace('§played_matches_count§', matches.length)

    let playedMatchesRows = ''
    for (const match of matches) {
      playedMatchesRows += require('../src/match_row').create_row(match)
    }
    html = html.replace('§played_matches_rows§', playedMatchesRows)

    res.end(require('../src/html_creator').create_html(html, {
      title: 'Letzte Spiele',
      js: [],
      css: ['styles_general', 'row'],
      nav: true,
      req: req
    }))
  })
}

module.exports = {
  page: page
}
