const database = require('../database')

const Round = class {
  constructor (id) {
    this._id = id
  }

  get id () {
    return this._id
  }

  get tournamentId () {
    return this._select('tournament_id')
  }

  _select (property) {
    return database.query('SELECT ' + property + ' FROM Round WHERE id = :id', {
      id: this._id
    })[0][property]
  }
}

function getRound (property, value) {
  const result = database.query('SELECT id FROM Round WHERE ' + property + ' = :value', {
    value: value
  })
  return new Round(result[0].id)
}

function byId (id) {
  return getRound('id', id)
}

function create (tournamentId) {
  database.query('INSERT INTO Round (tournament_id) VALUES (:tournament_id)', {
    tournament_id: tournamentId
  })
}

module.exports = {
  by_id: byId,
  create: create
}
