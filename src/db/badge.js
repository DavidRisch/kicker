const database = require('../database')

const Badge = class {
  constructor (id) {
    this._id = id
  }

  get id () {
    return this._id
  }

  get name () {
    return this._select('name')
  }

  get description () {
    return this._select('description')
  }

  _select (property) {
    return database.query('SELECT ' + property + ' FROM Badge WHERE id = :id', {
      id: this._id
    })[0][property]
  }
}

function getBadge (property, value) {
  const result = database.query('SELECT id FROM Badge WHERE ' + property + ' = :value', {
    value: value
  })
  return new Badge(result[0].id)
}

function byId (id) {
  return getBadge('id', id)
}

module.exports = {
  by_id: byId
}
