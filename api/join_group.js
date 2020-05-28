exports.joinGroup = joinGroup

function joinGroup (req, token) {
  const userInGroup = require('../src/db/user_in_group')
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
    userInGroup.add_User(user.id, invite.groupId)
  } catch (e) {
    if (e instanceof userInGroup.UserAlreadyInGroupException) {
      return { success: false, error: 'userAlreadyInGroup' }
    } else {
      return { success: false, error: e.message }
    }
  }

  return { success: true }
}
