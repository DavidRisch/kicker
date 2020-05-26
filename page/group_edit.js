function page (req, res) {
  require('fs').readFile('html/group_edit.html', 'utf8', function (err, html) {
    if (err) throw err

    res.end(require('../src/html_creator').create_html(html, {
      title: 'Gruppen Bearbeitung',
      js: ['jquery', 'jquery-ui', 'tokenize2', 'dropzone', 'group_edit'],
      css: ['groups', 'bootstrap', 'tokenize2', 'styles_general', 'jquery-ui', 'dropzone'],
      nav: true
    }))
  })
}

module.exports = {
  page: page
}
