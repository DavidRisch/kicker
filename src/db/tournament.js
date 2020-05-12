const database = require('../database')

const Tournament = class {
  constructor (id) {
    this._id = id
  }

  get id () {
    return this._id
  }

  get groupId () {
    return this._select('group_id')
  }

  get name () {
    return this._select('name')
  }

  get mode () {
    return this._select('mode')
  }

  _select (property) {
    return database.query('SELECT ' + property + ' FROM Tournament WHERE id = :id', {
      id: this._id
    })[0][property]
  }
}

function getTournament (property, value) {
  const result = database.query('SELECT id FROM Tournament WHERE ' + property + ' = :value', {
    value: value
  })
  return new Tournament(result[0].id)
}

function byId (id) {
  return getTournament('id', id)
}

function create (groupId, name, mode) {
  database.query('INSERT INTO Tournament (group_id, name, mode) VALUES (:group_id, :name, :mode)', {
    group_id: groupId,
    name: name,
    mode: mode
  })
}

module.exports = {
  by_id: byId,
  create: create
}
