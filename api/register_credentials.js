function process (name, mail, password, phoneNumber) {
  try {
    require('../src/db/user').create(name, mail, phoneNumber, password)
    console.log('registered new user: ' + name)
    return {
      success: true
    }
  } catch (e) {
    return {
      success: false
    }
  }
}

module.exports = {
  process: process
}
