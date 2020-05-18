function page (req, res) {
  require('fs').readFile('html/achievements.html', 'utf8', function (err, html) {
    if (err) throw err

    res.end(require('../src/html_creator').create_html(html, {
      title: 'Erfolge',
      css: ['styles_general', 'achievements'],
      nav: true
    }))
  })
}

module.exports = {
  page: page
}
