function page (req, res) {
  require('fs').readFile('html/running_tournament.html', 'utf8', function (err, html) {
    if (err) throw err

    res.end(require('../src/html_creator').create_html(html, {
      title: 'Turniername',
      css: ['styles_general', 'row'],
      nav: true
    }))
  })
}

module.exports = {
  page: page
}
