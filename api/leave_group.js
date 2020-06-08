exports.leaveGroup = leaveGroup

function leaveGroup (req, groupId) {
  const user = require('../src/account_util').get_current_user(req)
  if (!user) {
    // user not authenticated
    return { success: false, error: 'userNotAuthenticated' }
  }

  groupId = parseInt(groupId)
  if (require('../src/db/user').get_groups(user.id).filter(groupElement => groupElement.id === groupId).length > 0) {
    require('../src/db/group').remove_User(groupId, user.id)
  } else {
    return { success: false, error: 'User cannot leave a group that he didn\'t join!' }
  }
  return { success: true }
}
