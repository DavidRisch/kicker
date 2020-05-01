function process (name, mail, password, phoneNumber) {
  require('../src/db/user').create(name, mail, phoneNumber, require('../src/account_util').hash_password(password))
  console.log('registered new user: ' + name)
}

module.exports = {
  process: process
}
