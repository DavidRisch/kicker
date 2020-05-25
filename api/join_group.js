exports.joinGroup = joinGroup

function joinGroup (req, token) {
  let invite
  try {
    invite = require('../src/db/group_invitations').by_Token(token)
  } catch (Error) {
    return { success: false, error: 'invalidToken' }
  }

  // get current user
  const user = require('../src/account_util').get_current_user(req)
  if (!user) {
    // user not authenticated
    return { success: false, error: 'userNotAuthenticated' }
  }
  try {
    // add user to group
    require('../src/db/user_in_group').add_User(user.id, invite.groupId)
  } catch (Error) {
    invite.deleteInvite()
    return { success: false, error: 'userAlreadyInGroup' }
  }

  invite.deleteInvite()
  return { success: true }
}
