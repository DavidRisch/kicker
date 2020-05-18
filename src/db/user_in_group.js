
const UserAlreadyInGroupException = class extends Error {}

const database = require('../database')

const UserInGroup = class {
  constructor (userInGroup) {
    this._id = userInGroup.id
    this.userId = userInGroup.user_id
    this.groupId = userInGroup.group_id
    this.joinTimestamp = userInGroup.join_timestamp
  }
}

function getUserInGroup (property, value) {
  const result = database.query('SELECT * FROM user_in_group WHERE ' + property + ' = :value', {
    value: value
  })
  console.log(result)
  return new UserInGroup(result[0])
}

function byUser (userId) {
  getUserInGroup('user_id', userId)
}

function byGroup (groupId) {
  getUserInGroup('group_id', groupId)
}

function addUser (userId, groupId) {
  // check exists already
  const result = database.query('SELECT * FROM user_in_group WHERE user_id = :value', {
    value: userId
  })

  if (result.length !== 0) {
    throw new UserAlreadyInGroupException()
  }

  database.query('INSERT INTO user_in_group (user_id, group_id) VALUES (:user_id, :group_id)', {
    user_id: userId,
    group_id: groupId
  })
}

module.exports = {
  byGroup: byGroup,
  byUser: byUser,
  addUser: addUser,
  UserAlreadyInGroupException: UserAlreadyInGroupException
}
