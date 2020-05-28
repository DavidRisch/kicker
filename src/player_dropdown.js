const user = require('./db/user')
const group = require('./db/group')

/* Returns the <option>-tags for a player selection dropdown field */
function createDropdown (groupId) {
  let result = ''
  const grp = group.by_id(groupId)
  const users = grp.users
  for (const row of users) {
    const usr = user.by_id(row.user_id)
    result += '<option value="' + usr.id + '">' + usr.name + '</option>'
  }
  return result
}

module.exports = {
  createDropdown: createDropdown
}
