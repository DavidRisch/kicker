function page (req, res) {
  const user = require('../src/account_util').require_logged_in_user(req, res)
  const groupId = require('../src/account_util').get_group(req)
  const groupFileRef = require('../src/db/group')
  const succeeded = groupFileRef.is_group_id_valid(groupId)

  let objectToSend = {}
  if (succeeded === true) {
    const targetGroup = groupFileRef.by_id(groupId)
    const groupsOfUsers = require('../src/db/user').get_groups(user.id)
    const userIsInGroup = (groupsOfUsers.find(el => el.id === targetGroup.id) != null)
    const listOfUserIdsInGroup = require('../src/db/group').get_all_users_in_group(groupId)
    const listOfUserNamesInGroup = []
    listOfUserIdsInGroup.forEach(userElement => {
      listOfUserNamesInGroup.push(userElement.name)
    })
    objectToSend = {
      id: targetGroup.id,
      name: targetGroup.name,
      description: targetGroup.description,
      success: true,
      userIsPartOfGroup: userIsInGroup,
      error: '',
      users_in_group: listOfUserNamesInGroup
    }
  } else {
    objectToSend = { success: false, error: 'Group not found' }
  }
  const groupInfoJSONString = JSON.stringify(objectToSend)
  const groupInfoAsJSTag = '<script> var myGroupInfo = ' + groupInfoJSONString + '</script>'

  require('fs').readFile('html/group_edit.html', 'utf8', function (err, html) {
    if (err) throw err
    html = html.replace(/§users§/g, require('../src/player_dropdown').create_dropdown_for_group(groupId,true))
    const combinedHTML = groupInfoAsJSTag + html
    res.end(require('../src/html_creator').create_html(combinedHTML, {
      title: 'Gruppen Bearbeitung',
      js: ['jquery', 'jquery-ui', 'tokenize2', 'dropzone', 'group_edit'],
      css: ['groups', 'bootstrap', 'tokenize2', 'styles_general', 'jquery-ui', 'dropzone'],
      nav: true,
      req: req
    }))
  })
}

module.exports = {
  page: page
}
