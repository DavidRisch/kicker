module.exports = {
  page: page
}

function page (req, res) {
  console.log('making credentials page...')

  var fs = require('fs')
  fs.readFile('html/register_credentials.html', 'utf8', function (err, html) {
    if (err) throw err

    res.end(require('../src/html_creator').create_html(html, 'Registrierung'))
  })
}
