const database = require('../database')

const GroupInvitation = class {
  constructor (invite) {
    this._id = invite.id
    this.userId = invite.user_id
    this.groupId = invite.group_id
    this.token = invite.token
  }

  createLink (host) {
    return host + '/join_group?token=' + this.token
  }

  deleteInvite () {
    database.query('DELETE FROM group_invitations WHERE token = :value', {
      value: this.token
    })
  }
}

function byToken (token) {
  const result = database.query('SELECT * FROM group_invitations WHERE token = :value', {
    value: token
  })
  return new GroupInvitation(result[0])
}

function create (groupId, userId) {
  const token = require('../account_util').generate_random_string(64)
  database.query('INSERT INTO group_invitations (user_id, group_id, token) VALUES (:user_id, :group_id, :token)', {
    user_id: userId,
    group_id: groupId,
    token: token
  })
  return byToken(token)
}

module.exports = {
  byToken: byToken,
  create: create
}
