module.exports =
  {
    createDropdown: createDropdown
  }

const user = require('db/user')
const group = require('db/group')

/*Returns the <option>-tags for a player selection dropdown field*/
function createDropdown (groupId) {
  result = ''
  grp = group.by_id(groupId)
  users = grp.users
  for (let uid of users) {
    usr = user.by_id(uid[0])
    result += '<option value="' + usr.id + '">' + usr.name + '</option>'
  }
  return result
}