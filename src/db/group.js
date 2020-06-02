const database = require('../database')

const DuplicateGroupException = class extends Error {}

const Group = class {
  constructor (id) {
    this._id = id
  }

  get id () {
    return this._id
  }

  get name () {
    return this._select('name')
  }

  set name (name) {
    return this._update('name', name)
  }

  get picture () {
    return this._select('picture')
  }

  set picture (picture) {
    return this._update('picture', picture)
  }

  get description () {
    return this._select('description')
  }

  set description (picture) {
    return this._update('description', picture)
  }

  get users () {
    return database.query(`SELECT User_in_Group.user_id, User_in_Group.join_timestamp
    FROM \`Group\`
    JOIN User_in_Group ON (User_in_Group.group_id = Group.id)
    WHERE Group.id = :id`, {
      id: this._id
    })
  }

  get usersObj () {
    const result = database.query(`SELECT User_in_Group.user_id, User_in_Group.join_timestamp
    FROM \`Group\`
    JOIN User_in_Group ON (User_in_Group.group_id = Group.id)
    WHERE Group.id = :id`, {
      id: this._id
    })
    const users = []
    for (const row of result) {
      users.push(require('./user').by_id(row.user_id))
    }
    return users
  }

  addUser (userId) {
    require('./user_in_group').add_User(userId, this._id)
  }

  _select (property) {
    return database.query('SELECT ' + property + ' FROM `Group` WHERE id = :id', {
      id: this._id
    })[0][property]
  }

  _update (property, value) {
    database.query('UPDATE `Group` SET ' + property + ' = :value WHERE id = :id', {
      value: value,
      id: this._id
    }, null)
  }
}

function getGroup (property, value) {
  const result = database.query('SELECT id FROM `Group` WHERE ' + property + ' = :value', {
    value: value
  })
  return new Group(result[0].id)
}

function getAllGroups () {
  const result = database.query('SELECT id FROM `Group`', {})
  const groupsList = []
  result.forEach(element => {
    groupsList.push(new Group(element.id))
  })
  return groupsList
}

function byId (id) {
  return getGroup('id', id)
}

function byName (name) {
  return getGroup('name', name)
}

function create (name, description) {
// prevent duplicate names
  const res = database.query('SELECT id FROM `Group` WHERE name = :value', {
    value: name
  })

  if (res.length !== 0) {
    throw new DuplicateGroupException('Name is already taken')
  }

  const result = database.query('INSERT INTO `Group` (name, description) VALUES (:name, :description)', {
    name: name,
    description: description
  })

  return byId(result.insertId)
}

module.exports = {
  by_id: byId,
  by_name: byName,
  create: create,
  get_all: getAllGroups,
  DuplicateGroupException: DuplicateGroupException
}
