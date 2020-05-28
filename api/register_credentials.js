function process (name, mail, password, phoneNumber) {
  const user = require('../src/db/user')
  try {
    user.create(name, mail, phoneNumber, password)
    console.log('registered new user: ' + name)
    return {
      success: true
    }
  } catch (e) {
    if (e instanceof user.DuplicateUserException) {
      return {
        success: false,
        message: 'duplicateUserException'
      }
    } else {
      return {
        success: false,
        message: e.message
      }
    }
  }
}

module.exports = {
  process: process
}
