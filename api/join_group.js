exports.joinGroup = joinGroup
exports.createInvite = createInvite

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

function createInvite (req, res) {
  // debug function to get links for testing
  // change below params
  const userId = 5
  const groupId = 1
  const host = req.protocol + '://' + req.get('host')
  const invite = require('../src/db/group_invitations').create(groupId, userId).createLink(host)
  res.writeHead(200, { 'Content-Type': 'text/json' })
  return { link: invite }
}
