function page (req, res) {
  const users = require('../src/player_dropdown').create_dropdown_all_users()
  const usersAsScript = '<script> var users = \'' + users + '\'</script>'

  require('fs').readFile('html/group_creation.html', 'utf8', function (err, html) {
    if (err) throw err

    res.end(require('../src/html_creator').create_html(usersAsScript + html, {
      title: 'Neue Gruppe Erstellen',
      js: ['jquery', 'jquery-ui', 'tokenize2', 'dropzone', 'group_creation'],
      css: ['groups', 'bootstrap', 'tokenize2', 'styles_general', 'jquery-ui', 'dropzone'],
      nav: true
    }))
  })
}

module.exports = {
  page: page
}
