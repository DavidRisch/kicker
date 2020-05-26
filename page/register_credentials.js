module.exports = {
  page: page
}

function page (req, res) {
  console.log('making credentials page...')

  require('fs').readFile('html/register_credentials.html', 'utf8', function (err, html) {
    if (err) throw err

    res.end(require('../src/html_creator').create_html(html, {
      title: 'Registrierung',
      js: ['register_credentials'],
      css: ['register_credentials', 'styles_general'],
      nav: false
    }))
  })
}
