module.exports = {
  by_id: by_id,
  by_name: by_name,
  by_email: by_email
}

database = require('../database')
input_validator = require('../input_validator')

//TODO: Better Errors
let User = class {
  #_id

  constructor (id) {
    this.#_id = id
  }

  get id () {
    return this.#_id
  }

  get name () {
    return this.#select('name')
  }

  set name (name) {
    if(!input_validator.isValidUserName(name))
      throw new Error("Invalid username")
    this.#update("name", name)
  }

  get email () {
    return this.#select('email')
  }

  set email (email) {
    if(!input_validator.isValidEmail(email))
      throw new Error("Invalid email")
    this.#update("email", email)
  }

  get telephone () {
    return this.#select('telephone')
  }

  set telephone (telephone) {
    //TODO telephone checking?
    this.#update("telephone", telephone)
  }

  get password () {
    return this.#select('password')
  }

  set password (password) {
    if(!input_validator.isSecurePassword(password))
      throw new Error("Insecure password")
    this.#update("password", password)
  }

  get picture () {
    return this.#select('picture')
  }

  set picture (picture) {
    //TODO picture checking?
    this.#update("picture", picture)
  }

  #select (property) {
    return database.query('SELECT :property FROM User WHERE id = :id', {
      id: this.#_id,
      property: property
    })[0][property]
  }

  #update (property, value) {
    database.query_async('UPDATE User SET :property = :value WHERE id = :id', {property: property, value: value, id: this.#_id}, null)
  }
}

function get_user(property, value) {
  return new User(database.query("SELECT id FROM User WHERE :property = :value", {property: property, value: value})[0]['id'])
}

function by_id (id) {
  return get_user("id", id)
}

function by_name (name) {
  return get_user("name", name)
}

function by_email (email) {
  return get_user("email", email)
}

function create (name, email) {

}