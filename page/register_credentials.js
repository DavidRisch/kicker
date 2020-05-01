module.exports = {
  page: page
}

function page (req, res) {
  console.log('making credentials page...')

  require('fs').readFile('html/register_credentials.html', 'utf8', function (err, html) {
    if (err) throw err

    res.end(require('../src/html_creator').create_html(html, 'Registrierung', ['register_credentials']))
  })
}
