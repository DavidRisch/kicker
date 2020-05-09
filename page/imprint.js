function page (req, res) {
  console.log('making credentials page...')

  require('fs').readFile('html/imprint.html', 'utf8', function (err, html) {
    if (err) throw err

    res.end(require('../src/html_creator').create_html(html, 'Impressum',
      ['jquery', 'jquery-ui', 'chosen', 'dropzone'],
      ['styles_general', 'jquery-ui', 'chosen', 'groups', 'hamburgers', 'dropzone']))
  })
}

module.exports = {
  page: page
}
