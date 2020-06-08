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

  addRound () {
    return require('./round').create(this._id)
  }

  addParticipant (participant) {
    database.query('INSERT INTO User_in_Tournament (user_id, tournament_id) VALUES (:user_id, :tournament_id)', {
      user_id: participant,
      tournament_id: this._id
    })
  }

  getParticipants () {
    const result = database.query('SELECT user_id FROM User_in_Tournament WHERE tournament_id = :tournament_id', {
      tournament_id: this._id
    })
    const participants = []
    result.forEach(element => {
      participants.push(element.user_id)
    })
    return participants
  }

  get rounds () {
    const result = database.query(`SELECT Round.id
    FROM Round
    JOIN Tournament ON (Round.tournament_id = Tournament.id)
    WHERE Tournament.id = :tournament_id`, {
      tournament_id: this._id
    })
    const rounds = []
    for (const row of result) {
      rounds.push(require('./round').by_id(row.id))
    }
    return rounds
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
  const result = database.query('INSERT INTO Tournament (group_id, name, mode) VALUES (:group_id, :name, :mode)', {
    group_id: groupId,
    name: name,
    mode: mode
  })

  return byId(result.insertId)
}

module.exports = {
  by_id: byId,
  create: create
}
