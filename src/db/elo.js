const database = require('../database')

const Elo = class {
  constructor (id) {
    this._id = id
  }

  get id () {
    return this._id
  }

  get groupId () {
    return this._select('group_id')
  }

  get userId () {
    return this._select('user_id')
  }

  get matchId () {
    return this._select('match_id')
  }

  get elo () {
    return this._select('elo')
  }

  get description () {
    return this._select('description')
  }

  _select (property) {
    return database.query('SELECT ' + property + ' FROM Elo WHERE id = :id', {
      id: this._id
    })[0][property]
  }
}

function getElo (property, value) {
  const result = database.query('SELECT id FROM Elo WHERE ' + property + ' = :value', {
    value: value
  })
  return new Elo(result[0].id)
}

function byId (id) {
  return getElo('id', id)
}

function create (groupId, userId, elo) {
  database.query('INSERT INTO Elo (group_id, user_id, elo) VALUES (:group_id, :user_id, :elo)', {
    group_id: groupId,
    user_id: userId,
    elo: elo
  })
}

module.exports = {
  by_id: byId,
  create: create
}
