module.exports = {
  page: page
}

function page (req, res) {
  var fs = require('fs')
  fs.readFile('html/choose_login_method.html', 'utf8', function (err, html) {
    if (err) throw err
    res.end(html)
  })
}
