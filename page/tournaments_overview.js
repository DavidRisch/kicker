function page (req, res) {
  require('fs').readFile('html/tournaments_overview.html', 'utf8', function (err, html) {
    if (err) throw err

    res.end(require('../src/html_creator').create_html(html, {
      title: 'Turniere',
      css: ['styles_general'],
      nav: true
    }))
  })
}

module.exports = {
  page: page
}
