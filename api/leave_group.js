exports.leaveGroup = leaveGroup

function leaveGroup (req, groupId) {
  const user = require('../src/account_util').get_current_user(req)
  if (!user) {
    // user not authenticated
    return { success: false, error: 'userNotAuthenticated' }
  }
  // never trust user input!
  groupId = parseInt(groupId).toString()

  if (require('../src/db/user').get_groups().includes(groupId)) {
    require('../src/db/group').remove_User(user.id)
  } else {
    return { success: false, error: 'user cannot leave a group that he didn\'t joined!' }
  }
  return { success: true }
}
