exports.joinGroup = joinGroup

function joinGroup (token) {
  let invite
  try {
    invite = require('../src/db/group_invitations').byToken(token)
  } catch (Error) {
    return { success: false, error: 'invalidToken' }
  }
  try {
    require('../src/db/user_in_group').addUser(invite.userId, invite.groupId)
  } catch (Error) {
    invite.deleteInvite()
    return { success: false, error: 'userAlreadyInGroup' }
  }

  invite.deleteInvite()
  return { success: true }
}
