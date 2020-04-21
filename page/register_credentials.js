module.exports = {
  page: page
}

function page (req, res) {
  console.log('making credentials page...')

  var fs = require('fs')
  fs.readFile('html/register_credentials.html', 'utf8', function (err, html) {
    if (err) throw err

    html_shortener = require('../src/html_shortener')
    res.end(html_shortener.html_header('Registrierung') + html + html_shortener.html_footer())
  })
}
