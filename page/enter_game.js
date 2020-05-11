module.exports = {
  page: page
}

function page (req, res) {
  console.log('making enter game page...')

  var fs = require('fs')
  fs.readFile('html/enter_game.html', 'utf8', function (err, html) {
    if (err) throw err
    res.end(html)
  })
}
