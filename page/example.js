module.exports = {
  page: page
}

function page (req, res) {
  console.log('making example page...')

  console.log(require('../src/example').example_db_read())

  const fs = require('fs')
  const playerDropdown = require('../src/player_dropdown')
  fs.readFile('html/example.html', 'utf8', function (err, html) {
    if (err) throw err

    html = html.replace('§test§', (123000 + 456).toString())
    html = html.replace('§users§', playerDropdown.createDropdown(1))

    res.end(require('../src/html_creator').create_html(html, { title: 'Anmeldemethode wählen', js: ['example'] }))
  })
}
