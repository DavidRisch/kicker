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
  const host = req.protocol + '://' + req.get('host')
  const url = new URL(host + req.url)
  const user = url.searchParams.get('user')
  const group = url.searchParams.get('group')
  const userId = require('../src/db/user').by_name(user).id
  const groupId = require('../src/db/group').by_name(group).id
  const invite = require('../src/db/group_invitations').create(groupId, userId).createLink(host)
  res.writeHead(200, { 'Content-Type': 'text/json' })
  return { link: invite }
}
