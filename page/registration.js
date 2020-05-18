function page (req, res) {
  require('fs').readFile('html/registration.html', 'utf8', function (err, html) {
    if (err) throw err

    res.end(require('../src/html_creator').create_html(html, {
      title: 'Registrierung',
      css: ['registration'],
      nav: false
    }))
  })
}

module.exports = {
  page: page
}
