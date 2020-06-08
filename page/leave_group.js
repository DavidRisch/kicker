module.exports = {
  page: page
}

function page (req, res) {
  const user = require('../src/account_util').require_logged_in_user(req, res)
  const userGroups = require('../src/db/user').get_groups(user.id)
  var fs = require('fs')
  const groupInfo = { id: 0, name: '' }
  if (userGroups != null && userGroups.length > 0) {
    groupInfo.id = userGroups[0].id
    groupInfo.name = userGroups[0].name
  }
  const groupSnapshotJSONString = JSON.stringify(groupInfo)
  const groupIdAsJSTag = '<script> var myGroupInfo = ' + groupSnapshotJSONString + '</script>'
  fs.readFile('html/leave_group_example.html', 'utf8', function (err, html) {
    const combinedHTML = groupIdAsJSTag + html
    if (err) throw err
    res.end(require('../src/html_creator').create_html(combinedHTML, { title: 'Gruppe verlassen', js: ['cookie_parser', 'jquery', 'query_parser', 'leave_group'] }))
  })
}
