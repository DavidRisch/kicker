function page (req, res) {
  require('fs').readFile('html/group_creation.html', 'utf8', function (err, html) {
    if (err) throw err

    res.end(require('../src/html_creator').create_html(html, {
      title: 'Gruppen Erstellung',
      js: ['jquery', 'jquery-ui', 'chosen', 'dropzone', 'group_creation'],
      css: ['styles_general', 'jquery-ui', 'chosen', 'dropzone'],
      nav: true
    }))
  })
}

module.exports = {
  page: page
}
