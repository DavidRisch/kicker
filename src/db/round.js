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

  get matches () {
    const result = database.query(`SELECT \`Match\`.id
    FROM Round
    JOIN \`Match\` ON (\`Match\`.round_id = Round.id)
    WHERE Round.id = :round_id`, {
      round_id: this._id
    })
    const matches = []
    for (const row of result) {
      matches.push(require('./match').by_id(row.id))
    }
    return matches
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
  const result = database.query('INSERT INTO Round (tournament_id) VALUES (:tournament_id)', {
    tournament_id: tournamentId
  })

  return byId(result.insertId)
}

module.exports = {
  by_id: byId,
  create: create
}
