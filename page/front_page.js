function page (req, res) {
  require('../src/account_util').require_logged_in_user(req, res)

  require('fs').readFile('html/front_page.html', 'utf8', function (err, html) {
    if (err) throw err

    res.end(require('../src/html_creator').create_html(html, 'Kicker'))
  })
}

module.exports = {
  page: page
}
