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

    res.end(require('../src/html_creator').create_html(html, 'Anmeldemethode wählen', ['example']))
  })
}
