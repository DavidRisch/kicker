function page (req, res) {
  require('fs').readFile('html/tournament_creation.html', 'utf8', function (err, html) {
    if (err) throw err

    res.end(require('../src/html_creator').create_html(html, {
      title: 'Turnier Erstellung',
      js: ['jquery', 'jquery-ui', 'chosen', 'tournament_creation'],
      css: ['styles_general', 'jquery-ui', 'chosen'],
      nav: true
    }))
  })
}

module.exports = {
  page: page
}
