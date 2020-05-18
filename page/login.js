module.exports = {
  page: page
}

function page (req, res) {
  console.log('making login page...')

  var fs = require('fs')
  fs.readFile('html/login.html', 'utf8', function (err, html) {
    if (err) throw err

    res.end(require('../src/html_creator').create_html(html, { title: 'Login', js: ['login', 'cookie_parser'] }))

  })
}
