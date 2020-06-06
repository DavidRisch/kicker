function page (req, res) {
  require('fs').readFile('html/group_creation.html', 'utf8', function (err, html) {
    if (err) throw err

    res.end(require('../src/html_creator').create_html(html, {
      title: 'Gruppen Erstellung',
      js: ['jquery', 'jquery-ui', 'tokenize2', 'dropzone', 'group_creation'],
      css: ['bootstrap', 'tokenize2', 'styles_general', 'jquery-ui', 'dropzone', 'groups'],
      nav: true
    }))
  })
}

module.exports = {
  page: page
}
