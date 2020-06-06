function page (req, res) {
  require('fs').readFile('html/tournament_creation.html', 'utf8', function (err, html) {
    if (err) throw err

    html = html.replace('§users§', require('../src/player_dropdown').createDropdown(1))

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
