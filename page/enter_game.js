function page (req, res) {
  require('fs').readFile('html/enter_game.html', 'utf8', function (err, html) {
    if (err) throw err

    res.end(require('../src/html_creator').create_html(html, 'Neues Spiel',
      ['enter_game'],
      ['styles_general']))
  })
}

module.exports = {
  page: page
}
