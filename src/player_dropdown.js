const user = require('./db/user')
const group = require('./db/group')

/* Returns the <option>-tags for a player selection dropdown field */
function createDropdownForGroup (groupId, preSelect = false) {
  let result = ''
  const grp = group.by_id(groupId)
  const users = grp.users
  let sel;
  if(preSelect)
    sel = 'selected'
  else
    sel = ''
  for (const row of users) {
    const usr = user.by_id(row.user_id)
    result += '<option value="' + usr.id + '"' + sel + ' >' + usr.name + '</option>'
  }
  return result
}

function createDropdownAllUsers () {
  let result = ''
  const users = require('./db/user').get_all_usernames()
  for (const row of users) {
    result += '<option value="' + row.id + '">' + row.name + '</option>'
  }
  return result
}

module.exports = {
  create_dropdown_all_users: createDropdownAllUsers,
  create_dropdown_for_group: createDropdownForGroup
}
