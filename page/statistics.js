module.exports = {
  page: page
}

function page (req, res) {
  const fs = require('fs')
  fs.readFile('html/statistics.html', 'utf8', function (err, html) {
    if (err) throw err

    res.end(
      require('../src/html_creator').create_html(html, {
        title: 'Statistiken',
        js: ['example_statistics'],
        css: ['styles_general'],
        nav: true
      })
    )
  })
}
