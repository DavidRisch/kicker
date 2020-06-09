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

  get finishedTimestamp () {
    return database.query('SELECT DATE_FORMAT(finished_timestamp, "%d.%m.%Y %k:%i") AS date FROM `Match` WHERE id = :id', {
      id: this._id
    })[0].date
  }

  get isFinished () {
    const result = database.query('SELECT (finished_timestamp IS NULL) AS is_finished FROM `Match` WHERE id = :id', {
      id: this._id
    })
    return result[0].is_finished === 0
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

  finish (goalsA, goalsB) {
    database.query('UPDATE `Match` SET goals_a = :goals_a, goals_b = :goals_b, finished_timestamp = NOW() WHERE id = :id', {
      goals_a: goalsA,
      goals_b: goalsB,
      id: this._id
    }, null)
  }

  get roundId () {
    return this._select('round_id')
  }

  get users () {
    return database.query(`SELECT User_in_Match.user_id, User_in_Match.team
    FROM \`Match\`
    JOIN User_in_Match ON (User_in_Match.match_id = \`Match\`.id)
    WHERE \`Match\`.id = :id`, {
      id: this._id
    })
  }

  usersOfTeam (team) {
    const result = database.query(`SELECT User_in_Match.user_id
    FROM \`Match\`
    JOIN User_in_Match ON (User_in_Match.match_id = \`Match\`.id)
    WHERE \`Match\`.id = :id AND User_in_Match.team = :team`, {
      id: this._id,
      team: team
    })

    const users = []
    for (const row of result) {
      users.push(require('./user').by_id(row.user_id))
    }
    return users
  }

  addUser (userId, team) {
    database.query('INSERT INTO User_in_Match (user_id, match_id, team) VALUES (:user_id, :match_id, :team)', {
      user_id: userId,
      team: team,
      match_id: this._id
    })
  }

  _select (property) {
    return database.query('SELECT ' + property + ' FROM `Match` WHERE id = :id', {
      id: this._id
    })[0][property]
  }

  _update (property, value) {
    database.query('UPDATE `Match` SET ' + property + ' = :value WHERE id = :id', {
      value: value,
      id: this._id
    }, null)
  }
}

function getMatch (property, value) {
  const result = database.query('SELECT id FROM `Match` WHERE ' + property + ' = :value', {
    value: value
  })
  return new Match(result[0].id)
}

function byId (id) {
  return getMatch('id', id)
}

function create (groupId, roundId, tournamentId) {
  const result = database.query('INSERT INTO `Match` (group_id, goals_a, goals_b, round_id, tournament_id) VALUES (:group_id, 0, 0, :round_id, :tournament_id)', {
    group_id: groupId,
    round_id: roundId,
    tournament_id: tournamentId
  })
  return byId(result.insertId)
}

function involvingUserAndGroup (userId, groupId) {
  const result = database.query('SELECT id FROM `Match` ' +
    'INNER JOIN User_in_Match ON (User_in_Match.match_id = `Match`.id) ' +
    'WHERE User_in_Match.user_id = :user_id AND `Match`.group_id = :group_id', {
    user_id: userId,
    group_id: groupId
  })
  const matches = []
  for (const row of result) {
    const match = byId(row.id)
    matches.push(match)
  }
  return matches
}

function involvingUser (userId) {
  const result = database.query('SELECT id FROM `Match` ' +
    'INNER JOIN User_in_Match ON (User_in_Match.match_id = `Match`.id) ' +
    'WHERE User_in_Match.user_id = :user_id ORDER BY id DESC', {
    user_id: userId
  })
  const matches = []
  for (const row of result) {
    const match = byId(row.id)
    matches.push(match)
  }
  return matches
}

module.exports = {
  by_id: byId,
  create: create,
  involving_user_and_group: involvingUserAndGroup,
  involving_user: involvingUser
}
