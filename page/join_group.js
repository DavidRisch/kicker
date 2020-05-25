function page (req, res) {
  console.log('making join group page...')

  const user = require('../src/account_util').get_current_user(req)
  if (user === null) {
    res.cookie('redirect', req.url)
    res.writeHead(302, { Location: '/login' })
    res.end()
  } else {
    // join group and redirect to main page
    let groupName = ''
    try {
      const host = req.protocol + '://' + req.get('host')
      const url = new URL(host + req.url)
      const token = url.searchParams.get('token')
      const invite = require('../src/db/group_invitations').by_Token(token)
      groupName = require('../src/db/group').by_id(invite.groupId).name
    } catch (Error) {
      // token invalid or already used
    }

    var fs = require('fs')
    fs.readFile('html/join_group.html', 'utf8', function (err, html) {
      if (err) throw err
      const nameAsScript = '<script> var groupName = \'' + groupName + '\'</script>'
      res.end(require('../src/html_creator').create_html(nameAsScript + html, { title: 'Gruppe beitreten', js: ['join_group', 'cookie_parser', 'query_parser'] }))
    })
  }
}

module.exports = {
  page: page
}
