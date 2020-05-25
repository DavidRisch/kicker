
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
  const result = database.query('SELECT * FROM User_in_Group WHERE ' + property + ' = :value', {
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
  const result = database.query('SELECT * FROM User_in_Group WHERE user_id = :value', {
    value: userId
  })

  if (result.length !== 0) {
    throw new UserAlreadyInGroupException()
  }

  database.query('INSERT INTO User_in_Group (user_id, group_id) VALUES (:user_id, :group_id)', {
    user_id: userId,
    group_id: groupId
  })
}

module.exports = {
  by_Group: byGroup,
  by_User: byUser,
  add_User: addUser,
  UserAlreadyInGroupException: UserAlreadyInGroupException
}
