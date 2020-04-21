module.exports = {
  page: page
}

function page (req, res) {
  console.log('making example page...')

  console.log(require('../src/example').example_db_read())

  var fs = require('fs')
  fs.readFile('html/example.html', 'utf8', function (err, html) {
    if (err) throw err

    html = html.replace('§test§', (123000 + 456).toString())

    html_shortener = require('../src/html_shortener')
    res.end(html_shortener.html_header('Anmeldemethode wählen') + html + html_shortener.html_footer())
  })
}
