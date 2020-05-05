function process (name, mail, password, phoneNumber) {
  require('../src/db/user').create(name, mail, phoneNumber, password)
  console.log('registered new user: ' + name)
}

module.exports = {
  process: process
}
