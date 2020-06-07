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
  const groupFile = require('../src/db/group')
  try {
    // add user to group
    const group = groupFile.by_id(invite.groupId)
    group.addUser(user.id)
  } catch (e) {
    if (e instanceof groupFile.UserAlreadyInGroupException) {
      return { success: false, error: 'userAlreadyInGroup' }
    } else {
      return { success: false, error: e.message }
    }
  }

  return { success: true }
}
