function page (req, res) {
  require('fs').readFile('html/tournament_creation.html', 'utf8', function (err, html) {
    if (err) throw err

    res.end(require('../src/html_creator').create_html(html, {
      title: 'Turnier erstellen',
      css: ['styles_general'],
      nav: true
    }))
  })
}

module.exports = {
  page: page
}
