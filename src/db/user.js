module.exports = {
  by_id: by_id,
  by_name: by_name,
  by_email: by_email,
  create: create,
  InvalidUsernameException: InvalidUsernameException,
  InvalidEmailException: InvalidEmailException,
  InsecurePasswordException: InsecurePasswordException
}

let database = require('../database')
let input_validator = require('../input_validator')

var InvalidUsernameException = class extends Error {}
var InvalidEmailException = class extends Error {}
var InsecurePasswordException = class extends Error {}

let User = class {

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
    if (!input_validator.isValidUserName(name))
      throw new InvalidUsernameException()
    this._update('name', name)
  }

  get email () {
    return this._select('email')
  }

  set email (email) {
    if (!input_validator.isValidEmail(email))
      throw new InvalidEmailException()
    this._update('email', email)
  }

  get telephone () {
    return this._select('telephone')
  }

  set telephone (telephone) {
    this._update('telephone', telephone)
  }

  get password () {
    return this._select('password')
  }

  set password (password) {
    this._update('password', password)
  }

  get picture () {
    return this._select('picture')
  }

  set picture (picture) {
    this._update('picture', picture)
  }

  _select (property) {
    return database.query('SELECT :property FROM User WHERE id = :id', {
      id: this._id,
      property: property
    })[0][property]
  }

  _update (property, value) {
    database.query('UPDATE User SET :property = :value WHERE id = :id', {
      property: property,
      value: value,
      id: this._id
    }, null)
  }
}

function get_user (property, value) {
  return new User(database.query('SELECT id FROM User WHERE :property = :value', {
    property: property,
    value: value
  })[0]['id'])
}

function by_id (id) {
  return get_user('id', id)
}

function by_name (name) {
  return get_user('name', name)
}

function by_email (email) {
  return get_user('email', email)
}

function create (name, email, telephone, password) {
  database.query('INSERT INTO User (name, email, telephone, password) VALUES (:name, :email, :telephone, :password)', {
    name: name,
    email: email,
    telephone: telephone,
    password: password
  })
}