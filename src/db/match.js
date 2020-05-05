const database = require('../database')

const Match = class {
  constructor (id) {
    this._id = id
  }

  get id () {
    return this._id
  }

  get groupId () {
    return this._select('group_id')
  }

  get timestamp () {
    return this._select('timestamp')
  }

  get goalsA () {
    return this._select('goals_a')
  }

  set goalsA (goals) {
    return this._update('goals_a', goals)
  }

  get goalsB () {
    return this._select('goals_b')
  }

  set goalsB (goals) {
    return this._update('goals_b', goals)
  }

  get roundId () {
    return this._select('round_id')
  }

  get users () {
    return database.query(`SELECT User_in_Match.user_id, User_in_Match.team
    FROM Match
    JOIN User_in_Match ON (User_in_Match.match_id = Match.id)
    WHERE Match.id = :id`, {
      id: this._id
    })
  }

  _select (property) {
    return database.query('SELECT ' + property + ' FROM Match WHERE id = :id', {
      id: this._id
    })[0][property]
  }

  _update (property, value) {
    database.query('UPDATE Match SET ' + property + ' = :value WHERE id = :id', {
      value: value,
      id: this._id
    }, null)
  }
}

function getMatch (property, value) {
  const result = database.query('SELECT id FROM Match WHERE ' + property + ' = :value', {
    value: value
  })
  return new Match(result[0].id)
}

function byId (id) {
  return getMatch('id', id)
}

function byRoundId (roundId) {
  return getMatch('round_id', roundId)
}

function create (groupId, roundId) {
  const result = database.query('INSERT INTO Match (group_id, goals_a, goals_b, round_id) VALUES (:group_id, 0, 0, :round_id)', {
    group_id: groupId,
    round_id: roundId
  })
  return byId(result.insertId)
}

module.exports = {
  by_id: byId,
  byRoundId: byRoundId,
  create: create
}
