const database = require('../database')

const Session = class {
  constructor (id) {
    this._id = id
  }

  get id () {
    return this._id
  }

  get valid () {
    return this._select('valid')
  }

  set valid (isValid) {
    this._update('valid', isValid)
  }

  get cookieToken () {
    return this._select('cookie_token')
  }

  get csrfToken () {
    return this._select('csrf_token')
  }

  get userId () {
    return this._select('user_id')
  }

  get timestamp () {
    return this._select('timestamp')
  }

  _select (property) {
    return database.query('SELECT ' + property + ' FROM Session WHERE id = :id', {
      id: this._id
    })[0][property]
  }

  _update (property, value) {
    database.query('UPDATE Session SET ' + property + ' = :value WHERE id = :id', {
      value: value,
      id: this._id
    }, null)
  }
}

function getSession (property, value) {
  const result = database.query('SELECT id FROM Session WHERE ' + property + ' = :value', {
    value: value
  })
  return new Session(result[0].id)
}

function byId (id) {
  return getSession('id', id)
}

function byCookieToken (name) {
  return getSession('cookie_token', name)
}

function create (userId) {
  const result = database.query('INSERT INTO Session (valid, cookie_token, csrf_token, user_id) VALUES (0, :cookie_token, :csrf_token, :user_id)', {
    cookie_token: require('../account_util').generate_random_string(64),
    csrf_token: require('../account_util').generate_random_string(64),
    user_id: userId
  })
  return byId(result.insertId)
}

module.exports = {
  by_id: byId,
  by_cookie_token: byCookieToken,
  create: create
}
