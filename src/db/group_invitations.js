const database = require('../database')

const GroupInvitation = class {
  constructor (invite) {
    this._id = invite.id
    this.groupId = invite.group_id
    this.token = invite.token
  }

  createLink (host) {
    return host + '/join_group?token=' + this.token
  }

  deleteInvite () {
    database.query('DELETE FROM Group_invitations WHERE token = :value', {
      value: this.token
    })
  }
}

function byToken (token) {
  const result = database.query('SELECT * FROM Group_invitations WHERE token = :value', {
    value: token
  })
  return new GroupInvitation(result[0])
}

function create (groupId) {
  const token = require('../account_util').generate_random_string(64)
  database.query('INSERT INTO Group_invitations (group_id, token) VALUES (:group_id, :token)', {
    group_id: groupId,
    token: token
  })
  return byToken(token)
}

function getAllGroupInvitationsOfGroup (groupId) {
  const result = database.query('select token from Group_invitations where group_id = :group_id', {
    group_id: groupId
  })
  var tokenArr = []
  result.forEach(element => {
    tokenArr.push(byToken(element.token))
  }
  )
  return tokenArr
}

function deleteAllGroupInvitations (groupId) {
  const allInvitations = getAllGroupInvitationsOfGroup(groupId)
  allInvitations.forEach(element => {
    element.deleteInvite()
  })
  // return count of deleted invites
  return allInvitations.length
}

module.exports = {
  by_Token: byToken,
  create: create,
  get_group_invitations_of_group: getAllGroupInvitationsOfGroup,
  delete_all_group_invitations: deleteAllGroupInvitations
}
