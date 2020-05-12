function page (req, res) {
  require('fs').readFile('html/imprint.html', 'utf8', function (err, html) {
    if (err) throw err

    res.end(require('../src/html_creator').create_html(html, {
      title: 'Impressum',
      css: ['styles_general'],
      nav: true
    }))
  })
}

module.exports = {
  page: page
}
